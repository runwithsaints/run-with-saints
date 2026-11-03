// components/EventCard.tsx
// One event in the Discover grid. The whole card is a link to the event page.
import Link from "next/link";
import EventPoster from "@/components/EventPoster";
import { formatCardDate, placeLabel } from "@/lib/events";

// Exactly the columns the Discover page selects. If you add a column here,
// add it to the .select() in app/page.tsx too, or TypeScript will complain.
export type EventCardData = {
  slug: string;
  title: string;
  starts_at: string;
  timezone: string;
  is_online: boolean;
  venue_name: string | null;
  address: string | null;
  image_url: string | null;
  category: string | null;
  organizers: { name: string } | null;
};

export default function EventCard({ event }: { event: EventCardData }) {
  return (
    <Link href={`/e/${event.slug}`} className="group block rounded-2xl">
      {event.image_url ? (
        <>
          {/* Plain <img> for now; Phase 3 adds resized uploads. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image_url}
            alt=""
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <h2 className="mt-3 font-display text-xl font-bold leading-tight decoration-2 underline-offset-4 group-hover:underline">
            {event.title}
          </h2>
        </>
      ) : (
        <EventPoster title={event.title} category={event.category} size="card" />
      )}

      <div className="mt-3 space-y-0.5">
        <p className="font-medium">{formatCardDate(event.starts_at, event.timezone)}</p>
        <p className="text-muted">{placeLabel(event)}</p>
        {event.organizers && (
          <p className="text-muted">Hosted by {event.organizers.name}</p>
        )}
      </div>
    </Link>
  );
}
