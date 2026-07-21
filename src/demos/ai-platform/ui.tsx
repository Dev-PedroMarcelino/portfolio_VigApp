"use client";

/** Smooth anchor scrolling; "top" returns to the very top of the demo. */
export function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Cortexa logomark: a synaptic node with three branching connections,
 * rendered as pure SVG so it tints from the demo palette.
 */
export function CortexaMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <circle cx="16" cy="16" r="4.4" fill="var(--d-accent)" />
      <circle cx="16" cy="16" r="7.5" stroke="var(--d-accent)" strokeOpacity="0.45" strokeWidth="1.3" />
      <circle cx="27" cy="8" r="2.1" fill="var(--d-accent-bright)" />
      <circle cx="6" cy="24" r="2.1" fill="var(--d-accent-bright)" />
      <circle cx="27" cy="25" r="2.1" fill="var(--d-accent-bright)" />
      <path
        d="M18.7 13.4 25.4 9.3M13.3 18.6 7.6 22.5M18.9 18.4 25.2 23.3"
        stroke="var(--d-accent)"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Eyebrow + display title + intro, shared across sections. */
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
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--d-accent-bright)] [font-family:var(--demo-mono)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)] shadow-[0_0_10px_var(--d-accent)]" aria-hidden />
        {label}
      </p>
      <h2 className="max-w-2xl [font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]">
        {title}
      </h2>
      {intro ? (
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">{intro}</p>
      ) : null}
    </div>
  );
}

/** Violet nebula glow used behind hero and section focal points. */
export function Glow({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, rgba(167,139,250,0.3), rgba(124,58,237,0.1) 55%, transparent 76%)",
      }}
    />
  );
}

/** Faint neural grid laid behind the void background. */
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
        maskImage: "radial-gradient(ellipse 85% 65% at 50% 20%, black 25%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 20%, black 25%, transparent 100%)",
      }}
    />
  );
}
