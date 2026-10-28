import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { serverEnv } from "@/lib/server-env";

/** One-way hash so raw IP addresses and emails are never stored. */
export function hashValue(value: string) {
  return createHash("sha256").update(`${serverEnv.hashSalt}:${value}`).digest("hex").slice(0, 32);
}

export async function requestMeta() {
  const h = await headers();
  const ip = h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return {
    ip,
    ipHash: hashValue(ip),
    userAgent: (h.get("user-agent") ?? "").slice(0, 300),
  };
}
