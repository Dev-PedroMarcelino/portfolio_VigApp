"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Minus, Plus, Quote } from "lucide-react";
import type { ProjectCopy, PrumoContent } from "./content";
import { PROJECTS } from "./content";
import { Hairline, Kicker, Reveal, SectionTitle } from "./ui";

/**
 * Editorial, asymmetric project index: five houses in alternating rows —
 * large color photograph on one side, serif title + mono metadata on the
 * other. Each row expands in place with two extra photos, the design
 * concept and the owner's word.
 */
export function Projects({ content }: { content: PrumoContent["projects"] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="projetos" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <Kicker>{content.label}</Kicker>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle lead={content.titleLead} italic={content.titleItalic} />
            <p className="max-w-md [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-ink-soft)] lg:pb-2">
              {content.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          {content.items.map((copy, i) => {
            const seed = PROJECTS[i];
            return (
              <ProjectRow
                key={copy.id}
                copy={copy}
                seed={seed}
                flip={i % 2 === 1}
                content={content}
                open={openId === copy.id}
                onToggle={() => setOpenId((v) => (v === copy.id ? null : copy.id))}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  copy,
  seed,
  flip,
  content,
  open,
  onToggle,
}: {
  copy: ProjectCopy;
  seed: (typeof PROJECTS)[number];
  flip: boolean;
  content: PrumoContent["projects"];
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const detailId = `project-detail-${copy.id}`;
  const status = content.statusLabels[seed.status];

  return (
    <Reveal>
      <article className="border-t border-[var(--d-line)] py-10 last:border-b sm:py-14">
        <div className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12`}>
          {/* Photograph */}
          <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={detailId}
              aria-label={`${open ? content.closeLabel : content.openLabel}: ${copy.name}`}
              className="group relative block w-full overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image
                  src={seed.photo}
                  alt={copy.mainAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <span
                aria-hidden
                className="absolute bottom-4 left-4 bg-[var(--d-bg)]/90 px-3 py-1.5 [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--d-ink)] backdrop-blur-sm"
              >
                {status} · {seed.year}
              </span>
            </button>
          </div>

          {/* Copy */}
          <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
            <p
              aria-hidden
              className="[font-family:var(--demo-display)] text-5xl italic leading-none text-[var(--d-ink-faint)]/50 sm:text-6xl"
            >
              {seed.num}
            </p>
            <h3 className="mt-4 [font-family:var(--demo-display)] text-3xl leading-tight text-[var(--d-ink)] sm:text-4xl">
              {copy.name}
            </h3>
            <p className="mt-2 [font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.26em] text-[var(--d-accent)]">
              {copy.city}
            </p>
            <p className="mt-5 max-w-md [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-ink-soft)]">
              {copy.blurb}
            </p>

            <dl className="mt-7 flex divide-x divide-[var(--d-line)] border-y border-[var(--d-line)] py-4">
              <div className="pr-6 sm:pr-8">
                <dt className="[font-family:var(--demo-body)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                  {content.areaUnit}
                </dt>
                <dd className="mt-1 [font-family:var(--demo-mono)] text-lg text-[var(--d-ink)]">{seed.area}</dd>
              </div>
              <div className="px-6 sm:px-8">
                <dt className="[font-family:var(--demo-body)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                  {seed.year}
                </dt>
                <dd className="mt-1 [font-family:var(--demo-mono)] text-lg text-[var(--d-ink)]">{seed.num}/05</dd>
              </div>
              <div className="px-6 sm:px-8">
                <dt className="[font-family:var(--demo-body)] text-[10px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
                  Status
                </dt>
                <dd className="mt-1 [font-family:var(--demo-mono)] text-lg text-[var(--d-ink)]">{status}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={detailId}
              className="group mt-7 inline-flex items-center gap-3 [font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.24em] text-[var(--d-ink)] transition-colors duration-300 hover:text-[var(--d-accent)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--d-line-strong)] transition-colors duration-300 group-hover:border-[var(--d-accent)]">
                {open ? (
                  <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                ) : (
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                )}
              </span>
              {open ? content.closeLabel : content.openLabel}
            </button>
          </div>
        </div>

        {/* Expanding detail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailId}
              key="detail"
              initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 pt-12 lg:grid-cols-12 lg:gap-12">
                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                  {seed.extras.map((src, j) => (
                    <div key={src} className={`relative overflow-hidden ${j === 1 ? "sm:mt-10" : ""}`}>
                      <div className="relative aspect-[4/5] w-full">
                        <Image
                          src={src}
                          alt={copy.extraAlts[j]}
                          fill
                          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-between gap-10 lg:col-span-5">
                  <div>
                    <p className="[font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-faint)]">
                      {content.conceptLabel}
                    </p>
                    <p className="mt-4 [font-family:var(--demo-body)] text-[15px] leading-[1.8] text-[var(--d-ink-soft)]">
                      {copy.concept}
                    </p>
                  </div>

                  <figure className="border-l-2 border-[var(--d-accent)] pl-6">
                    <Quote aria-hidden className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={1.5} />
                    <blockquote className="mt-3 [font-family:var(--demo-display)] text-xl italic leading-snug text-[var(--d-ink)] sm:text-2xl">
                      “{copy.quote}”
                    </blockquote>
                    <figcaption className="mt-4 [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.26em] text-[var(--d-ink-faint)]">
                      {content.ownerLabel} — {copy.owner}
                    </figcaption>
                  </figure>
                </div>
              </div>
              <Hairline className="mt-12" />
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}
