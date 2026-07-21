"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { ImageKey } from "./content";

const IMAGE_IDS: Record<ImageKey, string> = {
  pizza: "photo-1565299624946-b28f40a0ae38",
  burger: "photo-1568901346375-23c9450c58cd",
  poke: "photo-1546069901-ba9599a7e63c",
  pancakes: "photo-1567620905732-2d1ec7ab7445",
  salad: "photo-1540189549336-e6e99c3679fe",
  veg: "photo-1512621776951-a57141f2eefd",
  dessert: "photo-1565958011703-44f9829ba187",
};

/** Builds an art-directed Unsplash URL from an approved image key. */
export function foodImage(key: ImageKey, width = 800): string {
  return `https://images.unsplash.com/${IMAGE_IDS[key]}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Soft grain overlay tuned for the warm cream surface. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(36,18,6,0.10) 1px, transparent 0)",
        backgroundSize: "22px 22px",
        opacity: 0.35,
        maskImage: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent 60%)",
        WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent 60%)",
      }}
    />
  );
}

/** Section eyebrow: a lime tick plus tracked uppercase label. */
export function Eyebrow({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "cream";
}) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${
        tone === "cream" ? "text-[var(--d-lime)]" : "text-[var(--d-accent-deep)]"
      }`}
    >
      <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--d-lime)]" />
      {children}
    </p>
  );
}

/** Compact star rating with a numeric badge, read as a single label. */
export function RatingBadge({
  rating,
  ariaLabel,
  className = "",
}: {
  rating: number;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${ariaLabel}: ${rating.toFixed(1)}`}
      className={`inline-flex items-center gap-1 rounded-full bg-[var(--d-ink)] px-2 py-1 text-[11px] font-bold text-white ${className}`}
    >
      <Star className="h-3 w-3 fill-[var(--d-lime)] text-[var(--d-lime)]" aria-hidden />
      {rating.toFixed(1)}
    </span>
  );
}

/** Interactive five-star input used to rate the courier after delivery. */
export function StarRating({
  value,
  onChange,
  ariaLabel,
}: {
  value: number;
  onChange: (value: number) => void;
  ariaLabel: string;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;
  return (
    <div role="group" aria-label={ariaLabel} className="inline-flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${ariaLabel}: ${star}`}
          aria-pressed={value === star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onFocus={() => setHover(star)}
          onBlur={() => setHover(0)}
          onClick={() => onChange(star)}
          className="rounded-full p-0.5 transition-transform hover:scale-115 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-accent)]"
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= active
                ? "fill-[var(--d-accent)] text-[var(--d-accent)]"
                : "fill-transparent text-[var(--d-line-strong)]"
            }`}
            strokeWidth={1.8}
          />
        </button>
      ))}
    </div>
  );
}

/** Flashes an "added" state on cart buttons for a short beat. */
export function useAddedFlash(): [boolean, () => void] {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1300);
    return () => clearTimeout(timer);
  }, [added]);
  return [added, () => setAdded(true)];
}
