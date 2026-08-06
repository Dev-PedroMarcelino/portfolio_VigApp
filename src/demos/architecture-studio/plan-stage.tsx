"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import type { SpaceId } from "./content";

/**
 * The drawing draws itself.
 *
 * Prumo's whole pitch is that decisions happen on paper, where they are cheap.
 * So the centrepiece is the paper: a measured floor plan that plots live —
 * walls first, then openings, then the door swings, then the furniture
 * footprints, then the dimension chains — while a low sun crosses the room.
 *
 * It is drawn, not photographed, and every stroke is real geometry rather than
 * an illustration of one, which is exactly what an architecture studio should
 * be showing. Under reduced motion the whole plan renders in its final state.
 */

interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Corner radius; half the width turns the block into a circle. */
  r?: number;
  /** Rugs and thresholds — filled faintly, no outline. */
  soft?: boolean;
}

interface Dim {
  /** Chain runs along this axis, offset from the room by the plan. */
  axis: "x" | "y";
  /** Start and end in the axis being measured. */
  from: number;
  to: number;
  /** Position on the other axis. */
  at: number;
  label: string;
}

interface Plan {
  /** Load-bearing walls, in the order a hand would draw them. */
  walls: string[];
  /** Glazing laid inside the wall gaps. */
  openings: string[];
  /** Door leaves and their swing arcs. */
  doors: string[];
  blocks: Block[];
  dims: Dim[];
}

const VIEW = { w: 880, h: 560 };

const PLANS: Record<SpaceId, Plan> = {
  living: {
    walls: [
      "M140 110 H380",
      "M560 110 H740",
      "M740 110 V200",
      "M740 380 V470",
      "M740 470 H400",
      "M300 470 H140",
      "M140 470 V110",
    ],
    openings: ["M380 110 H560", "M740 200 V380"],
    doors: ["M300 470 V370", "M300 370 A100 100 0 0 1 400 470"],
    blocks: [
      { x: 250, y: 250, w: 300, h: 170, soft: true },
      { x: 250, y: 130, w: 280, h: 36, r: 4 },
      { x: 230, y: 370, w: 260, h: 80, r: 12 },
      { x: 330, y: 290, w: 130, h: 70, r: 8 },
      { x: 560, y: 300, w: 80, h: 80, r: 14 },
      { x: 566, y: 402, w: 60, h: 60, r: 30 },
      { x: 640, y: 130, w: 80, h: 120, r: 4 },
    ],
    dims: [
      { axis: "x", from: 140, to: 740, at: 66, label: "6,00" },
      { axis: "y", from: 110, to: 470, at: 92, label: "3,60" },
    ],
  },
  dining: {
    walls: [
      "M140 110 H300",
      "M580 110 H740",
      "M740 110 V250",
      "M740 350 V470",
      "M740 470 H140",
      "M140 470 V110",
    ],
    openings: ["M300 110 H580"],
    doors: ["M740 350 H640", "M640 350 A100 100 0 0 1 740 250"],
    blocks: [
      { x: 270, y: 200, w: 340, h: 190, soft: true },
      { x: 300, y: 230, w: 280, h: 130, r: 18 },
      { x: 322, y: 172, w: 44, h: 44, r: 8 },
      { x: 418, y: 172, w: 44, h: 44, r: 8 },
      { x: 514, y: 172, w: 44, h: 44, r: 8 },
      { x: 322, y: 374, w: 44, h: 44, r: 8 },
      { x: 418, y: 374, w: 44, h: 44, r: 8 },
      { x: 514, y: 374, w: 44, h: 44, r: 8 },
      { x: 240, y: 273, w: 44, h: 44, r: 8 },
      { x: 596, y: 273, w: 44, h: 44, r: 8 },
      { x: 160, y: 150, w: 56, h: 200, r: 4 },
      { x: 640, y: 400, w: 80, h: 56, r: 4 },
    ],
    dims: [
      { axis: "x", from: 140, to: 740, at: 66, label: "6,00" },
      { axis: "y", from: 110, to: 470, at: 92, label: "3,60" },
    ],
  },
  bath: {
    walls: [
      "M240 110 H400",
      "M520 110 H640",
      "M640 110 V470",
      "M640 470 H420",
      "M320 470 H240",
      "M240 470 V110",
    ],
    openings: ["M400 110 H520"],
    doors: ["M420 470 V370", "M420 370 A100 100 0 0 0 320 470"],
    blocks: [
      { x: 250, y: 120, w: 150, h: 150, r: 2 },
      { x: 420, y: 130, w: 210, h: 110, r: 42 },
      { x: 250, y: 330, w: 200, h: 70, r: 4 },
      { x: 278, y: 344, w: 42, h: 42, r: 21 },
      { x: 372, y: 344, w: 42, h: 42, r: 21 },
      { x: 540, y: 330, w: 70, h: 100, r: 18 },
    ],
    dims: [
      { axis: "x", from: 240, to: 640, at: 66, label: "4,00" },
      { axis: "y", from: 110, to: 470, at: 192, label: "3,60" },
    ],
  },
};

