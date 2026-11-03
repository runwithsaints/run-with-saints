// components/SiteHeader.tsx
// The bar at the top of every page. Phase 6 adds the real navigation
// (Discover, Create Event, My Events, Profile); Phase 2 adds sign-in.
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          Run With Saints
        </Link>
      </div>
    </header>
  );
}
