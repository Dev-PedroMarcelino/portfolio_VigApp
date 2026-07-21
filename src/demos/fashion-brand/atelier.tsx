"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PenLine } from "lucide-react";
import { unsplash, type NoirContent } from "./content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Atelier({ content }: { content: NoirContent["atelier"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="atelier"
      className="relative overflow-hidden border-t border-[var(--d-line-soft)] bg-[var(--d-bg)] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 max-w-lg [font-family:var(--demo-display)] text-4xl leading-[1.02] text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>

          <ol className="mt-12 space-y-px">
            {content.steps.map((step, i) => (
              <motion.li
                key={step.numeral}
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="group flex gap-6 border-t border-[var(--d-line-soft)] py-6 last:border-b"
              >
                <span className="[font-family:var(--demo-display)] text-2xl italic text-[var(--d-gold)] transition-colors duration-300 group-hover:text-[var(--d-gold-bright)]">
                  {step.numeral}
                </span>
                <div>
                  <h3 className="[font-family:var(--demo-display)] text-xl text-[var(--d-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <p className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[var(--d-gold-bright)]">
            <PenLine aria-hidden className="h-4 w-4" strokeWidth={1.4} />
            {content.signature}
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative min-h-[26rem] overflow-hidden lg:min-h-full"
        >
          <Image
            src={unsplash(content.image, 1200)}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.45)_0%,transparent_35%,rgba(10,10,10,0.5)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-6 h-px bg-[var(--d-line)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
