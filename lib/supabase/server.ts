// lib/supabase/server.ts
// Creates a Supabase client for code that runs on the server
// (pages, server actions, route handlers). Each request gets its own client.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Pages can't set cookies; that's fine. Sign-in (Phase 2)
            // will refresh sessions in middleware instead.
          }
        },
      },
    },
  );
}
