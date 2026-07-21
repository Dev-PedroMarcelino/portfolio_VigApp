"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AtelierContent, Project } from "./content";
import { unsplash } from "./content";

export function ProjectIndex({
  content,
  projects,
  selectedId,
  onSelect,
}: {
  content: AtelierContent["index"];
  projects: Project[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="index"
      className="relative border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.02em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.title}
            </h2>
          </div>
          <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.28em] text-[var(--d-ink-soft)]">
            {content.hint}
          </p>
        </div>

        <ul className="border-t border-[var(--d-line-strong)]">
          {projects.map((project) => {
            const isActive = active === project.id;
            const isSelected = selectedId === project.id;
            return (
              <li
                key={project.id}
                className="border-b border-[var(--d-line)]"
                onMouseEnter={() => setActive(project.id)}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  type="button"
                  onClick={() => onSelect(project.id)}
                  onFocus={() => setActive(project.id)}
                  onBlur={() => setActive(null)}
                  aria-label={`${content.openLabel}: ${project.name}`}
                  aria-pressed={isSelected}
                  className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left transition-colors duration-500 sm:gap-8 sm:py-8"
                >
                  <span
                    className={`[font-family:var(--demo-display)] text-[clamp(1.4rem,3vw,2.5rem)] font-medium tabular-nums tracking-tight transition-colors duration-500 ${
                      isActive || isSelected
                        ? "text-[var(--d-ink)]"
                        : "text-[var(--d-ink-faint)]"
                    }`}
                  >
                    {project.index}
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span
                        className={`[font-family:var(--demo-display)] text-[clamp(1.5rem,4.5vw,3.25rem)] font-medium leading-none tracking-[-0.02em] transition-all duration-500 ${
                          isActive
                            ? "text-[var(--d-ink)] sm:translate-x-3"
                            : "text-[var(--d-ink)]"
                        }`}
                      >
                        {project.name}
                      </span>
                      <span className="italic [font-family:var(--demo-body)] text-[clamp(0.95rem,1.4vw,1.25rem)] text-[var(--d-ink-soft)]">
                        {project.typology}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-3 block max-w-lg overflow-hidden text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)] [font-family:var(--demo-body)] sm:pl-3"
                        >
                          {project.summary}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>

                  <span className="flex items-center gap-4 sm:gap-8">
                    <span className="hidden text-right [font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-soft)] md:block">
                      <span className="block text-[var(--d-ink-faint)]">
                        {content.yearLabel}
                      </span>
                      <span className="mt-1 block text-[var(--d-ink)]">
                        {project.year}
                      </span>
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive || isSelected
                          ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-bg)]"
                          : "border-[var(--d-line-strong)] text-[var(--d-ink)]"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
                    </span>
                  </span>

                  {/* full-bleed image reveal on hover */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        key="reveal"
                        aria-hidden
                        initial={
                          reduce
                            ? { opacity: 0 }
                            : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
                        }
                        animate={
                          reduce
                            ? { opacity: 1 }
                            : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
                        }
                        exit={
                          reduce
                            ? { opacity: 0 }
                            : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
                        }
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute right-4 top-1/2 z-10 hidden h-[70%] w-[26vw] max-w-[420px] -translate-y-1/2 overflow-hidden lg:block"
                      >
                        <Image
                          src={unsplash(project.image, 900)}
                          alt=""
                          fill
                          sizes="26vw"
                          className="object-cover"
                          style={{ filter: "grayscale(1) contrast(1.05)" }}
                        />
                        <span
                          className="absolute inset-0"
                          style={{
                            backgroundColor: "var(--d-ink)",
                            mixBlendMode: "color",
                            opacity: 0.12,
                          }}
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
