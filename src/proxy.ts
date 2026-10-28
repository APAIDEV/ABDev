import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only private routes: public pages stay fully static and fast.
  matcher: ["/dashboard/:path*", "/portal/:path*", "/login/:path*", "/reset-password", "/auth/:path*"],
};
