"use client";

/**
 * Shared primitives for the Forge Athletic demo: smooth anchor scrolling, the
 * section eyebrow/heading treatment and a deterministic outlined-text marquee.
 */

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SectionEyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[var(--d-accent)]">
      <span className="h-2 w-2 rotate-45 bg-[var(--d-accent)]" aria-hidden />
      {label}
    </span>
  );
}

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
}: {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <SectionEyebrow label={label} />
      <h2 className="mt-4 [font-family:var(--demo-display)] text-[2.6rem] uppercase leading-[0.92] tracking-[-0.01em] text-[var(--d-ink)] sm:text-6xl">
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-5 text-[0.98rem] leading-relaxed text-[var(--d-ink-dim)] ${
            centered ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
