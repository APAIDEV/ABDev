"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { contactTopics, designations, involvementTypes, maximumGift, minimumGift, serviceAreas } from "@/config/giving";
import { siteUrl } from "@/config/site";
import { addToNewsletter, confirmToSender, notifyTeam } from "@/lib/email";
import { formatEventDate, getEvent, registrationOpen } from "@/lib/events";
import type { FormState } from "@/lib/forms";
import { isRateLimited, looksAutomated } from "@/lib/rate-limit";
import { createDonationCheckout, donationsEnabled } from "@/lib/stripe";

/* ------------------------------------------------------------------ helpers */

const clean = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .transform((s) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ""));

const name = clean(120).pipe(z.string().min(1, "Please enter your name."));
const email = z.string().trim().toLowerCase().max(200).pipe(z.email("Please enter a valid email address."));
const optional = (max: number) => clean(max).optional().default("");

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : undefined;
}

function fieldErrors(error: z.ZodError): FormState {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return { status: "error", message: "Please check the highlighted fields.", errors };
}

const spam: FormState = { status: "success", message: "Thank you." };
const busy: FormState = {
  status: "error",
  message: "We have received several messages from your connection. Please wait a few minutes and try again.",
};
const failed: FormState = {
  status: "error",
  message: "Something went wrong while sending. Please try again in a moment, or reach us on Instagram.",
};

/* ------------------------------------------------------------------ contact */

const contactSchema = z.object({
  name,
  email,
  topic: z.enum(contactTopics, "Please choose a topic."),
  message: clean(5000).pipe(z.string().min(2, "Please write a short message.")),
  updates: z.boolean(),
});

export async function sendContact(_: FormState, fd: FormData): Promise<FormState> {
  if (looksAutomated(fd)) return spam;
  if (await isRateLimited("contact")) return busy;
  const parsed = contactSchema.safeParse({
    name: str(fd, "name"),
    email: str(fd, "email"),
    topic: str(fd, "topic"),
    message: str(fd, "message"),
    updates: fd.get("updates") === "on",
  });
  if (!parsed.success) return fieldErrors(parsed.error);
  const d = parsed.data;

  const ok = await notifyTeam({
    subject: `Message: ${d.topic} from ${d.name}`,
    title: "New message from the website",
    replyTo: d.email,
    rows: [
      ["Name", d.name],
      ["Email", d.email],
      ["Topic", d.topic],
      ["Message", d.message],
      ["Updates", d.updates ? "Yes, add to mailing list" : "No"],
    ],
  });
  if (!ok) return failed;
  if (d.updates) await addToNewsletter(d.email, d.name.split(" ")[0]);
  await confirmToSender({
    to: d.email,
    subject: "We received your message",
    title: `Thank you, ${d.name.split(" ")[0]}.`,
    paragraphs: [
      "Thank you for reaching out to Steps4Stackzz Foundation. Your message has reached us and someone from our family will reply personally.",
      "With gratitude,\nSteps4Stackzz Foundation",
    ],
  });
  return { status: "success", message: "Your message has reached us, and we will reply personally." };
}

/* --------------------------------------------------------------- newsletter */

const subscribeSchema = z.object({ email, firstName: optional(80) });

export async function subscribe(_: FormState, fd: FormData): Promise<FormState> {
  if (looksAutomated(fd)) return spam;
  if (await isRateLimited("subscribe", 8)) return busy;
  const parsed = subscribeSchema.safeParse({ email: str(fd, "email"), firstName: str(fd, "firstName") });
  if (!parsed.success) return fieldErrors(parsed.error);
  const d = parsed.data;
  await addToNewsletter(d.email, d.firstName);
  const ok = await notifyTeam({
    subject: `Mailing list signup: ${d.email}`,
    title: "New mailing list signup",
    rows: [
      ["Email", d.email],
      ["First name", d.firstName],
    ],
  });
  if (!ok) return failed;
  return {
    status: "success",
    message: "Thank you. You will hear from us about upcoming events and foundation updates.",
  };
}

/* ------------------------------------------------------------- get involved */

const involvementIds = involvementTypes.map((t) => t.id) as [string, ...string[]];

const involvementSchema = z.object({
  interest: z.enum(involvementIds, "Please choose how you would like to be involved."),
  name,
  email,
  phone: optional(40),
  organization: optional(160),
  areas: z.array(z.enum(serviceAreas)).max(serviceAreas.length),
  availability: optional(300),
  message: optional(5000),
  updates: z.boolean(),
});

