import { z } from "zod";
import { budgetOptions, consultationTimeOptions, referralOptions, timelineOptions } from "@/config/contactForm";
import { regionOptions } from "@/config/serviceArea";
import { projectTypeOptions } from "@/config/services";

/** Removes control characters and trims; keeps line breaks in messages. */
const clean = (max: number, multiline = false) =>
  z
    .string()
    .transform((v) =>
      v.replace(multiline ? /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "").trim(),
    )
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.enum(values), z.literal("")])
    .optional()
    .transform((v) => v || null);

export const contactSchema = z
  .object({
    name: clean(120).pipe(z.string().min(2, "Please enter your name.")),
    email: clean(254).pipe(z.email("Please enter a valid email address.")),
    phone: clean(40).pipe(
      z.string().refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, "Please enter a valid phone number."),
    ),
    projectType: z.enum(projectTypeOptions, { error: "Please choose a project type." }),
    region: z.enum(regionOptions, { error: "Please choose a region." }),
    town: clean(120),
    budget: optionalEnum(budgetOptions),
    timeline: optionalEnum(timelineOptions),
    referral: optionalEnum(referralOptions),
    preferredDate: z
      .string()
      .optional()
      .transform((v) => v || null)
      .pipe(
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date.")
          .nullable(),
      ),
    preferredTime: optionalEnum(consultationTimeOptions),
    message: clean(5000, true).pipe(z.string().min(10, "Please tell us a little about your project.")),
    agreeTerms: z.literal("on", { error: "Please agree to the Privacy Policy and Terms of Use to continue." }),
    marketingEmail: z.literal("on").optional(),
    marketingSms: z.literal("on").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.marketingSms && !data.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Please add a mobile number to receive text messages.",
      });
    }
  });

export type ContactInput = z.output<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<string, string>>;
      values?: Record<string, string>;
    };
