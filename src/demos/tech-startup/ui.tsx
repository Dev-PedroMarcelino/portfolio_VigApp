"use client";

/**
 * Shared primitives for the Nebula Labs demo: section headings, the
 * deterministic star field and the glassy window chrome used by both the
 * product mocks and the terminal.
 */

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SectionHeading({
  label,
  title,
  intro,
  align = "center",
}: {
  label: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line-bright)] bg-[var(--d-panel)]/80 px-3.5 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[var(--d-accent-soft)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)]" aria-hidden />
        {label}
      </p>
      <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-medium tracking-tight text-[var(--d-ink)] md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-[0.95rem] leading-relaxed text-[var(--d-ink-dim)] ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** Deterministic star field — positions derive from the index, never Math.random. */
export function Stars({ count = 56, className = "" }: { count?: number; className?: string }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    left: (i * 47 + 11) % 100,
    top: (i * 31 + 7) % 100,
    size: (i % 3) + 1,
    opacity: 0.12 + ((i * 7) % 10) / 22,
  }));
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Browser/terminal window chrome with the three dots and a mono title bar. */
export function WindowFrame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[var(--d-line-bright)] bg-[var(--d-panel)] shadow-[0_24px_80px_-24px_rgba(139,92,246,0.35)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-[var(--d-line)] bg-[var(--d-bg-raise)] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
        </span>
        <span className="truncate [font-family:var(--d-mono)] text-[0.68rem] text-[var(--d-ink-faint)]">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
