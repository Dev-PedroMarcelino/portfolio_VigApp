"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Course, LumiereContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CourseRow({
  course,
  open,
  canHover,
  labels,
  onToggle,
  onHoverChange,
  reduceMotion,
}: {
  course: Course;
  open: boolean;
  canHover: boolean;
  labels: { ingredients: string; note: string };
  onToggle: () => void;
  onHoverChange: (hovering: boolean) => void;
  reduceMotion: boolean;
}) {
  const panelId = `course-panel-${course.id}`;

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: EASE_SLOW }}
      onMouseEnter={canHover ? () => onHoverChange(true) : undefined}
      onMouseLeave={canHover ? () => onHoverChange(false) : undefined}
      className="border-b border-[var(--d-line-soft)]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-baseline gap-5 py-7 text-left sm:gap-8"
      >
        <span
          aria-hidden
          className="[font-family:var(--demo-display)] w-9 shrink-0 text-2xl italic text-[var(--d-gold)] sm:text-3xl"
        >
          {course.numeral}
        </span>
        <span className="flex-1">
          <span className="[font-family:var(--demo-display)] block text-2xl font-medium text-[var(--d-ink)] transition-colors duration-300 group-hover:text-[var(--d-gold-bright)] sm:text-3xl">
            {course.name}
          </span>
          <span className="mt-1.5 block text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {course.description}
          </span>
        </span>
        <span
          aria-hidden
          className="mt-1 shrink-0 self-start text-[var(--d-ink-faint)] transition-colors duration-300 group-hover:text-[var(--d-gold)]"
        >
          <Plus
            className={`h-4 w-4 transition-transform duration-500 ${open ? "rotate-45" : ""}`}
            strokeWidth={1.5}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_SLOW }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 pl-14 pr-2 sm:grid-cols-[1fr_auto] sm:pl-[4.25rem]">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--d-gold)]">
                  {labels.ingredients}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {course.ingredients.map((ingredient, index) => (
                    <li
                      key={ingredient}
                      className="flex items-center gap-2 text-xs font-light tracking-wide text-[var(--d-ink-soft)]"
                    >
                      {index > 0 && (
                        <span aria-hidden className="text-[var(--d-gold)]">
                          ·
                        </span>
                      )}
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="max-w-xs border-l border-[var(--d-line)] pl-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--d-gold)]">
                  {labels.note}
                </p>
                <p className="[font-family:var(--demo-display)] mt-2 text-base italic leading-snug text-[var(--d-ink)]">
                  {course.note}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function TastingMenu({
  content,
  format,
}: {
  content: LumiereContent["tasting"];
  format: (value: number) => string;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const openId = pinnedId ?? hoverId;

  return (
    <section id="menu" className="relative bg-[var(--d-bg)] py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="[font-family:var(--demo-display)] mt-5 text-4xl font-medium leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>

          <div className="relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80"
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 420px, 0px"
              className="object-cover [filter:sepia(0.25)_contrast(1.04)_brightness(0.82)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,8,0.15)_0%,rgba(14,12,8,0.55)_100%)]"
            />
            <div aria-hidden className="absolute inset-4 border border-[var(--d-line)]" />
          </div>

          <div className="mt-10 border border-[var(--d-line)] px-7 py-6">
            <p className="[font-family:var(--demo-display)] text-lg italic text-[var(--d-ink)]">
              {content.menuLabel}
            </p>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                {content.priceLabel}
              </span>
              <span className="[font-family:var(--demo-display)] text-3xl text-[var(--d-gold-bright)]">
                {format(content.menuPrice)}
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-[var(--d-line-soft)] pt-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                {content.pairingLabel}
              </span>
              <span className="[font-family:var(--demo-display)] text-xl text-[var(--d-ink)]">
                + {format(content.pairingPrice)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
            {content.revealHint}
          </p>
          <ul className="border-t border-[var(--d-line-soft)]">
            {content.courses.map((course) => (
              <CourseRow
                key={course.id}
                course={course}
                open={openId === course.id}
                canHover={canHover}
                labels={{ ingredients: content.ingredientsLabel, note: content.noteLabel }}
                onToggle={() =>
                  setPinnedId((current) => (current === course.id ? null : course.id))
                }
                onHoverChange={(hovering) =>
                  setHoverId((current) =>
                    hovering ? course.id : current === course.id ? null : current,
                  )
                }
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>
          <p className="mt-8 max-w-md text-xs font-light leading-relaxed text-[var(--d-ink-faint)]">
            {content.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
