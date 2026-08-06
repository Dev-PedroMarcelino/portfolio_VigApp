"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import type { Colorway } from "./content";
import { shot } from "./ui";

/**
 * The drop, put on a turntable that is made of type instead of geometry.
 *
 * A brand ring runs around the pair on a circular `textPath` and turns against
 * a measured bezel; a conic wash rotates behind the glass; the shoe itself is
 * duotoned into the selected colorway and re-tinted through an expanding
 * circular wipe. Callout pins draw their leader lines out to the spec chips.
 *
 * It reads as a product studio rather than a viewer, which is the point: VIELA
 * sells the drop, not the technology.
 */

/** Bezel ticks around the stage; every fifth one is long. */
const TICKS = Array.from({ length: 72 }, (_, i) => i);

const PINS = [
  { x: 26, y: 34, flip: false },
  { x: 78, y: 52, flip: true },
  { x: 38, y: 76, flip: false },
] as const;

export function ProductStage({
  photo,
  alt,
  ringText,
  colorways,
  pins,
  swatchLabel,
}: {
  /** Unsplash id for the pair on the stage. */
  photo: string;
  alt: string;
  /** Sentence that laps the stage; repeated to close the circle. */
  ringText: string;
  colorways: Colorway[];
  pins: { label: string; value: string }[];
  /** Accessible group label for the colorway switcher. */
  swatchLabel: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const uid = useId().replace(/[:]/g, "");
  const [active, setActive] = useState(0);
  /* The tint already painted; the new one wipes over it from the centre. */
  const [base, setBase] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 80, damping: 16, mass: 0.5 });
  const shoeX = useTransform(sx, [-1, 1], [-18, 18]);
  const shoeY = useTransform(sy, [-1, 1], [-14, 14]);
  const pinX = useTransform(sx, [-1, 1], [14, -14]);
  const pinY = useTransform(sy, [-1, 1], [10, -10]);

  const cw = colorways[active];
  const baseCw = colorways[base];

  return (
    <div>
      <motion.div
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
          my.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="relative aspect-square w-full"
      >
        {/* Conic wash behind the glass, lit by the active colorway. */}
        <motion.span
          aria-hidden
          className="absolute inset-[8%] rounded-full opacity-45 blur-3xl"
          style={{
            backgroundImage: `conic-gradient(from 0deg, ${cw.from}, ${cw.to}, var(--d-volt), ${cw.from})`,
            transition: "background-image 600ms ease",
          }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
        />

        {/* Bezel: measured ticks plus one sweeping arc. */}
        <svg viewBox="0 0 400 400" aria-hidden className="absolute inset-0 h-full w-full">
          <defs>
            <path
              id={`ring-${uid}`}
              /* Counter-clockwise so the type reads outward, not mirrored. */
              d="M200,200 m0,-168 a168,168 0 1,1 0,336 a168,168 0 1,1 0,-336"
              fill="none"
            />
          </defs>

          <circle cx="200" cy="200" r="150" fill="none" stroke="var(--d-line)" strokeWidth="1" />
          <g>
            {TICKS.map((i) => {
              const long = i % 5 === 0;
              return (
                <line
                  key={i}
                  x1="200"
                  y1={long ? 36 : 41}
                  x2="200"
                  y2="47"
                  stroke={long ? "var(--d-accent)" : "var(--d-mute)"}
                  strokeWidth={long ? 1.6 : 1}
                  opacity={long ? 0.85 : 0.5}
                  transform={`rotate(${i * 5} 200 200)`}
                />
              );
            })}
          </g>

          {/* The live arc — the only thing on the bezel that moves on its own. */}
          <motion.circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="var(--d-volt)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="120 822"
            style={{ transformOrigin: "200px 200px" }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "linear" }}
          />

          {/* Brand ring, turning the other way against the bezel. */}
          <motion.g
            style={{ transformOrigin: "200px 200px" }}
            animate={reduced ? undefined : { rotate: -360 }}
            transition={reduced ? undefined : { duration: 34, repeat: Infinity, ease: "linear" }}
          >
            <text
              className="[font-family:var(--demo-body)]"
              fontSize="15"
              fontWeight="700"
              letterSpacing="5"
              fill="var(--d-ink-soft)"
            >
              <textPath href={`#ring-${uid}`}>
                {`${ringText} · ${ringText} · `}
              </textPath>
            </text>
          </motion.g>
        </svg>

        {/* The pair */}
        <div className="absolute inset-[16%] overflow-hidden rounded-full ring-1 ring-inset ring-white/10">
          <motion.div
            style={reduced ? undefined : { x: shoeX, y: shoeY }}
            className="absolute -inset-[8%]"
          >
            <Image
              src={shot(photo, 1000)}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 520px, 88vw"
              className="object-cover [filter:grayscale(1)_contrast(1.25)_brightness(0.92)]"
            />
          </motion.div>

          {/* Duotone: the settled tint, then the incoming one wiping over it. */}
          <span
            aria-hidden
            className="absolute inset-0 mix-blend-color"
            style={{ backgroundImage: `linear-gradient(150deg, ${baseCw.from}, ${baseCw.to})` }}
          />
          <motion.span
            key={`tint-${cw.id}`}
            aria-hidden
            className="absolute inset-0 mix-blend-color"
            style={{ backgroundImage: `linear-gradient(150deg, ${cw.from}, ${cw.to})` }}
            initial={reduced ? false : { clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(75% at 50% 50%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setBase(active)}
          />
          <span
            aria-hidden
            className="absolute inset-0 opacity-25 mix-blend-screen"
            style={{ backgroundImage: `linear-gradient(150deg, ${cw.from}, transparent 60%)` }}
          />
        </div>

        {/* Callouts, riding above the glass and counter-parallaxed. */}
        <motion.div
          aria-hidden
          style={reduced ? undefined : { x: pinX, y: pinY }}
          className="absolute inset-0"
        >
          {pins.slice(0, PINS.length).map((pin, i) => {
            const spot = PINS[i];
            return (
              <motion.div
                key={pin.label}
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.18 }}
                className={`absolute flex items-center ${spot.flip ? "flex-row-reverse" : ""}`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: spot.flip ? "translate(-100%, -50%)" : "translate(0, -50%)",
                }}
              >
                <span className="relative grid h-2.5 w-2.5 shrink-0 place-items-center">
                  <span className="absolute h-2.5 w-2.5 rounded-full bg-[var(--d-volt)]" />
                  <span className="absolute h-5 w-5 animate-ping rounded-full bg-[var(--d-volt)]/30" />
                </span>
                <motion.span
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.52 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px w-6 bg-[var(--d-volt)]"
                  style={{ transformOrigin: spot.flip ? "right" : "left" }}
                />
                <motion.span
                  initial={reduced ? false : { opacity: 0, x: spot.flip ? 8 : -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: 0.72 + i * 0.18 }}
                  className="whitespace-nowrap rounded-full border border-[var(--d-volt)]/40 bg-[#12081F]/85 px-3 py-1.5 backdrop-blur-md"
                >
                  <span className="block text-[0.5rem] font-bold uppercase tracking-[0.2em] text-[var(--d-mute)] [font-family:var(--demo-body)]">
                    {pin.label}
                  </span>
                  <span className="mt-0.5 block text-[0.7rem] font-bold text-[var(--d-ink)] [font-family:var(--demo-body)]">
                    {pin.value}
                  </span>
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Colorway switcher — the one control on the stage. */}
      <div
        role="group"
        aria-label={swatchLabel}
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        {colorways.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              className={`group flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 transition-colors ${
                on
                  ? "border-[var(--d-volt)] bg-[var(--d-volt)]/10"
                  : "border-[var(--d-line)] hover:border-[var(--d-accent)]"
              }`}
            >
              <span
                aria-hidden
                className="h-5 w-5 rounded-full ring-1 ring-inset ring-white/25"
                style={{ backgroundImage: `linear-gradient(140deg, ${c.from}, ${c.to})` }}
              />
              <span
                className={`text-[0.6rem] font-bold uppercase tracking-[0.16em] [font-family:var(--demo-body)] ${
                  on ? "text-[var(--d-ink)]" : "text-[var(--d-ink-soft)]"
                }`}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
