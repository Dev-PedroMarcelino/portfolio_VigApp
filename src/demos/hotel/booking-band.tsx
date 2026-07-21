"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import type { HotelContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function BookingBand({ content }: { content: HotelContent["booking"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="book" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,#152A25_0%,rgba(21,42,37,0.82)_45%,rgba(21,42,37,0.88)_100%)]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-28 text-center sm:px-6 sm:py-36">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_SLOW }}
          className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--d-brass)]"
        >
          {content.eyebrow}
        </motion.span>
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: EASE_SLOW }}
          className="mt-5 [font-family:var(--demo-display)] text-4xl font-medium leading-[1.05] text-[var(--d-linen)] sm:text-6xl"
        >
          {content.title}
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_SLOW }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--d-ink-soft)]"
        >
          {content.body}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_SLOW }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#top"
            className="w-full bg-[var(--d-brass)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#152A25] transition-colors duration-300 hover:bg-[var(--d-brass-bright)] sm:w-auto"
          >
            {content.primaryCta}
          </a>
          <a
            href={`tel:${content.phone.replace(/[^+\d]/g, "")}`}
            className="flex w-full items-center justify-center gap-2 border border-[var(--d-line)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--d-linen)] transition-colors duration-300 hover:border-[var(--d-brass)] hover:text-[var(--d-brass)] sm:w-auto"
          >
            <Phone aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
            {content.secondaryCta}
          </a>
        </motion.div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
          {content.phoneLabel} · {content.phone}
        </p>
      </div>
    </section>
  );
}
