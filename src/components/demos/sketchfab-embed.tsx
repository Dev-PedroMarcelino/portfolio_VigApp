"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Move3d } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Click-to-load facade around the official Sketchfab viewer.
 *
 * Real photogrammetry/PBR models are far heavier than any inline WebGL scene,
 * so the iframe is only injected after an explicit gesture: until then we show
 * the model's own poster with a play affordance. The wrapping element owns the
 * aspect ratio and rounding via `className`; this component fills it.
 *
 * All embedded models are CC-BY licensed — the viewer itself displays the
 * model/author attribution, and the facade shows a credit chip as well.
 */
export function SketchfabEmbed({
  uid,
  title,
  thumb,
  credit,
  loadLabel,
  hint,
  accent = "#ffffff",
  autospin,
  className,
}: {
  /** Sketchfab model uid, e.g. "d01b254483794de3819786d93e0e1ebf". */
  uid: string;
  /** Accessible title for the facade button and iframe. */
  title: string;
  /** Poster image (media.sketchfab.com thumbnail). */
  thumb: string;
  /** Attribution shown on the facade; license defaults to CC BY. */
  credit: { model: string; author: string; license?: string };
  /** Localized "view in 3D" label. */
  loadLabel: string;
  /** Localized orbit/zoom hint shown once the viewer is active. */
  hint?: string;
  /** Accent color for the play affordance. */
  accent?: string;
  /** Slow idle rotation once loaded. */
  autospin?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  const src =
    `https://sketchfab.com/models/${uid}/embed?autostart=1&ui_theme=dark&dnt=1` +
    (autospin ? "&autospin=0.2" : "");

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      {active && (
        <iframe
          title={title}
          src={src}
          onLoad={() => setReady(true)}
          className="absolute inset-0 z-10 h-full w-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
      )}

      {!ready && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`${loadLabel} — ${title}`}
          className="group absolute inset-0 z-20 block h-full w-full text-left"
        >
          <Image
            src={thumb}
            alt={title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 transition-opacity duration-500 group-hover:opacity-80"
          />

          {active ? (
            /* Iframe requested but not painted yet — quiet pulse. */
            <span className="absolute inset-0 grid place-items-center">
              <span
                className="h-10 w-10 animate-spin rounded-full border-2 border-white/25"
                style={{ borderTopColor: accent }}
              />
            </span>
          ) : (
            <span className="absolute inset-0 grid place-items-center">
              <span className="flex flex-col items-center gap-3">
                <span
                  className="grid h-16 w-16 place-items-center rounded-full border backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: `${accent}66`,
                    background: "rgba(0,0,0,0.35)",
                    boxShadow: `0 0 42px ${accent}33`,
                  }}
                >
                  <Play className="ml-0.5 h-6 w-6" style={{ color: accent }} strokeWidth={1.6} fill={accent} />
                </span>
                <span className="flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <Move3d className="h-3.5 w-3.5" strokeWidth={1.8} style={{ color: accent }} />
                  {loadLabel}
                </span>
              </span>
            </span>
          )}

          <span className="absolute bottom-3 left-3 max-w-[80%] truncate rounded-full bg-black/45 px-3 py-1 text-[10px] text-white/75 backdrop-blur-md">
            {credit.model} — {credit.author} · {credit.license ?? "CC BY"} · Sketchfab
          </span>
        </button>
      )}

      {ready && hint && (
        <span className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
          {hint}
        </span>
      )}
    </div>
  );
}
