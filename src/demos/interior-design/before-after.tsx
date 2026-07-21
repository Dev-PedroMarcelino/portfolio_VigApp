"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import type { AmbraContent } from "./content";
import { Reveal, SectionHeading, unsplash } from "./ui";

export function BeforeAfter({ content }: { content: AmbraContent["beforeAfter"] }) {
  const [pos, setPos] = useState(52);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, raw)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      setFromClientX(e.clientX);
    },
    [setFromClientX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    },
    [setFromClientX],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(2, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(98, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(2);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(98);
    }
  }, []);

  const url = unsplash(content.imageId, 1600);

  return (
    <section
      id="transformation"
      className="scroll-mt-20 bg-[var(--d-bg-2)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={frameRef}
            className="relative mt-10 aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-3xl border border-[var(--d-line)] shadow-[0_40px_80px_-50px_rgba(43,38,33,0.5)]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* BEFORE — cool, desaturated, raw shell */}
            <div className="absolute inset-0">
              <Image
                src={url}
                alt={content.beforeAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover [filter:grayscale(0.9)_brightness(0.82)_contrast(1.02)]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(30,36,44,0.28), rgba(30,36,44,0.42))" }}
              />
              <span className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur">
                {content.beforeLabel}
              </span>
            </div>

            {/* AFTER — warm, styled; clipped to the slider position */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src={url}
                alt={content.afterAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover [filter:saturate(1.12)_brightness(1.04)]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(180,86,15,0.08), rgba(43,38,33,0.22))",
                }}
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-[var(--d-accent)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                {content.afterLabel}
              </span>
            </div>

            {/* Handle */}
            <div
              className="absolute inset-y-0 z-10 w-px bg-white/90"
              style={{ left: `${pos}%` }}
            >
              <button
                type="button"
                role="slider"
                aria-label={content.ariaSlider}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={onKeyDown}
                className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/70 bg-[var(--d-cream)] text-[var(--d-ink)] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d-accent)]"
              >
                <MoveHorizontal className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur">
              {content.hint}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[14px] text-[var(--d-soft)]">{content.caption}</p>
            <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--d-accent)]">
              {content.project}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
