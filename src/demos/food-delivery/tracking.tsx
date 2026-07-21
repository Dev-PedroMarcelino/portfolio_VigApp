"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Bike,
  Store,
  MapPin,
  ClipboardCheck,
  Flame,
  PartyPopper,
} from "lucide-react";
import type { PratoContent } from "./content";
import { Eyebrow, StarRating } from "./ui";

const ROUTE: [number, number][] = [
  [38, 150],
  [92, 128],
  [148, 156],
  [206, 96],
  [252, 116],
  [288, 44],
];

const STAGE_ICONS = [ClipboardCheck, Flame, Bike, PartyPopper];
const STAGE_ETA = [22, 14, 6, 0];

/** Returns an interpolated point along the polyline for fraction t in [0,1]. */
function pointAt(t: number): { x: number; y: number } {
  const clamped = Math.min(1, Math.max(0, t));
  const segs = ROUTE.length - 1;
  const segLengths = [];
  let total = 0;
  for (let i = 0; i < segs; i += 1) {
    const dx = ROUTE[i + 1][0] - ROUTE[i][0];
    const dy = ROUTE[i + 1][1] - ROUTE[i][1];
    const len = Math.hypot(dx, dy);
    segLengths.push(len);
    total += len;
  }
  let target = clamped * total;
  for (let i = 0; i < segs; i += 1) {
    if (target <= segLengths[i] || i === segs - 1) {
      const f = segLengths[i] === 0 ? 0 : target / segLengths[i];
      return {
        x: ROUTE[i][0] + (ROUTE[i + 1][0] - ROUTE[i][0]) * f,
        y: ROUTE[i][1] + (ROUTE[i + 1][1] - ROUTE[i][1]) * f,
      };
    }
    target -= segLengths[i];
  }
  return { x: ROUTE[segs][0], y: ROUTE[segs][1] };
}