export async function sendInvolvement(_: FormState, fd: FormData): Promise<FormState> {
  if (looksAutomated(fd)) return spam;
  if (await isRateLimited("involve")) return busy;
  const parsed = involvementSchema.safeParse({
    interest: str(fd, "interest"),
    name: str(fd, "name"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    organization: str(fd, "organization"),
    areas: fd.getAll("areas").filter((v) => typeof v === "string"),
    availability: str(fd, "availability"),
    message: str(fd, "message"),
    updates: fd.get("updates") === "on",
  });
  if (!parsed.success) return fieldErrors(parsed.error);
  const d = parsed.data;
  const type = involvementTypes.find((t) => t.id === d.interest)!;
  if ((d.interest === "partnership" || d.interest === "sponsorship") && !d.message) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: { message: "Please tell us a little about what you have in mind." },
    };
  }

  const ok = await notifyTeam({
    subject: `${type.title}: ${d.name}${d.organization ? ` (${d.organization})` : ""}`,
    title: `${type.title} inquiry`,
    replyTo: d.email,
    rows: [
      ["Interest", type.title],
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Organization", d.organization],
      ["Areas of interest", d.areas.join(", ")],
      ["Availability", d.availability],
      ["Message", d.message],
      ["Updates", d.updates ? "Yes, add to mailing list" : "No"],
    ],
  });
  if (!ok) return failed;
  if (d.updates) await addToNewsletter(d.email, d.name.split(" ")[0]);
  await confirmToSender({
    to: d.email,
    subject: "Thank you for wanting to serve with us",
    title: `Thank you, ${d.name.split(" ")[0]}.`,
    paragraphs: [
      `We received your ${type.title.toLowerCase()} inquiry. Thank you for wanting to be part of this work. We will be in touch personally with next steps.`,
      "With gratitude,\nSteps4Stackzz Foundation",
    ],
  });
  return {
    status: "success",
    message: "We are grateful you want to serve with us, and we will be in touch personally with next steps.",
  };
}

/* ------------------------------------------------------ event registration */

const registrationSchema = z.object({
  name,
  email,
  phone: optional(40),
  guests: z.coerce.number().int().min(1, "At least 1 person.").max(30, "For groups larger than 30, please contact us."),
  message: optional(2000),
  updates: z.boolean(),
});

export async function registerForEvent(slug: string, _: FormState, fd: FormData): Promise<FormState> {
  if (looksAutomated(fd)) return spam;
  if (await isRateLimited("register")) return busy;
  const event = getEvent(slug);
  if (!event || !registrationOpen(event)) {
    return { status: "error", message: "Registration for this event is closed." };
  }
  const parsed = registrationSchema.safeParse({
    name: str(fd, "name"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    guests: str(fd, "guests") ?? "1",
    message: str(fd, "message"),
    updates: fd.get("updates") === "on",
  });
  if (!parsed.success) return fieldErrors(parsed.error);
  const d = parsed.data;
  const when = formatEventDate(event);

  const ok = await notifyTeam({
    subject: `Registration: ${event.title} · ${d.name} (${d.guests})`,
    title: `New registration for ${event.title}`,
    replyTo: d.email,
    rows: [
      ["Event", `${event.title}, ${when.long}`],
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Number attending", String(d.guests)],
      ["Note", d.message],
      ["Updates", d.updates ? "Yes, add to mailing list" : "No"],
    ],
  });
  if (!ok) return failed;
  if (d.updates) await addToNewsletter(d.email, d.name.split(" ")[0]);
  const where = event.location.name ? `${event.location.name}, ${event.location.area}` : "Location to be announced";
  await confirmToSender({
    to: d.email,
    subject: `You are registered: ${event.title}`,
    title: `We look forward to seeing you, ${d.name.split(" ")[0]}.`,
    paragraphs: [
      `Thank you for registering for the ${event.title}.`,
      `${when.long}\n${when.time}\n${where}`,
      ...event.notes,
      "With gratitude,\nSteps4Stackzz Foundation",
    ],
  });
  return {
    status: "success",
    message: `${d.name.split(" ")[0]}, you are registered for ${d.guests === 1 ? "1 person" : `${d.guests} people`}. We look forward to walking with you.`,
  };
}

/* ------------------------------------------------------------- memories */

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

const memorySchema = z.object({
  name,
  email,
  relationship: optional(160),
  memory: clean(8000).pipe(z.string().min(10, "Please share a few words.")),
  sharing: z.enum(["share", "private"], "Please let us know how we may use your memory."),
});

export async function shareMemory(_: FormState, fd: FormData): Promise<FormState> {
  if (looksAutomated(fd)) return spam;
  if (await isRateLimited("memory")) return busy;
  const parsed = memorySchema.safeParse({
    name: str(fd, "name"),
    email: str(fd, "email"),
    relationship: str(fd, "relationship"),
    memory: str(fd, "memory"),
    sharing: str(fd, "sharing"),
  });
  if (!parsed.success) return fieldErrors(parsed.error);
  const d = parsed.data;

  const files = fd.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > 4) return { status: "error", errors: { photos: "Please attach up to 4 photos." } };
  const total = files.reduce((n, f) => n + f.size, 0);
  if (total > MAX_PHOTO_BYTES) {
    return {
      status: "error",
      errors: { photos: "Photos must be 4 MB or less in total. Please choose fewer or smaller photos." },
    };
  }
  if (files.some((f) => !/^image\/(jpeg|png|webp|heic|heif|gif)$/.test(f.type))) {
    return { status: "error", errors: { photos: "Please attach photos only (JPG, PNG, HEIC, or WebP)." } };
  }
  const attachments = await Promise.all(
    files.map(async (f, i) => ({
      filename: f.name.replace(/[^\w.\- ]/g, "_").slice(0, 80) || `photo-${i + 1}.jpg`,
      content: Buffer.from(await f.arrayBuffer()),
    })),
  );

  const ok = await notifyTeam({
    subject: `A memory of Amanpreet from ${d.name}`,
    title: "A memory has been shared",
    replyTo: d.email,
    rows: [
      ["Name", d.name],
      ["Email", d.email],
      ["Relationship", d.relationship],
      ["Permission", d.sharing === "share" ? "May be shared on the website" : "For the family only"],
      ["Memory", d.memory],
      ["Photos", attachments.length ? `${attachments.length} attached` : ""],
    ],
    attachments,
  });
  if (!ok) return failed;
  await confirmToSender({
    to: d.email,
    subject: "Thank you for sharing your memory of Amanpreet",
    title: `Thank you, ${d.name.split(" ")[0]}.`,
    paragraphs: [
      "Thank you for sharing your memory of Amanpreet. Every story helps keep his presence close, and the family will read yours with care.",
      "With gratitude,\nSteps4Stackzz Foundation",
    ],
  });
  return {
    status: "success",
    message: "Your memory has been sent to the family, and they will read it with care.",
  };
}

