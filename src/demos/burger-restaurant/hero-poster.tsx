"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { ChevronDown, Volume2 } from "lucide-react";
import { SketchfabEmbed } from "@/components/demos/sketchfab-embed";
import type { GaragemContent } from "./content";
import { GUITAR_CREDIT, GUITAR_THUMB, GUITAR_UID } from "./content";
import { FOCUS_RING, Halftone, Stamp, scrollToId } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Rotated marquee tape — "SMASH • ROCK'N'ROLL • ...". Static under reduced motion. */
function MarqueeTape({ items, reduced }: { items: string[]; reduced: boolean }) {
  const line = items.map((s) => s.toUpperCase()).join("  •  ") + "  •  ";
  const strip = line.repeat(4);

  return (
    <div
      aria-hidden
      className="relative -mx-4 -rotate-2 border-y-4 border-[var(--d-bg)] bg-[var(--d-red)] py-2.5 shadow-[0_6px_24px_rgba(244,63,46,0.35)]"
    >
      <div className="overflow-hidden whitespace-nowrap">
        {reduced ? (
          <span className="text-lg font-normal uppercase tracking-[0.18em] text-[var(--d-bg)] [font-family:var(--demo-display)]">
            {strip}
          </span>
        ) : (
          <motion.div
            className="inline-flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            <span className="text-lg uppercase tracking-[0.18em] text-[var(--d-bg)] [font-family:var(--demo-display)]">
              {strip}
            </span>
            <span className="text-lg uppercase tracking-[0.18em] text-[var(--d-bg)] [font-family:var(--demo-display)]">
              {strip}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/** Spinning "est. 2016" bottle-cap badge (SVG text on a circle). */
function SpinBadge({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="absolute -right-4 -top-8 z-30 hidden h-28 w-28 md:block lg:-right-8"
      animate={reduced ? undefined : { rotate: 360 }}
      transition={reduced ? undefined : { duration: 22, ease: "linear", repeat: Infinity }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <circle cx="50" cy="50" r="48" fill="var(--d-yellow)" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="var(--d-bg)" strokeWidth="1.6" strokeDasharray="3 3" />
        <path id="gb-badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
        <text
          fill="var(--d-bg)"
          style={{ fontFamily: "var(--demo-mono)", fontSize: "10.2px", fontWeight: 700, letterSpacing: "0.22em" }}
        >
          <textPath href="#gb-badge-circle">GARAGEM BURGER • DESDE 2016 •</textPath>
        </text>
        <path d="M54 26 40 52h9l-2.5 22L64 46h-9.5L54 26Z" fill="var(--d-red)" stroke="var(--d-bg)" strokeWidth="1.4" />
      </svg>
    </motion.div>
  );
}

export function HeroPoster({ content }: { content: GaragemContent["hero"] }) {
  const reduced = useReducedMotion() ?? false;

  /* Never animates `rotate`, so static tilts set via style are preserved. */
  const line = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 34 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section id="topo" className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
      <Halftone />
      {/* Red stage-light bleed behind the guitar */}
      <div
        aria-hidden
        className="absolute -top-24 right-[-10%] h-[540px] w-[540px] rounded-full opacity-50 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(244,63,46,0.5), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-[-12%] h-[380px] w-[420px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(242,183,5,0.4), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        {/* Poster headline */}
        <div>
          <motion.p
            {...line(0)}
            className="inline-flex items-center gap-2 border-2 border-[var(--d-line)] bg-[var(--d-panel)] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]"
          >
            <Volume2 className="h-3.5 w-3.5 text-[var(--d-red)]" strokeWidth={2.4} aria-hidden />
            {content.badge}
          </motion.p>

          <h1 className="mt-6 uppercase leading-[0.92] [font-family:var(--demo-display)]">
            <motion.span {...line(0.08)} className="block text-[17vw] text-[var(--d-ink)] sm:text-7xl lg:text-[5.2rem]">
              {content.titleA}
            </motion.span>
            <motion.span
              {...line(0.16)}
              className="block w-max bg-[var(--d-yellow)] px-3 text-[17vw] text-[var(--d-bg)] shadow-[6px_6px_0_var(--d-red)] sm:text-7xl lg:text-[5.2rem]"
              style={{ rotate: "-1.5deg" }}
            >
              {content.titleB}
            </motion.span>
            <motion.span {...line(0.24)} className="block text-[13.5vw] text-[var(--d-red)] sm:text-6xl lg:text-[4.35rem]">
              {content.titleC}
            </motion.span>
          </h1>

          <motion.p
            {...line(0.34)}
            className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]"
          >
            {content.subtitle}
          </motion.p>

          <motion.div {...line(0.42)} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToId("cardapio")}
              className={`bg-[var(--d-red)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--d-bg)] shadow-[4px_4px_0_var(--d-yellow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_6px_0_var(--d-yellow)] active:translate-y-0 active:shadow-[2px_2px_0_var(--d-yellow)] ${FOCUS_RING}`}
            >
              {content.ctaMenu}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("como-chegar")}
              className={`border-2 border-[var(--d-ink)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--d-ink)] transition-colors duration-200 hover:border-[var(--d-yellow)] hover:text-[var(--d-yellow)] ${FOCUS_RING}`}
            >
              {content.ctaReserve}
            </button>
          </motion.div>
        </div>

        {/* Guitar on the amp — Sketchfab centerpiece */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="relative"
        >
          <SpinBadge reduced={reduced} />

          {/* Amp cabinet frame */}
          <div className="relative border-4 border-[var(--d-line)] bg-[var(--d-panel)] p-3 shadow-[10px_10px_0_rgba(244,63,46,0.28)]">
            {/* Corner screws */}
            {["left-1.5 top-1.5", "right-1.5 top-1.5", "bottom-1.5 left-1.5", "bottom-1.5 right-1.5"].map((pos) => (
              <span
                key={pos}
                aria-hidden
                className={`absolute ${pos} z-20 grid h-3 w-3 place-items-center rounded-full bg-[var(--d-line)]`}
              >
                <span className="block h-[1.5px] w-2 rotate-45 bg-[var(--d-bg)]" />
              </span>
            ))}

            {/* Amp header strip */}
            <div className="mb-3 flex items-center justify-between border-b-2 border-[var(--d-line)] px-1 pb-2.5">
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.3em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                {content.stageTag}
              </span>
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-[var(--d-red)] opacity-75 ${reduced ? "" : "animate-ping"}`} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--d-red)]" />
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-[var(--d-red)] [font-family:var(--demo-mono)]">
                  Rec
                </span>
              </span>
            </div>

            <SketchfabEmbed
              uid={GUITAR_UID}
              title={content.guitarTitle}
              thumb={GUITAR_THUMB}
              credit={GUITAR_CREDIT}
              loadLabel={content.loadLabel}
              hint={content.hint}
              accent="#F43F2E"
              autospin
              className="aspect-[4/3] sm:aspect-[16/10]"
            />

            {/* Speaker grill foot */}
            <div
              aria-hidden
              className="mt-3 h-8 border-2 border-[var(--d-line)]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--d-line) 0 2px, transparent 2px 7px)",
              }}
            />
          </div>

          <div className="mt-4 flex items-start gap-3 px-1">
            <Stamp rotate={-2}>3D</Stamp>
            <p className="max-w-sm text-[0.8rem] leading-relaxed text-[var(--d-ink-soft)]">
              {content.guitarCaption}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Marquee tape */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
        className="relative z-10 mt-16"
      >
        <MarqueeTape items={content.marquee} reduced={reduced} />
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToId("cardapio")}
        aria-label={content.ctaMenu}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className={`relative z-10 mx-auto mt-10 flex h-11 w-11 items-center justify-center border-2 border-[var(--d-line)] text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-red)] hover:text-[var(--d-red)] ${FOCUS_RING}`}
      >
        <motion.span
          aria-hidden
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.4} />
        </motion.span>
      </motion.button>
    </section>
  );
}
