"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock, GraduationCap, Search, X } from "lucide-react";
import type { FacultyId, Program, ProgramsContent } from "./content";
import { Eyebrow } from "./ui";

export function Programs({ content }: { content: ProgramsContent }) {
  const reduce = useReducedMotion() ?? false;
  const [query, setQuery] = useState("");
  const [faculty, setFaculty] = useState<FacultyId | "all">("all");

  const facultyLabel = useMemo(() => {
    const map: Record<string, string> = {};
    content.faculties.forEach((f) => {
      map[f.id] = f.label;
    });
    return map;
  }, [content.faculties]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return content.programs.filter((p) => {
      const matchesFaculty = faculty === "all" || p.faculty === faculty;
      if (!matchesFaculty) return false;
      if (!q) return true;
      const haystack = `${p.name} ${p.degree} ${p.blurb} ${facultyLabel[p.faculty] ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [content.programs, query, faculty, facultyLabel]);

  const hasFilters = query.trim() !== "" || faculty !== "all";
  const resultWord =
    filtered.length === 1 ? content.resultsSingular : content.resultsPlural;

  const clear = () => {
    setQuery("");
    setFaculty("all");
  };

  return (
    <section id="programs" className="scroll-mt-20 bg-[var(--d-bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow text={content.eyebrow} tone="crimson" />
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-normal leading-tight text-[var(--d-ink)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        {/* controls */}
        <div className="mt-10 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-4 shadow-[0_24px_60px_-48px_rgba(43,26,22,0.6)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="sr-only">{content.searchLabel}</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--d-ink-soft)]"
                strokeWidth={2}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full rounded-xl border border-[var(--d-line)] bg-[var(--d-bg)] py-3 pl-11 pr-4 text-sm text-[var(--d-ink)] outline-none transition-colors placeholder:text-[var(--d-ink-soft)]/70 focus:border-[var(--d-crimson)] focus:ring-2 focus:ring-[var(--d-crimson)]/20"
              />
            </label>

            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label={content.facultyLabel}
            >
              <FacultyChip
                label={content.allLabel}
                active={faculty === "all"}
                onClick={() => setFaculty("all")}
              />
              {content.faculties.map((f) => (
                <FacultyChip
                  key={f.id}
                  label={f.label}
                  active={faculty === f.id}
                  onClick={() => setFaculty(f.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[var(--d-line)] pt-3">
            <p className="text-sm text-[var(--d-ink-soft)]">
              <span className="font-semibold text-[var(--d-crimson)]">{filtered.length}</span>{" "}
              {resultWord}
            </p>
            <AnimatePresence>
              {hasFilters && (
                <motion.button
                  type="button"
                  onClick={clear}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-crimson)]"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.2} />
                  {content.clearLabel}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* results */}
        {filtered.length > 0 ? (
          <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  facultyName={facultyLabel[program.faculty] ?? ""}
                  content={content}
                  reduce={reduce}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-[var(--d-line)] bg-[var(--d-surface)] px-6 py-16 text-center">
            <p className="[font-family:var(--demo-display)] text-xl text-[var(--d-ink)]">
              {content.emptyTitle}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--d-ink-soft)]">
              {content.emptyBody}
            </p>
            <button
              type="button"
              onClick={clear}
              className="mt-5 rounded-full bg-[var(--d-crimson)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--d-parchment)]"
            >
              {content.clearLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FacultyChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
        active
          ? "border-[var(--d-crimson)] bg-[var(--d-crimson)] text-[var(--d-parchment)]"
          : "border-[var(--d-line)] bg-[var(--d-bg)] text-[var(--d-ink-soft)] hover:border-[var(--d-crimson)] hover:text-[var(--d-crimson)]"
      }`}
    >
      {label}
    </button>
  );
}

function ProgramCard({
  program,
  facultyName,
  content,
  reduce,
}: {
  program: Program;
  facultyName: string;
  content: ProgramsContent;
  reduce: boolean;
}) {
  return (
    <motion.li
      layout
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6 transition-colors hover:border-[var(--d-crimson)]/40"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[var(--d-crimson-soft)] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[var(--d-crimson)]">
          {facultyName}
        </span>
        <span className="[font-family:var(--demo-display)] text-sm font-bold text-[var(--d-navy)]">
          {program.tuition}
        </span>
      </div>

      <h3 className="mt-4 [font-family:var(--demo-display)] text-xl font-normal leading-snug text-[var(--d-ink)]">
        {program.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--d-ink-soft)]">
        {program.blurb}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--d-line)] pt-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-[var(--d-crimson)]" strokeWidth={2} />
          <div>
            <dt className="text-[0.6rem] uppercase tracking-[0.1em] text-[var(--d-ink-soft)]">
              {content.degreeLabel}
            </dt>
            <dd className="text-xs font-semibold text-[var(--d-ink)]">{program.degree}</dd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[var(--d-crimson)]" strokeWidth={2} />
          <div>
            <dt className="text-[0.6rem] uppercase tracking-[0.1em] text-[var(--d-ink-soft)]">
              {content.durationLabel}
            </dt>
            <dd className="text-xs font-semibold text-[var(--d-ink)]">{program.duration}</dd>
          </div>
        </div>
      </dl>

      <div className="mt-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--d-crimson)] transition-colors group-hover:text-[var(--d-crimson-deep)]">
          {content.detailsCta}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.2}
          />
        </span>
      </div>
    </motion.li>
  );
}
