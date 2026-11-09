// components/EventPoster.tsx
// When an event has no photo, it gets a poster: the event's title set large
// on its category color. Used small on cards and large on the event page.
import { categoryStyle } from "@/lib/events";

type Props = {
  title: string;
  category: string | null;
  size: "card" | "page";
};

export default function EventPoster({ title, category, size }: Props) {
  const style = categoryStyle(category);

  // The event page's title is the page's main heading (h1); on the
  // Discover page each card title is a subheading (h2).
  const Heading = size === "page" ? "h1" : "h2";

  const boxClasses =
    size === "page"
      ? "aspect-[4/3] rounded-3xl p-6 sm:aspect-[16/9] sm:p-10"
      : "aspect-[4/3] rounded-2xl p-5";

  const headingClasses =
    size === "page"
      ? "text-4xl sm:text-6xl"
      : "text-[1.75rem] decoration-2 underline-offset-4 group-hover:underline";

  return (
    <div
      className={`flex flex-col justify-between ${boxClasses}`}
      style={{ backgroundColor: style.bg, color: style.fg }}
    >
      <span className="text-sm font-medium">{style.label}</span>
      <Heading
        className={`font-display font-bold leading-[1.05] tracking-tight text-balance ${headingClasses}`}
      >
        {title}
      </Heading>
    </div>
  );
}
