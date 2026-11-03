// app/page.tsx
// The Discover page: every upcoming published event, soonest first.
// Phase 6 adds the homepage headline, filters and location search above this.
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import EventCard from "@/components/EventCard";

export default async function DiscoverPage() {
  // Build this page fresh for every visitor, since "upcoming" depends on now.
  await connection();

  const supabase = await createClient();
  const { data: events, error } = await supabase
    .from("events")
    .select(
      "slug, title, starts_at, timezone, is_online, venue_name, address, image_url, category, organizers(name)",
    )
    .eq("status", "published")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at");

  // In development this shows Next.js's error screen with the message.
  if (error) throw new Error(`Events could not load: ${error.message}`);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Upcoming events</h1>

      {events.length === 0 ? (
        <p className="mt-4 text-muted">
          No upcoming events yet. Published events appear here as soon as hosts post them.
        </p>
      ) : (
        <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
