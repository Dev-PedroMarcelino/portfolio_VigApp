"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { unsplash, type NoirContent } from "./content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const INTERVAL = 5200;

export function LookbookHero({
  content,
  onRequest,
}: {
  content: NoirContent["hero"];
  onRequest: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const looks = content.looks;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % looks.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [playing, reduceMotion, looks.length]);

  const active = looks[index];

  return (
    <section
      id="lookbook"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--d-bg)]"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active.id}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.3, ease: "easeInOut" },
              scale: { duration: 7.5, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={unsplash(active.image, 2000)}
              alt={active.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.78)_0%,rgba(10,10,10,0.35)_38%,rgba(10,10,10,0.55)_70%,var(--d-bg)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,rgba(10,10,10,0.7)_100%)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-32 pt-36 sm:pt-40">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]"
        >
          <span aria-hidden className="h-px w-10 bg-[var(--d-line)]" />
          {content.eyebrow}
        </motion.p>

        <h1 className="mt-8 max-w-3xl [font-family:var(--demo-display)] text-[3.4rem] font-light leading-[0.94] tracking-[-0.01em] text-[var(--d-ink)] sm:text-8xl lg:text-[8.5rem]">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="block"
          >
            {content.title}
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
            className="block pl-[0.06em] italic text-[var(--d-gold-bright)]"
          >
            {content.titleItalic}
          </motion.span>
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: EASE }}
          className="mt-9 max-w-xl text-sm leading-relaxed text-[var(--d-ink-soft)] sm:text-[15px]"
        >
          {content.lede}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 bg-[var(--d-gold)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A] transition-colors duration-300 hover:bg-[var(--d-gold-bright)]"
          >
            {content.primaryCta}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.6}
            />
          </a>
          <button
            type="button"
            onClick={onRequest}
            className="border border-[var(--d-line)] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--d-ink)] transition-colors duration-300 hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
          >
            {content.secondaryCta}
          </button>
        </motion.div>
      </div>

      {/* Lookbook controls + caption */}
      <div className="relative z-10 border-t border-[var(--d-line-soft)] bg-[rgba(10,10,10,0.35)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-[2.5rem] max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--d-gold)]">
                  {active.season}
                </p>
                <p className="mt-1.5 [font-family:var(--demo-display)] text-lg italic text-[var(--d-ink)]">
                  {active.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-[var(--d-ink-faint)]">
                  {active.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? content.pauseAria : content.playAria}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-gold)] hover:text-[var(--d-gold-bright)]"
            >
              {playing ? (
                <Pause aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
              ) : (
                <Play aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
              )}
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label={content.lookLabel}>
              {looks.map((look, i) => (
                <button
                  key={look.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={content.indexAria(i + 1)}
                  onClick={() => setIndex(i)}
                  className="group relative h-8 w-8"
                >
                  <span
                    className={`absolute left-0 top-1/2 h-px -translate-y-1/2 transition-all duration-500 ${
                      i === index
                        ? "w-8 bg-[var(--d-gold-bright)]"
                        : "w-4 bg-[var(--d-line-soft)] group-hover:w-6 group-hover:bg-[var(--d-ink-faint)]"
                    }`}
                  />
                </button>
              ))}
            </div>

            <span className="[font-family:var(--demo-display)] text-sm italic tabular-nums text-[var(--d-ink-soft)]">
              {String(index + 1).padStart(2, "0")}
              <span className="text-[var(--d-ink-faint)]"> / {String(looks.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
