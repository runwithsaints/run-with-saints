// app/page.tsx
// Temporary homepage: proves the app can read events from Supabase.
// The real Discover page with event cards replaces this next.
import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  await connection();
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("slug, title, starts_at, timezone, is_online, venue_name")
    .eq("status", "published")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at");

  if (error) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <p className="text-red-700">Events could not load: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Run With Saints</h1>
      <p className="mt-1 text-sm">{events.length} upcoming events</p>

      <ul className="mt-6 space-y-3">
        {events.map((event) => (
          <li key={event.slug} className="border-b pb-3">
            <p className="font-medium">{event.title}</p>
            <p className="text-sm">
              {new Date(event.starts_at).toLocaleString("en-US", {
                timeZone: event.timezone,
                dateStyle: "medium",
                timeStyle: "short",
              })}
              {", "}
              {event.is_online ? "Online" : event.venue_name}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
