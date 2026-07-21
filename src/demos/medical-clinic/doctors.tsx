"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarClock, Languages, Star } from "lucide-react";
import type { DoctorsContent, SpecialtyId, SpecialtyItem } from "./content";
import { DoctorAvatar, SectionHeading, SPECIALTY_ICONS } from "./ui";

type Filter = "all" | SpecialtyId;

export function DoctorsSection({
  content,
  specialties,
  onBook,
}: {
  content: DoctorsContent;
  specialties: SpecialtyItem[];
  onBook: (specialty: SpecialtyId | null, doctorId: string | null) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion() ?? false;

  const visible = useMemo(
    () => (filter === "all" ? content.doctors : content.doctors.filter((d) => d.specialty === filter)),
    [filter, content.doctors],
  );

  const specialtyName = (id: SpecialtyId) => specialties.find((s) => s.id === id)?.name ?? id;

  return (
    <section id="doctors" className="scroll-mt-20 bg-[var(--d-mint)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label={content.label}
            title={content.title}
            accent={content.accent}
            intro={content.intro}
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={content.label}>
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-[0.76rem] font-semibold transition-colors ${
              filter === "all"
                ? "bg-[var(--d-accent)] text-[var(--d-foam)]"
                : "border border-[var(--d-ink)]/12 bg-[var(--d-card)] text-[var(--d-ink-soft)] hover:border-[var(--d-accent)]/40"
            }`}
          >
            {content.allLabel}
            <span className="ml-1.5 opacity-70">{content.doctors.length}</span>
          </button>
          {specialties.map((item) => {
            const count = content.doctors.filter((d) => d.specialty === item.id).length;
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(active ? "all" : item.id)}
                className={`rounded-full px-4 py-2 text-[0.76rem] font-semibold transition-colors ${
                  active
                    ? "bg-[var(--d-accent)] text-[var(--d-foam)]"
                    : "border border-[var(--d-ink)]/12 bg-[var(--d-card)] text-[var(--d-ink-soft)] hover:border-[var(--d-accent)]/40"
                }`}
              >
                {item.name}
                <span className="ml-1.5 opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((doctor) => {
              const index = content.doctors.findIndex((d) => d.id === doctor.id);
              const Icon = SPECIALTY_ICONS[doctor.specialty];
              return (
                <motion.li
                  key={doctor.id}
                  layout
                  initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col rounded-[1.75rem] bg-[var(--d-card)] p-6 shadow-[0_20px_44px_-34px_rgba(12,74,67,0.5)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <DoctorAvatar name={doctor.name} index={index} />
                    <span className="flex items-center gap-1 rounded-full bg-[var(--d-mist)] px-2.5 py-1 text-[0.7rem] font-bold text-[var(--d-ink)]">
                      <Star
                        className="h-3 w-3 fill-[var(--d-peach)] text-[var(--d-peach)]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      {doctor.rating}
                      <span className="font-medium text-[var(--d-ink-soft)]">
                        · {doctor.reviews} {content.reviewsLabel}
                      </span>
                    </span>
                  </div>

                  <h3 className="mt-4 text-[1.02rem] font-bold tracking-tight text-[var(--d-ink)]">
                    {doctor.name}
                  </h3>
                  <p className="mt-0.5 text-[0.76rem] font-semibold text-[var(--d-accent-deep)]">
                    {doctor.role}
                  </p>
                  <p className="mt-2.5 text-[0.8rem] leading-[1.7] text-[var(--d-ink-soft)]">
                    {doctor.focus}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-[var(--d-line)] pt-4 text-[0.72rem] text-[var(--d-ink-soft)]">
                    <p className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                      {specialtyName(doctor.specialty)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Languages className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                      {doctor.languages}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarClock className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                      {content.nextLabel}: {doctor.next}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBook(doctor.specialty, doctor.id)}
                    className="mt-5 rounded-full border border-[var(--d-accent)]/35 py-2.5 text-[0.78rem] font-bold text-[var(--d-accent-deep)] transition-colors hover:bg-[var(--d-accent)] hover:text-[var(--d-foam)]"
                  >
                    {content.bookLabel}
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
