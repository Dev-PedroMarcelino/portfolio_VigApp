"use client";

/** Small-caps section label with a glowing tick, spec-sheet style. */
export function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-[var(--d-accent)]">
      <span
        className="h-2 w-2 rounded-sm bg-[var(--d-accent)] shadow-[0_0_12px_var(--d-accent)]"
        aria-hidden
      />
      {text}
    </p>
  );
}

/** Faint engineering grid laid over dark sections. */
export function GridLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.05) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 100%)",
      }}
    />
  );
}

/** Smooth anchor scrolling that plays nicely with the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Deterministic initials for review avatars — no images needed. */
export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}
