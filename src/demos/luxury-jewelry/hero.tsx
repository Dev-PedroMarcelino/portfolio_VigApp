"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { AureliaContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ content }: { content: AureliaContent["hero"] }) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(42);
  const springConfig = { stiffness: 55, damping: 24, mass: 1.1 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const spotlight = useMotionTemplate`radial-gradient(46% 46% at ${x}% ${y}%, rgba(232,206,122,0.42) 0%, rgba(212,175,55,0.16) 26%, rgba(16,16,20,0.0) 58%)`;
  const sheen = useMotionTemplate`radial-gradient(30% 30% at ${x}% ${y}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.0) 60%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((event.clientX - rect.left) / rect.width) * 100);
    rawY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  function handleLeave() {
    rawX.set(50);
    rawY.set(42);
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-[var(--d-line-soft)] pt-20"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_SLOW }}
            className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]"
          >
            <span aria-hidden className="h-px w-10 bg-[var(--d-line)]" />
            {content.eyebrow}
          </motion.p>

          <h1 className="mt-8 [font-family:var(--demo-display)] text-6xl font-light leading-[0.98] text-[var(--d-ink)] sm:text-7xl lg:text-8xl">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.01em" }}
              transition={{ duration: 2.6, delay: 0.3, ease: EASE_SLOW }}
              className="block"
            >
              {content.title}
            </motion.span>
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, letterSpacing: "0.28em" }}
              animate={{ opacity: 1, letterSpacing: "0.01em" }}
              transition={{ duration: 2.6, delay: 0.65, ease: EASE_SLOW }}
              className="block italic text-[var(--d-gold-bright)]"
            >
              {content.titleItalic}
            </motion.span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: EASE_SLOW }}
            className="mt-10 max-w-md text-sm font-light leading-relaxed text-[var(--d-ink-soft)] sm:text-base"
          >
            {content.lede}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.35, ease: EASE_SLOW }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <a
              href="#collections"
              className="border border-[var(--d-gold)] bg-[var(--d-gold)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#101014] transition-colors duration-500 hover:bg-transparent hover:text-[var(--d-gold)]"
            >
              {content.primaryCta}
            </a>
            <a
              href="#atelier"
              className="border border-[var(--d-line)] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--d-ink)] transition-colors duration-500 hover:border-[var(--d-gold)] hover:text-[var(--d-gold)]"
            >
              {content.secondaryCta}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, delay: 0.4, ease: EASE_SLOW }}
          className="order-1 lg:order-2"
        >
          <div
            ref={frameRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[var(--d-line-soft)] bg-[#050506]"
          >
            <Image
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=80"
              alt={content.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-center opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,6,0.72)_100%)]"
            />
            <motion.div
              aria-hidden
              style={{ backgroundImage: spotlight }}
              className="absolute inset-0 mix-blend-screen"
            />
            <motion.div
              aria-hidden
              style={{ backgroundImage: sheen }}
              className="absolute inset-0 mix-blend-soft-light"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[linear-gradient(180deg,transparent,rgba(5,5,6,0.85))] p-6">
              <div>
                <p className="[font-family:var(--demo-display)] text-2xl font-light italic text-[var(--d-ink)]">
                  {content.pieceName}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--d-gold)]">
                  {content.pieceSpec}
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute right-5 top-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-soft)]">
              <motion.span
                aria-hidden
                animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="block h-1.5 w-1.5 rounded-full bg-[var(--d-gold-bright)]"
              />
              {content.spotlightHint}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-8">
        <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
          {content.scrollCue}
        </span>
        <motion.span
          aria-hidden
          animate={reduceMotion ? undefined : { scaleX: [0.2, 1, 0.2] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-px w-24 origin-left bg-[var(--d-gold)]"
        />
      </div>
    </section>
  );
}
