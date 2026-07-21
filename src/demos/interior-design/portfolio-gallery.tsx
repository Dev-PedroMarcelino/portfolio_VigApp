"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { AmbraContent, FilterId, ProjectContent } from "./content";
import { Reveal, SectionHeading, unsplash } from "./ui";

export function PortfolioGallery({ content }: { content: AmbraContent["portfolio"] }) {
  const [active, setActive] = useState<FilterId>("all");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      active === "all"
        ? content.projects
        : content.projects.filter((p) => p.room === active),
    [active, content.projects],
  );

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label={content.label}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {content.filters.map((f) => {
              const isActive = f.id === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.id)}
                  className={`rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all ${
                    isActive
                      ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-cream)]"
                      : "border-[var(--d-line)] text-[var(--d-soft)] hover:border-[var(--d-ink)] hover:text-[var(--d-ink)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-[var(--d-soft)]">
          {visible.length} {content.countLabel}
        </p>

        {visible.length === 0 ? (
          <p className="mt-10 text-[15px] text-[var(--d-soft)]">{content.empty}</p>
        ) : (
          <motion.ul layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  content={content}
                  index={i}
                  reduce={!!reduce}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  content,
  index,
  reduce,
}: {
  project: ProjectContent;
  content: AmbraContent["portfolio"];
  index: number;
  reduce: boolean;
}) {
  // First card in each layout is wide to break the grid rhythm.
  const wide = index === 0;
  return (
    <motion.li
      layout
      initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${wide ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-cream)]">
        <div className={`relative overflow-hidden ${wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
          <Image
            src={unsplash(project.imageId, wide ? 1400 : 900)}
            alt={project.alt}
            fill
            sizes={wide ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(43,38,33,0) 55%, rgba(43,38,33,0.42) 100%)",
            }}
          />
          <span className="absolute left-4 top-4 rounded-full bg-[var(--d-bg)]/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--d-accent)] backdrop-blur">
            {project.palette}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-[1.35rem] leading-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
            {project.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[var(--d-soft)]">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
            {project.location}
          </p>
          <dl className="mt-auto flex gap-6 border-t border-[var(--d-line)] pt-4 text-[12px]">
            <div>
              <dt className="uppercase tracking-[0.16em] text-[var(--d-soft)]">
                {content.metaArea}
              </dt>
              <dd className="mt-1 text-[var(--d-ink)]">{project.area}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-[var(--d-soft)]">
                {content.metaYear}
              </dt>
              <dd className="mt-1 text-[var(--d-ink)]">{project.year}</dd>
            </div>
          </dl>
        </div>
      </article>
    </motion.li>
  );
}
