"use client";

import type { LucideIcon } from "lucide-react";
import { Apple, Baby, Bone, Flower2, HeartPulse, Sparkles } from "lucide-react";
import type { SpecialtyId } from "./content";

/** Specialty icon map, shared by the grid, the directory and the stepper. */
export const SPECIALTY_ICONS: Record<SpecialtyId, LucideIcon> = {
  cardiology: HeartPulse,
  dermatology: Sparkles,
  pediatrics: Baby,
  orthopedics: Bone,
  gynecology: Flower2,
  nutrition: Apple,
};

export function SectionHeading({
  label,
  title,
  accent,
  intro,
  tone = "dark",
  align = "left",
}: {
  label: string;
  title: string;
  accent: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  const ink = tone === "dark" ? "text-[var(--d-ink)]" : "text-[var(--d-foam)]";
  const soft = tone === "dark" ? "text-[var(--d-ink-soft)]" : "text-[var(--d-foam-dim)]";
  const accentColor = tone === "dark" ? "text-[var(--d-accent)]" : "text-[var(--d-glow)]";

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`text-[0.68rem] font-bold uppercase tracking-[0.26em] ${accentColor}`}>
        {label}
      </span>
      <h2 className={`mt-4 text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-[1.12] ${ink}`}>
        {title}{" "}
        <em className={`[font-family:var(--demo-display)] font-medium italic ${accentColor}`}>
          {accent}
        </em>
      </h2>
      {intro ? <p className={`mt-4 leading-[1.8] ${soft}`}>{intro}</p> : null}
    </div>
  );
}

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #1D8A7E 0%, #0C4A43 100%)",
  "linear-gradient(135deg, #3BA294 0%, #1D8A7E 100%)",
  "linear-gradient(135deg, #0C4A43 0%, #123B36 100%)",
  "linear-gradient(135deg, #5FB8AA 0%, #1D8A7E 100%)",
];

/** Initials avatar with a teal duotone gradient derived from the card index. */
export function DoctorAvatar({
  name,
  index,
  className = "h-14 w-14 text-base",
}: {
  name: string;
  index: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .filter((part) => !part.endsWith(".") && part.length > 1)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden
      style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
      className={`flex shrink-0 items-center justify-center rounded-2xl font-semibold tracking-wide text-[var(--d-foam)] ${className}`}
    >
      {initials}
    </span>
  );
}
