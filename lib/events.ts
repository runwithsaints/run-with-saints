// lib/events.ts
// Small helpers every event-related page shares: what each category looks
// like, how to print dates, and how to describe where an event is.

// ---------------------------------------------------------------
// Categories
// Events without a photo get a "poster" in their category's color.
// The colors borrow from the liturgical year: Ordinary Time green,
// Advent/Lent violet, Gaudete rose, the red of the Holy Spirit and
// the martyrs, Marian blue and gold. Every pair below passes WCAG AA
// contrast for text.
// ---------------------------------------------------------------
type CategoryStyle = { label: string; bg: string; fg: string };

export const CATEGORIES: Record<string, CategoryStyle> = {
  young_adults: { label: "Young Adults", bg: "#1F6B47", fg: "#FFFFFF" },
  faith_formation: { label: "Faith & Formation", bg: "#2B5FA8", fg: "#FFFFFF" },
  social: { label: "Social", bg: "#E58BA6", fg: "#3A0E1E" },
  service: { label: "Service", bg: "#A8322A", fg: "#FFFFFF" },
  sports_outdoors: { label: "Sports & Outdoors", bg: "#22716A", fg: "#FFFFFF" },
  mass_adoration: { label: "Mass & Adoration", bg: "#E3B53C", fg: "#2A1F05" },
  conferences: { label: "Conferences", bg: "#2E3A6E", fg: "#FFFFFF" },
  retreats: { label: "Retreats", bg: "#5E3F8F", fg: "#FFFFFF" },
  festivals: { label: "Festivals", bg: "#C4501C", fg: "#FFFFFF" },
  family: { label: "Family", bg: "#8DBF5A", fg: "#1A2A0C" },
};

const UNCATEGORIZED: CategoryStyle = { label: "Event", bg: "#4A4F5C", fg: "#FFFFFF" };

export function categoryStyle(category: string | null): CategoryStyle {
  return (category && CATEGORIES[category]) || UNCATEGORIZED;
}

// ---------------------------------------------------------------
// Dates
// The database stores UTC. We always print in the EVENT's time zone,
// so a 7:30 p.m. Mass in New York reads 7:30 p.m. for everyone.
// ---------------------------------------------------------------

// Card: "Sat, Nov 14, 7:30 PM"
export function formatCardDate(startsAt: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(new Date(startsAt));
}

// Event page, first line: "Saturday, November 14, 2026"
export function formatEventDay(startsAt: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(new Date(startsAt));
}

// Event page, second line: "7:30 – 9:30 PM EST", or "7:30 PM EST" with no end time.
// (An event that runs past midnight would lose its end date here.
// Fine for now; worth fixing when you build "Add more details" in Phase 3.)
export function formatEventTimes(
  startsAt: string,
  endsAt: string | null,
  timeZone: string,
): string {
  const format = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone,
  });
  if (!endsAt) return format.format(new Date(startsAt));
  return format.formatRange(new Date(startsAt), new Date(endsAt));
}

// ---------------------------------------------------------------
// Place
// ---------------------------------------------------------------
export function placeLabel(event: {
  is_online: boolean;
  venue_name: string | null;
  address: string | null;
}): string {
  if (event.is_online) return "Online";
  return event.venue_name ?? event.address ?? "Location to be announced";
}
