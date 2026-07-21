"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Gem, Diamond, Sparkles, HeartHandshake } from "lucide-react";
import type { AureliaContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ICONS = [Gem, Diamond, Sparkles, HeartHandshake];

export function Bespoke({ content }: { content: AureliaContent["bespoke"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="bespoke"
      className="relative overflow-hidden border-y border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] py-28 sm:py-36"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--d-bg-soft),rgba(16,16,20,0.7),var(--d-bg-soft))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-6 [font-family:var(--demo-display)] text-4xl font-light text-[var(--d-ink)] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-[var(--d-line-soft)] bg-[var(--d-line-soft)] sm:grid-cols-2">
          {content.services.map((service, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.article
                key={service.id}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: EASE_SLOW }}
                className="group flex flex-col bg-[var(--d-bg-soft)] p-8 transition-colors duration-500 hover:bg-[var(--d-bg-raised)] sm:p-10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-gold)] transition-colors duration-500 group-hover:border-[var(--d-gold)]">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 [font-family:var(--demo-display)] text-3xl font-light text-[var(--d-ink)]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
                  {service.body}
                </p>
                <div className="mt-6 border-t border-[var(--d-line-soft)] pt-5">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                    {content.detailLabel}
                  </p>
                  <p className="mt-2 text-xs font-light leading-relaxed text-[var(--d-gold)]">
                    {service.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
