"use client";

import { motion } from "framer-motion";
import { Link2, LayoutGrid, MessageSquareText, ChefHat, Users } from "lucide-react";
import type { HowContent } from "./content";
import { Eyebrow } from "./ui";

const ICONS = [Link2, LayoutGrid, MessageSquareText, ChefHat];

export function HowSection({ content }: { content: HowContent }) {
  return (
    <section id="how" className="scroll-mt-20 border-t border-[var(--d-line)] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} />
          <h2 className="mt-3 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-[var(--d-ink-soft)]">{content.subtitle}</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => {
            const Icon = ICONS[i] ?? Link2;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative flex flex-col rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)] p-6"
              >
                <span className="[font-family:var(--demo-display)] text-sm font-bold text-[var(--d-ink-soft)]">
                  {`0${i + 1}`}
                </span>
                <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--d-accent)]/12 text-[var(--d-accent)]">
                  <Icon className="h-6 w-6" strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="mt-5 [font-family:var(--demo-display)] text-lg font-bold text-[var(--d-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-[var(--d-ink-soft)]">
                  {step.detail}
                </p>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[var(--d-line)] bg-[var(--d-panel)] px-5 py-4">
          <Users className="h-5 w-5 shrink-0 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
          <p className="text-sm text-[var(--d-ink-soft)]">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