export function TrackingTheatre({
  content,
  trigger,
}: {
  content: PratoContent["tracking"];
  trigger: number;
}) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rating, setRating] = useState(0);
  const lastStage = content.stages.length - 1;

  // A checkout sets a fresh trigger value: restart the tracking theatre.
  useEffect(() => {
    if (trigger === 0) return;
    setStage(0);
    setRating(0);
    setPlaying(true);
  }, [trigger]);

  // Auto-advance through the stages while playing.
  useEffect(() => {
    if (!playing) return;
    if (stage >= lastStage) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStage((s) => Math.min(lastStage, s + 1)), 2400);
    return () => clearTimeout(timer);
  }, [playing, stage, lastStage]);

  const progress = stage / lastStage;
  const marker = useMemo(() => pointAt(progress), [progress]);
  const delivered = stage === lastStage;
  const routePoints = ROUTE.map((p) => p.join(",")).join(" ");
  const routeD = `M ${ROUTE.map((p) => p.join(" ")).join(" L ")}`;

  return (
    <section id="tracking" className="scroll-mt-16 bg-[var(--d-ink)] py-16 text-white lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow tone="cream">{content.eyebrow}</Eyebrow>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/65">{content.intro}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#160B03] p-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                <span className="relative flex h-2 w-2">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--d-lime)] opacity-75" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-lime)]" />
                </span>
                {content.liveLabel}
              </span>
              <span className="text-xs font-semibold text-white/60">
                {content.orderIdLabel} {content.orderId}
              </span>
            </div>

            <svg
              viewBox="0 0 320 180"
              role="img"
              aria-label={content.mapAria}
              className="mt-4 w-full"
            >
              <defs>
                <pattern id="prato-grid" width="26" height="26" patternUnits="userSpaceOnUse">
                  <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="320" height="180" rx="16" fill="url(#prato-grid)" />
              <polyline
                points={routePoints}
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 8"
              />
              <motion.path
                d={routeD}
                fill="none"
                stroke="var(--d-lime)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                initial={false}
                animate={{ strokeDashoffset: 1 - progress }}
                transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}
              />
              {/* pickup */}
              <circle cx={ROUTE[0][0]} cy={ROUTE[0][1]} r="9" fill="var(--d-accent)" />
              <g transform={`translate(${ROUTE[0][0] - 5},${ROUTE[0][1] - 5})`}>
                <Store x={0} y={0} width={10} height={10} color="#fff" strokeWidth={2.4} />
              </g>
              {/* dropoff */}
              <circle
                cx={ROUTE[ROUTE.length - 1][0]}
                cy={ROUTE[ROUTE.length - 1][1]}
                r="9"
                fill="#fff"
              />
              <g transform={`translate(${ROUTE[ROUTE.length - 1][0] - 5},${ROUTE[ROUTE.length - 1][1] - 5})`}>
                <MapPin x={0} y={0} width={10} height={10} color="var(--d-accent)" strokeWidth={2.6} />
              </g>
              {/* courier marker */}
              <motion.g
                initial={false}
                animate={{ x: marker.x, y: marker.y }}
                transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}
              >
                <circle r="13" fill="var(--d-accent)" stroke="#160B03" strokeWidth="3" />
                <g transform="translate(-7,-7)">
                  <Bike width={14} height={14} color="#fff" strokeWidth={2.4} />
                </g>
              </motion.g>
            </svg>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--d-accent)] text-white">
                  <Bike className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold">{content.courierName}</p>
                  <p className="text-xs text-white/55">{content.courierRole}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="[font-family:var(--demo-display)] text-lg font-bold text-[var(--d-lime)]">
                  {delivered ? "0" : STAGE_ETA[stage]} min
                </p>
                <p className="text-[11px] uppercase tracking-wide text-white/50">
                  {content.etaLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-white/10 bg-[#160B03] p-5">
            <ol className="flex-1 space-y-1">
              {content.stages.map((s, i) => {
                const done = i < stage;
                const current = i === stage;
                const Icon = STAGE_ICONS[i];
                return (
                  <li key={s.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          done
                            ? "border-[var(--d-lime)] bg-[var(--d-lime)] text-[var(--d-ink)]"
                            : current
                              ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-white"
                              : "border-white/15 text-white/40"
                        }`}
                      >
                        {done ? (
                          <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
                        ) : (
                          <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                        )}
                      </span>
                      {i < lastStage && (
                        <span className="relative my-1 w-0.5 flex-1 overflow-hidden rounded bg-white/12">
                          <motion.span
                            className="absolute inset-x-0 top-0 block rounded bg-[var(--d-lime)]"
                            initial={false}
                            animate={{ height: done ? "100%" : "0%" }}
                            transition={{ duration: reduce ? 0 : 0.5 }}
                          />
                        </span>
                      )}
                    </div>
                    <div className={`pb-5 ${current ? "" : "opacity-80"}`}>
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-bold ${
                            current ? "text-[var(--d-lime)]" : "text-white"
                          }`}
                        >
                          {s.label}
                        </p>
                        <span className="text-[11px] font-medium text-white/45 tabular-nums">
                          {s.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs leading-snug text-white/60">{s.note}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {delivered ? (
              <div className="rounded-2xl bg-[var(--d-lime)]/15 p-4 text-center">
                <p className="[font-family:var(--demo-display)] text-lg font-bold text-[var(--d-lime)]">
                  {content.deliveredTitle}
                </p>
                <p className="mt-1 text-xs text-white/70">{content.deliveredNote}</p>
                <p className="mt-3 text-xs font-semibold text-white/80">{content.rateLabel}</p>
                <div className="mt-2 flex justify-center">
                  <StarRating value={rating} onChange={setRating} ariaLabel={content.rateAria} />
                </div>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                disabled={delivered}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--d-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--d-accent-deep)] disabled:opacity-40"
              >
                {playing ? (
                  <Pause className="h-4 w-4" aria-hidden />
                ) : (
                  <Play className="h-4 w-4" aria-hidden />
                )}
                {playing ? content.pauseLabel : content.playLabel}
              </button>
              <button
                type="button"
                onClick={() => setStage((s) => Math.max(0, s - 1))}
                disabled={stage === 0}
                aria-label={content.backLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                <ChevronLeft className="h-4.5 w-4.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setStage((s) => Math.min(lastStage, s + 1))}
                disabled={delivered}
                aria-label={content.nextLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                <ChevronRight className="h-4.5 w-4.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => {
                  setStage(0);
                  setPlaying(false);
                  setRating(0);
                }}
                aria-label={content.resetLabel}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                {content.resetLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
