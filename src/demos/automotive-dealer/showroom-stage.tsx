"use client";

import { useEffect } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { EASE } from "./ui";

/**
 * The hero stage: the car of the week under a moving showroom light, being
 * audited live.
 *
 * The whole composition is one story told in four passes — the paint catches a
 * champagne sheen, a laser walks the body top to bottom and leaves a gold
 * inspection print behind it, callout pins draw their leader lines out to the
 * spec chips, and the audit meters fill. It is the dealership's actual pitch
 * ("procedência auditada item a item") turned into motion, which is why it is
 * built from layers we control rather than a generic viewer.
 *
 * Nothing here is interactive: the visitor scrolls, the stage performs. The
 * only pointer response is parallax, and reduced motion collapses the entire
 * sequence to its final frame.
 */

export interface StagePin {
  label: string;
  value: string;
}

export interface StageMeter {
  label: string;
  /** 0–100; how full the audit bar settles. */
  pct: number;
}

/**
 * Where each callout sits on the photograph, in percent of the frame. Fixed to
 * the art, not to the copy — the labels translate, the anchors do not.
 * `flip` puts the chip on the left of its dot so it never runs off the frame.
 */
const PIN_SPOTS = [
  { x: 17, y: 63, flip: false },
  { x: 84, y: 47, flip: true },
  { x: 55, y: 74, flip: false },
] as const;

