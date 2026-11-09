// app/e/[slug]/not-found.tsx
// Shown when notFound() runs in the event page: a mistyped link, a deleted
// event, or a draft the security rules hide.
import Link from "next/link";

export default function EventNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-12">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        We couldn’t find that event
      </h1>
      <p className="mt-3 text-muted">
        The link may be mistyped, or the host may have taken the event down.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-accent-contrast"
      >
        See upcoming events
      </Link>
    </main>
  );
}
