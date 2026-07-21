"use client";

/** Small-caps section label with a leading square dot, Slotly-style. */
export function SectionLabel({
  text,
  tone = "dark",
}: {
  text: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-[var(--d-accent)]" : "text-[var(--d-mint-dim)]";
  const dot = tone === "dark" ? "bg-[var(--d-accent)]" : "bg-[var(--d-mint-dim)]";
  return (
    <p
      className={`flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.28em] ${color}`}
    >
      <span className={`h-2 w-2 rounded-[3px] ${dot}`} aria-hidden />
      {text}
    </p>
  );
}

/** Smooth anchor scrolling that plays nicely with the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Initials for the CSS-built avatars ("Ana Beltrão" -> "AB"). */
export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