export function ShowroomStage({
  photo,
  alt,
  scanLabel,
  scanDone,
  pins,
  meters,
}: {
  photo: string;
  alt: string;
  /** Mono caption riding with the laser, e.g. "Laudo cautelar · 160 itens". */
  scanLabel: string;
  /** Verdict stamped once the sweep completes. */
  scanDone: string;
  pins: StagePin[];
  meters: StageMeter[];
}) {
  const reduced = useReducedMotion() ?? false;

  /* Pointer parallax. Raw values are written on move and smoothed by springs,
     so the layers keep drifting for a beat after the cursor stops. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.5 });

  const bodyX = useTransform(sx, [-1, 1], [-16, 16]);
  const bodyY = useTransform(sy, [-1, 1], [-11, 11]);
  /* The HUD counter-moves, which is what sells the depth between them. */
  const hudX = useTransform(sx, [-1, 1], [20, -20]);
  const hudY = useTransform(sy, [-1, 1], [13, -13]);
  const glareX = useTransform(sx, [-1, 1], ["28%", "72%"]);
  const glareY = useTransform(sy, [-1, 1], ["28%", "72%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(38% 46% at ${gx} ${gy}, rgba(255,232,183,0.22), transparent 72%)`,
  );

  /* The audit pass. 0 is untouched paint, 1 is a fully printed body. */
  const scan = useMotionValue(0);
  const printClip = useTransform(scan, (v) => `inset(0% 0% ${(1 - v) * 100}% 0%)`);
  const laserTop = useTransform(scan, (v) => `${v * 100}%`);
  const laserOpacity = useTransform(scan, [0, 0.03, 0.94, 1], [0, 1, 1, 0]);
  const verdictOpacity = useTransform(scan, [0.82, 1], [0, 1]);

  useEffect(() => {
    /* Reduced motion gets the pass's resting frame — a fully printed body with
       the verdict stamped. Parking `scan` at 1 rather than dropping the bound
       styles matters: the flag only resolves after mount, so those styles have
       already been written and would otherwise freeze the stage mid-sweep. */
    if (reduced) {
      scan.set(1);
      return;
    }
    /* Keyframes rather than a target value: every repeat has to start from a
       clean body again, not from wherever the last pass finished. */
    const controls = animate(scan, [0, 1], {
      duration: 2.6,
      ease: [0.65, 0, 0.35, 1],
      repeat: Infinity,
      repeatDelay: 5.2,
    });
    return () => controls.stop();
  }, [reduced, scan]);

  return (
    <div className="relative">
      <motion.div
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set(((e.clientX - r.left) / r.width) * 2 - 1);
          py.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[var(--d-line)] bg-[#08090C] shadow-[0_40px_100px_rgba(0,0,0,0.6)] sm:aspect-[4/4.4]"
      >
        {/* The paint. Oversized so the parallax never exposes an edge. */}
        <motion.div
          style={reduced ? undefined : { x: bodyX, y: bodyY }}
          className="absolute -inset-[5%]"
        >
          <Image
            src={photo}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 92vw"
            className="object-cover"
          />
        </motion.div>

        {/* Graded to the demo's graphite-and-champagne palette. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/15 to-[#08090C]/45"
        />

        {/* Showroom light passing over the bodywork. */}
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute inset-0 mix-blend-overlay"
            style={{
              backgroundImage:
                "linear-gradient(104deg, transparent 38%, rgba(255,255,255,0.16) 47%, rgba(217,164,65,0.34) 51%, rgba(255,255,255,0.12) 56%, transparent 66%)",
              backgroundSize: "260% 100%",
            }}
            initial={{ backgroundPosition: "130% 0%" }}
            animate={{ backgroundPosition: "-45% 0%" }}
            transition={{ duration: 6.4, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          />
        )}

        {/* The inspection print the laser leaves behind: same frame, rendered
            as a gold contact sheet with a fine raster over it. */}
        <motion.div aria-hidden className="absolute inset-0" style={{ clipPath: printClip }}>
          <motion.div
            style={reduced ? undefined : { x: bodyX, y: bodyY }}
            className="absolute -inset-[5%] opacity-[0.55] [filter:grayscale(1)_sepia(1)_hue-rotate(-8deg)_saturate(2.6)_contrast(1.5)_brightness(1.05)] mix-blend-screen"
          >
            <Image src={photo} alt="" fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
          </motion.div>
          <span
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(217,164,65,0.16) 0px, rgba(217,164,65,0.16) 1px, transparent 1px, transparent 5px)",
            }}
          />
        </motion.div>

        {/* The laser itself, with its caption riding one line under it. */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 z-20"
            style={{ top: laserTop, opacity: laserOpacity }}
          >
            <span className="block h-px w-full bg-[var(--d-gold)] shadow-[0_0_18px_3px_rgba(217,164,65,0.55)]" />
            <span className="mt-2 ml-4 inline-block bg-[#08090C]/70 px-2 py-0.5 text-[0.56rem] uppercase tracking-[0.22em] text-[var(--d-gold)] backdrop-blur-sm [font-family:var(--demo-mono)]">
              {scanLabel}
            </span>
          </motion.div>
        )}

        {/* Pointer glare, so the surface reacts to the cursor like lacquer. */}
        {!reduced && (
          <motion.span aria-hidden className="absolute inset-0 z-10" style={{ backgroundImage: glare }} />
        )}

        {/* Turntable: a dashed disc laid flat under the car. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[6%] left-1/2 z-10 h-[42%] w-[86%] -translate-x-1/2 [perspective:600px]"
        >
          <div
            className="h-full w-full animate-spin-slow rounded-full border border-dashed border-[var(--d-gold)]/25"
            style={{ transform: "rotateX(76deg)" }}
          />
        </div>

        {/* Callouts */}
        <motion.div
          aria-hidden
          style={reduced ? undefined : { x: hudX, y: hudY }}
          className="absolute inset-0 z-30"
        >
          {pins.slice(0, PIN_SPOTS.length).map((pin, i) => {
            const spot = PIN_SPOTS[i];
            return (
              <motion.div
                key={pin.label}
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.22, ease: EASE }}
                className={`absolute flex items-center gap-0 ${spot.flip ? "flex-row-reverse" : ""}`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: spot.flip ? "translate(-100%, -50%)" : "translate(0, -50%)",
                }}
              >
                <span className="relative grid h-2 w-2 shrink-0 place-items-center">
                  <span className="absolute h-2 w-2 rotate-45 bg-[var(--d-gold)]" />
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-[var(--d-gold)]/25" />
                </span>
                {/* Leader line: scales out of the dot toward the chip. */}
                <motion.span
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.62 + i * 0.22, ease: EASE }}
                  className="h-px w-7 bg-gradient-to-r from-[var(--d-gold)] to-[var(--d-gold)]/40"
                  style={{ transformOrigin: spot.flip ? "right" : "left" }}
                />
                <motion.span
                  initial={reduced ? false : { opacity: 0, x: spot.flip ? 8 : -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.86 + i * 0.22, ease: EASE }}
                  className="whitespace-nowrap border border-[var(--d-gold)]/25 bg-[#08090C]/80 px-2.5 py-1.5 backdrop-blur-md"
                >
                  <span className="block text-[0.5rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                    {pin.label}
                  </span>
                  <span className="mt-0.5 block text-[0.72rem] font-semibold text-[var(--d-gold-soft)] [font-family:var(--demo-mono)]">
                    {pin.value}
                  </span>
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Verdict, stamped as the sweep clears the bottom edge. */}
        <motion.span
          aria-hidden
          style={{ opacity: verdictOpacity }}
          className="absolute right-4 top-4 z-30 border border-[var(--d-gold)]/45 bg-[var(--d-gold)]/10 px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.24em] text-[var(--d-gold)] backdrop-blur-sm [font-family:var(--demo-mono)]"
        >
          {scanDone}
        </motion.span>

        {/* Corner ticks framing the stage */}
        <span aria-hidden className="absolute left-3 top-3 z-30 h-5 w-5 border-l border-t border-[var(--d-gold)]/60" />
        <span aria-hidden className="absolute right-3 top-3 z-30 h-5 w-5 border-r border-t border-[var(--d-gold)]/60" />
        <span aria-hidden className="absolute bottom-3 left-3 z-30 h-5 w-5 border-b border-l border-[var(--d-gold)]/60" />
        <span aria-hidden className="absolute bottom-3 right-3 z-30 h-5 w-5 border-b border-r border-[var(--d-gold)]/60" />
      </motion.div>

      {/* Audit meters — the numbers behind the "160 itens" claim. */}
      <dl className="mt-5 grid grid-cols-3 gap-4">
        {meters.map((m, i) => (
          <div key={m.label}>
            <dt className="text-[0.55rem] uppercase leading-tight tracking-[0.18em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
              {m.label}
            </dt>
            <dd className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[var(--d-line)]">
              <motion.span
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={{ scaleX: m.pct / 100 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: EASE }}
                className="block h-full origin-left rounded-full bg-gradient-to-r from-[var(--d-gold)]/40 to-[var(--d-gold)]"
              />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