/** Finish schedule swatches, paired index-for-index with the copy's names. */
const PALETTES: Record<SpaceId, string[]> = {
  living: ["#C9BBA4", "#8A6F4E", "#3B3730", "#E7E2D8"],
  dining: ["#B08D57", "#6E5B45", "#2F2C27", "#DED7C9"],
  bath: ["#D8D2C6", "#9C7C4F", "#4A4A46", "#F2EFE8"],
};

/* One shared clock so walls, doors and furniture read as a single hand. */
const DRAW = 0.9;
const STEP = 0.11;

export function PlanStage({
  space,
  specs,
  materials,
  unitLabel,
  scaleLabel,
  className,
}: {
  space: SpaceId;
  /** Two schedule figures printed in the drawing's title block. */
  specs: { label: string; value: string }[];
  /** Finish names, paired with the room's palette. */
  materials: string[];
  /** Unit suffix for the dimension chains, e.g. "m". */
  unitLabel: string;
  /** Title-block scale note, e.g. "esc. 1:50". */
  scaleLabel: string;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const plan = PLANS[space];
  const palette = PALETTES[space];

  /**
   * Reduced motion collapses the plot to its finished sheet.
   *
   * `whileInView` stays on the element in both branches on purpose. The
   * reduced-motion flag only resolves after mount, so the first paint has
   * already written `opacity: 0` onto every stroke; dropping the animation
   * props at that point would leave the drawing invisible forever rather than
   * static. Keeping the target and zeroing the duration snaps it complete.
   */
  const stroke = (delay: number) => ({
    initial: reduced ? undefined : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: reduced
      ? { duration: 0 }
      : {
          pathLength: { duration: DRAW, delay, ease: [0.65, 0, 0.35, 1] as const },
          opacity: { duration: 0.12, delay },
        },
  });

  const wallsEnd = plan.walls.length * STEP + DRAW;

  return (
    <div className={className}>
      <div className="relative overflow-hidden bg-[var(--d-bg)]">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-label={`${specs.map((s) => `${s.label}: ${s.value}`).join(", ")}`}
          className="block w-full"
        >
          <defs>
            <pattern id={`grid-${space}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0 H0 V20" fill="none" stroke="var(--d-line)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Setting-out grid, the sheet the plan sits on. */}
          <motion.rect
            width={VIEW.w}
            height={VIEW.h}
            fill={`url(#grid-${space})`}
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 0.55 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
          />

          {/* Furniture footprints, laid down after the shell is closed. */}
          {plan.blocks.map((b, i) => (
            <motion.rect
              key={`b${i}`}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={b.r ?? 0}
              fill={b.soft ? "var(--d-accent)" : "var(--d-bg-soft)"}
              fillOpacity={b.soft ? 0.07 : 1}
              stroke={b.soft ? "none" : "var(--d-ink-soft)"}
              strokeWidth={b.soft ? 0 : 1.5}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: wallsEnd + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          {/* Walls — the first and heaviest pass. */}
          {plan.walls.map((d, i) => (
            <motion.path
              key={`w${i}`}
              d={d}
              fill="none"
              stroke="var(--d-ink)"
              strokeWidth={7}
              strokeLinecap="square"
              {...stroke(i * STEP)}
            />
          ))}

          {/* Glazing, drawn thin inside the wall gaps. */}
          {plan.openings.map((d, i) => (
            <motion.path
              key={`o${i}`}
              d={d}
              fill="none"
              stroke="var(--d-accent)"
              strokeWidth={3}
              {...stroke(wallsEnd - 0.35 + i * 0.12)}
            />
          ))}

          {/* Door leaf and swing. */}
          {plan.doors.map((d, i) => (
            <motion.path
              key={`d${i}`}
              d={d}
              fill="none"
              stroke="var(--d-ink-soft)"
              strokeWidth={i === 0 ? 3 : 1.5}
              strokeDasharray={i === 0 ? undefined : "5 5"}
              {...stroke(wallsEnd + 0.1 + i * 0.18)}
            />
          ))}

          {/* Dimension chains, last — as on any real sheet. */}
          {plan.dims.map((dim, i) => {
            const horizontal = dim.axis === "x";
            const line = horizontal
              ? `M${dim.from} ${dim.at} H${dim.to}`
              : `M${dim.at} ${dim.from} V${dim.to}`;
            const midX = horizontal ? (dim.from + dim.to) / 2 : dim.at - 10;
            const midY = horizontal ? dim.at - 12 : (dim.from + dim.to) / 2;
            return (
              <g key={`dim${i}`}>
                <motion.path
                  d={line}
                  fill="none"
                  stroke="var(--d-ink-faint)"
                  strokeWidth={1}
                  {...stroke(wallsEnd + 0.55 + i * 0.14)}
                />
                {/* Ticks at both ends, the surveyor's slash. */}
                <motion.path
                  d={
                    horizontal
                      ? `M${dim.from - 5} ${dim.at + 5} l10 -10 M${dim.to - 5} ${dim.at + 5} l10 -10`
                      : `M${dim.at - 5} ${dim.from + 5} l10 -10 M${dim.at - 5} ${dim.to + 5} l10 -10`
                  }
                  fill="none"
                  stroke="var(--d-ink-faint)"
                  strokeWidth={1}
                  {...stroke(wallsEnd + 0.62 + i * 0.14)}
                />
                <motion.text
                  x={midX}
                  y={midY}
                  textAnchor="middle"
                  transform={horizontal ? undefined : `rotate(-90 ${midX} ${midY})`}
                  className="[font-family:var(--demo-mono)]"
                  fontSize="15"
                  letterSpacing="1.5"
                  fill="var(--d-ink-soft)"
                  initial={reduced ? undefined : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: wallsEnd + 0.85 + i * 0.14 }}
                >
                  {dim.label} {unitLabel}
                </motion.text>
              </g>
            );
          })}

          {/* North point, bottom right of the sheet. */}
          <motion.g
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: wallsEnd + 1 }}
          >
            <circle cx={806} cy={492} r={22} fill="none" stroke="var(--d-line)" strokeWidth={1} />
            <path d="M806 474 L812 496 L806 491 L800 496 Z" fill="var(--d-accent)" />
            <text
              x={806}
              y={524}
              textAnchor="middle"
              fontSize="12"
              letterSpacing="2"
              fill="var(--d-ink-faint)"
              className="[font-family:var(--demo-mono)]"
            >
              N
            </text>
          </motion.g>
        </svg>

        {/* Low sun crossing the room — the study that decides where glass goes. */}
        {!reduced && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(102deg, transparent 34%, rgba(176,141,87,0.16) 46%, rgba(176,141,87,0.05) 58%, transparent 68%)",
              backgroundSize: "240% 100%",
            }}
            initial={{ backgroundPosition: "120% 0%" }}
            animate={{ backgroundPosition: "-40% 0%" }}
            transition={{ duration: 9, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Title block: schedule figures on the left, finishes on the right. */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--d-line)] pt-5">
        <dl className="flex gap-8">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <dt className="[font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
                {s.label}
              </dt>
              <dd className="mt-1.5 [font-family:var(--demo-mono)] text-[15px] text-[var(--d-ink)]">
                {s.value}
              </dd>
            </motion.div>
          ))}
        </dl>

        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-3">
            {materials.map((name, i) => (
              <motion.li
                key={name}
                initial={reduced ? undefined : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.24 + i * 0.07 }}
                className="flex items-center gap-2"
              >
                <span
                  aria-hidden
                  className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/10"
                  style={{ backgroundColor: palette[i % palette.length] }}
                />
                <span className="[font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-soft)]">
                  {name}
                </span>
              </motion.li>
            ))}
          </ul>
          <span className="[font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--d-ink-faint)]">
            {scaleLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
