// app/e/[slug]/page.tsx
// One event's page, e.g. /e/young-adult-trivia-night-dc.
// This is where people land from a shared link, usually on a phone and
// usually not signed in, so everything they need is readable right here.
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import EventPoster from "@/components/EventPoster";
import { formatEventDay, formatEventTimes } from "@/lib/events";

// Next.js passes the [slug] part of the address in "params".
type Props = { params: Promise<{ slug: string }> };

export default async function EventPage({ params }: Props) {
  await connection();
  const { slug } = await params;

  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("events")
    .select(
      "slug, title, starts_at, ends_at, timezone, is_online, venue_name, address, description, image_url, registration_url, category, status, organizers(name)",
    )
    .eq("slug", slug)
    .maybeSingle(); // one row, or null if there's no such event

  if (error) throw new Error(`Event could not load: ${error.message}`);

  // No row means the slug is wrong OR the security rule hid it (a draft).
  // Either way the visitor sees the same "not found" page, which is what
  // we want: it doesn't reveal that a draft exists.
  if (!event) notFound();

  const isCancelled = event.status === "cancelled";
  const hasEnded =
    new Date(event.ends_at ?? event.starts_at).getTime() < Date.now();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
      <Link href="/" className="text-sm font-medium text-muted hover:text-foreground">
        All events
      </Link>

      {isCancelled && (
        <p className="mt-4 rounded-xl bg-notice-bg px-4 py-3 font-medium text-notice-fg">
          This event has been cancelled.
        </p>
      )}
      {!isCancelled && hasEnded && (
        <p className="mt-4 rounded-xl bg-notice-bg px-4 py-3 font-medium text-notice-fg">
          This event has already happened.
        </p>
      )}

      <div className="mt-4">
        {event.image_url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image_url}
              alt=""
              className="aspect-[16/9] w-full rounded-3xl object-cover"
            />
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              {event.title}
            </h1>
          </>
        ) : (
          <EventPoster title={event.title} category={event.category} size="page" />
        )}
      </div>

      <dl className="mt-8 grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-muted">When</dt>
          <dd className="mt-1 font-medium">
            {formatEventDay(event.starts_at, event.timezone)}
            <br />
            {formatEventTimes(event.starts_at, event.ends_at, event.timezone)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Where</dt>
          <dd className="mt-1 font-medium">
            {event.is_online ? (
              "Online"
            ) : (
              <>
                {event.venue_name}
                {event.venue_name && event.address && <br />}
                {event.address && (
                  <span className="font-normal text-muted">{event.address}</span>
                )}
              </>
            )}
          </dd>
        </div>
        {event.organizers && (
          <div>
            <dt className="text-sm text-muted">Hosted by</dt>
            <dd className="mt-1 font-medium">{event.organizers.name}</dd>
          </div>
        )}
      </dl>

      {/* Going / Maybe / Can't Go arrive here in Phase 4. */}
      {event.registration_url && !isCancelled && !hasEnded && (
        <a
          href={event.registration_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-accent-contrast"
        >
          Register on the host’s site
        </a>
      )}

      {event.description && (
        <div className="mt-8 max-w-prose border-t border-line pt-8">
          <h2 className="font-display text-xl font-bold">About this event</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed">{event.description}</p>
        </div>
      )}
    </main>
  );
}
