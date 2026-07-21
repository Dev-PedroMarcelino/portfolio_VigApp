"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { AtelierContent } from "./content";
import { unsplash } from "./content";

const PHILOSOPHY_IMAGE = "photo-1541354329998-f4d9a9f9297f";

export function Philosophy({
  content,
}: {
  content: AtelierContent["philosophy"];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id="philosophy"
      className="relative border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.title}
            </h2>

            <blockquote className="mt-10 border-l border-[var(--d-line-strong)] pl-6">
              <p className="text-[clamp(1.3rem,2.2vw,1.9rem)] italic leading-snug text-[var(--d-ink)] [font-family:var(--demo-body)]">
                {content.quote}
              </p>
              <footer className="mt-4 [font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-soft)]">
                {content.attribution}
                <span className="text-[var(--d-ink-faint)]"> — {content.role}</span>
              </footer>
            </blockquote>

            <div className="mt-8 space-y-5">
              {content.paragraphs.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="max-w-xl text-[1.05rem] leading-relaxed text-[var(--d-ink-soft)] [font-family:var(--demo-body)]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden lg:aspect-auto lg:min-h-[32rem]">
            <Image
              src={unsplash(PHILOSOPHY_IMAGE, 1200)}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              style={{ filter: "grayscale(1) contrast(1.05)" }}
            />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(233,229,220,0) 55%, rgba(233,229,220,0.35) 100%)",
              }}
            />
          </div>
        </div>

        <ol className="mt-20 grid grid-cols-1 gap-px border border-[var(--d-line)] bg-[var(--d-line)] sm:grid-cols-2 lg:grid-cols-4">
          {content.principles.map((p, i) => (
            <motion.li
              key={p.index}
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-4 bg-[var(--d-bg)] p-7"
            >
              <span className="[font-family:var(--demo-display)] text-[clamp(2.5rem,4vw,4rem)] font-medium leading-none tabular-nums text-[var(--d-ink-faint)]">
                {p.index}
              </span>
              <h3 className="[font-family:var(--demo-display)] text-lg font-medium leading-tight text-[var(--d-ink)]">
                {p.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