/* ------------------------------------------------------------- giving */

const giftSchema = z.object({
  amount: z.coerce
    .number("Please choose or enter an amount.")
    .min(minimumGift, `The minimum gift is $${minimumGift}.`)
    .max(maximumGift, `For gifts above $${maximumGift.toLocaleString()}, please contact us directly.`),
  frequency: z.enum(["once", "monthly"]),
  designation: z.enum(designations),
  tribute: optional(200),
});

function readAmount(fd: FormData) {
  const preset = str(fd, "amount");
  const custom = str(fd, "customAmount")?.replace(/[$,\s]/g, "");
  return preset === "other" ? custom || undefined : preset;
}

export async function startDonation(_: FormState, fd: FormData): Promise<FormState> {
  if (!donationsEnabled) return { status: "error", message: "Online giving is not open yet." };
  if (await isRateLimited("donate", 10)) return busy;
  const parsed = giftSchema.safeParse({
    amount: readAmount(fd),
    frequency: str(fd, "frequency"),
    designation: str(fd, "designation"),
    tribute: str(fd, "tribute"),
  });
  if (!parsed.success) {
    const state = fieldErrors(parsed.error);
    if (state.errors?.amount) state.errors.customAmount = state.errors.amount;
    return state;
  }
  const d = parsed.data;
  let url: string;
  try {
    url = await createDonationCheckout({
      amountCents: Math.round(d.amount * 100),
      monthly: d.frequency === "monthly",
      designation: d.designation,
      tribute: d.tribute || undefined,
      siteUrl,
    });
  } catch {
    return { status: "error", message: "Secure checkout could not be opened. Please try again in a moment." };
  }
  redirect(url);
}

const pledgeSchema = giftSchema.extend({ name, email, message: optional(2000) });

export async function sendPledge(_: FormState, fd: FormData): Promise<FormState> {
  if (looksAutomated(fd)) return spam;
  if (await isRateLimited("pledge")) return busy;
  const parsed = pledgeSchema.safeParse({
    amount: readAmount(fd),
    frequency: str(fd, "frequency"),
    designation: str(fd, "designation"),
    tribute: str(fd, "tribute"),
    name: str(fd, "name"),
    email: str(fd, "email"),
    message: str(fd, "message"),
  });
  if (!parsed.success) {
    const state = fieldErrors(parsed.error);
    if (state.errors?.amount) state.errors.customAmount = state.errors.amount;
    return state;
  }
  const d = parsed.data;
  const amount = `$${d.amount.toLocaleString("en-US")}${d.frequency === "monthly" ? " monthly" : ""}`;
  const ok = await notifyTeam({
    subject: `Pledge: ${amount} from ${d.name}`,
    title: "A new pledge of support",
    replyTo: d.email,
    rows: [
      ["Name", d.name],
      ["Email", d.email],
      ["Pledge", amount],
      ["Directed to", d.designation],
      ["In honor or memory of", d.tribute],
      ["Note", d.message],
    ],
  });
  if (!ok) return failed;
  await confirmToSender({
    to: d.email,
    subject: "Thank you for your pledge",
    title: `Thank you, ${d.name.split(" ")[0]}.`,
    paragraphs: [
      `Thank you for pledging ${amount} toward ${d.designation === designations[0] ? "the foundation's work" : d.designation}.`,
      "Online giving is being set up now. We will reach out personally as soon as it is ready so you can complete your gift.",
      "With gratitude,\nSteps4Stackzz Foundation",
    ],
  });
  return {
    status: "success",
    message: "Your pledge has reached us. We will reach out personally as soon as online giving is ready.",
  };
}
