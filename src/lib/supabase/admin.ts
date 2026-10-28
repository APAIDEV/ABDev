import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";
import { serverEnv } from "@/lib/server-env";

export const isAdminConfigured = () => Boolean(publicEnv.supabaseUrl && serverEnv.supabaseServiceRoleKey);

/**
 * Service-role client: bypasses Row Level Security. Server only, and only
 * after the caller's permissions have been checked (see src/lib/auth.ts).
 */
export function createAdminClient() {
  return createClient(publicEnv.supabaseUrl, serverEnv.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
