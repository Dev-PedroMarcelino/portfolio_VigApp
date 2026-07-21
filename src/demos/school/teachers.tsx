"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Teacher, TeachersContent } from "./content";
import { Eyebrow } from "./ui";

const ACCENT: Record<Teacher["accent"], { chip: string; ink: string; ring: string; initialsBg: string }> = {
  accent: {
    chip: "bg-[var(--d-accent-soft)]",
    ink: "text-[var(--d-accent-deep)]",
    ring: "ring-[var(--d-accent)]",
    initialsBg: "bg-[var(--d-accent)]",
  },
  sun: {
    chip: "bg-[var(--d-sun-soft)]",
    ink: "text-[var(--d-sun-deep)]",
    ring: "ring-[var(--d-sun)]",
    initialsBg: "bg-[var(--d-sun)]",
  },
  coral: {
    chip: "bg-[var(--d-coral-soft)]",
    ink: "text-[var(--d-coral-deep)]",
    ring: "ring-[var(--d-coral)]",
    initialsBg: "bg-[var(--d-coral)]",
  },
  mint: {
    chip: "bg-[var(--d-mint-soft)]",
    ink: "text-[var(--d-mint-deep)]",
    ring: "ring-[var(--d-mint)]",
    initialsBg: "bg-[var(--d-mint)]",
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export function Teachers({ content }: { content: TeachersContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="teachers" className="relative bg-[var(--d-surface)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="coral" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-extrabold leading-tight tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.teachers.map((t, i) => {
            const a = ACCENT[t.accent];
            return (
              <motion.article
                key={t.name}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group flex flex-col rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-bg)] p-6 text-center shadow-[0_18px_40px_-30px_rgba(22,35,61,0.5)]"
              >
                <span
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${a.initialsBg} text-2xl font-extrabold text-white ring-4 ring-offset-2 ring-offset-[var(--d-bg)] ${a.ring} [font-family:var(--demo-display)] transition-transform group-hover:-rotate-6`}
                >
                  {initials(t.name)}
                </span>
                <h3 className="mt-4 [font-family:var(--demo-display)] text-lg font-extrabold text-[var(--d-ink)]">
                  {t.name}
                </h3>
                <p className="mt-0.5 text-sm font-bold text-[var(--d-ink-soft)]">{t.role}</p>
                <span
                  className={`mx-auto mt-3 rounded-full ${a.chip} px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide ${a.ink}`}
                >
                  {t.subject}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-[var(--d-ink-soft)]">{t.bio}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
