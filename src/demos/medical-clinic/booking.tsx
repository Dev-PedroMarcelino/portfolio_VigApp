"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  AtSign,
  CalendarCheck,
  Check,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import type {
  BookingContent,
  BookingRequest,
  ContactContent,
  Doctor,
  SpecialtyId,
  SpecialtyItem,
} from "./content";
import { DoctorAvatar, SectionHeading, SPECIALTY_ICONS } from "./ui";

const CONTACT_IMG =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80";

/**
 * Deterministic availability so SSR and CSR always agree (no Math.random).
 * Both terms are linear in slotIdx with coefficient 1, so each day blocks at
 * most four of the seven slots — a doctor is never fully booked out.
 */
const isSlotFree = (doctorIdx: number, dayIdx: number, slotIdx: number) =>
  (slotIdx + doctorIdx + dayIdx) % 3 !== 0 &&
  (slotIdx + doctorIdx + dayIdx * 2) % 7 !== 5;

export function BookingSection({
  content,
  contact,
  specialties,
  doctors,
  request,
}: {
  content: BookingContent;
  contact: ContactContent;
  specialties: SpecialtyItem[];
  doctors: Doctor[];
  request: BookingRequest;
}) {
  const [step, setStep] = useState(0);
  const [specialty, setSpecialty] = useState<SpecialtyId | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [dayId, setDayId] = useState<string | null>(null);
  const [slotIdx, setSlotIdx] = useState<number | null>(null);
  const reduce = useReducedMotion() ?? false;

  /* Presets raised by the hero card, specialty grid or doctor directory. */
  useEffect(() => {
    if (request.token === 0) return;
    setSpecialty(request.specialty);
    setDoctorId(request.doctorId);
    setDayId(null);
    setSlotIdx(null);
    setStep(request.doctorId ? 2 : request.specialty ? 1 : 0);
  }, [request]);

  const doctor = doctors.find((d) => d.id === doctorId) ?? null;
  const doctorIdx = Math.max(0, doctors.findIndex((d) => d.id === doctorId));
  const day = content.days.find((d) => d.id === dayId) ?? null;
  const dayIdx = Math.max(0, content.days.findIndex((d) => d.id === dayId));
  const specialtyName = specialty
    ? (specialties.find((s) => s.id === specialty)?.name ?? "")
    : "";
  const filteredDoctors = doctors.filter((d) => d.specialty === specialty);

  const reset = () => {
    setStep(0);
    setSpecialty(null);
    setDoctorId(null);
    setDayId(null);
    setSlotIdx(null);
  };

  const code = `AH-${1187 + doctorIdx * 137 + dayIdx * 29 + (slotIdx ?? 0) * 7}`;
  const summary =
    doctor && day && slotIdx !== null
      ? `${specialtyName} ${content.withLabel} ${doctor.name} · ${day.weekday}, ${day.date} ${content.atLabel} ${content.slots[slotIdx]}`
      : "";

  const fade = {
    initial: reduce ? undefined : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: "easeOut" as const },
  };

  return (
    <section id="booking" className="scroll-mt-20 bg-[var(--d-mint)] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={content.label}
          title={content.title}
          accent={content.accent}
          intro={content.intro}
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ------------------------------------------------ contact card */}
          <div id="contact" className="scroll-mt-24 space-y-6">
            <div className="rounded-[2rem] bg-[var(--d-card)] p-8 shadow-[0_24px_50px_-36px_rgba(12,74,67,0.5)]">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--d-ink)]">
                {contact.title}{" "}
                <em className="[font-family:var(--demo-display)] font-medium italic text-[var(--d-accent)]">
                  {contact.accent}
                </em>
              </h3>

              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                    <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                      {contact.addressLabel}
                    </dt>
                    {contact.addressLines.map((line) => (
                      <dd key={line} className="mt-0.5 font-medium text-[var(--d-ink)]">
                        {line}
                      </dd>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                    <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                      {contact.phoneLabel}
                    </dt>
                    <dd className="mt-0.5 font-medium text-[var(--d-ink)]">{contact.phone}</dd>
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                    <AtSign className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                      {contact.emailLabel}
                    </dt>
                    <dd className="mt-0.5 font-medium text-[var(--d-ink)]">{contact.email}</dd>
                  </div>
                </div>
                <div className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                    <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div className="flex-1">
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--d-ink-soft)]">
                      {contact.hoursLabel}
                    </dt>
                    {contact.hours.map((entry) => (
                      <dd
                        key={entry.days}
                        className="mt-0.5 flex justify-between gap-4 font-medium text-[var(--d-ink)]"
                      >
                        <span>{entry.days}</span>
                        <span className="text-[var(--d-ink-soft)]">{entry.time}</span>
                      </dd>
                    ))}
                  </div>
                </div>
              </dl>

              <p className="mt-6 rounded-xl bg-[var(--d-cream)] px-4 py-3 text-[0.72rem] leading-relaxed text-[#8A5A2B]">
                {contact.emergency}
              </p>
            </div>

            <div className="relative hidden aspect-[4/2.6] overflow-hidden rounded-[2rem] shadow-[0_24px_50px_-36px_rgba(12,74,67,0.5)] lg:block">
              <Image
                src={CONTACT_IMG}
                alt={contact.imageAlt}
                fill
                sizes="(min-width: 1024px) 440px, 92vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(29,138,126,0.08) 0%, rgba(12,74,67,0.42) 100%)",
                }}
              />
            </div>
          </div>

          {/* ---------------------------------------------------- stepper */}
          <div className="rounded-[2rem] bg-[var(--d-card)] p-7 shadow-[0_30px_64px_-36px_rgba(12,74,67,0.55)] md:p-9">
            <ol className="flex items-center gap-2" aria-label={content.label}>
              {content.stepNames.map((name, i) => {
                const state = i < step ? "done" : i === step ? "current" : "todo";
                return (
                  <li key={name} className="flex flex-1 flex-col gap-2" aria-current={state === "current" ? "step" : undefined}>
                    <span
                      className={`h-1.5 rounded-full transition-colors ${
                        state === "todo" ? "bg-[var(--d-line)]" : "bg-[var(--d-accent)]"
                      }`}
                    />
                    <span
                      className={`hidden text-[0.64rem] font-bold uppercase tracking-[0.14em] sm:block ${
                        state === "current"
                          ? "text-[var(--d-accent-deep)]"
                          : state === "done"
                            ? "text-[var(--d-ink-soft)]"
                            : "text-[var(--d-ink-soft)]/50"
                      }`}
                    >
                      {name}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-7 min-h-[26rem]">
              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <motion.div key="step-specialty" {...fade}>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent)]">
                      {content.stepOf.replace("{current}", "1").replace("{total}", "3")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--d-ink)]">
                      {content.chooseSpecialty}
                    </h3>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {specialties.map((item) => {
                        const Icon = SPECIALTY_ICONS[item.id];
                        const selected = specialty === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setSpecialty(item.id);
                              setDoctorId(null);
                              setStep(1);
                            }}
                            className={`flex flex-col items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                              selected
                                ? "border-[var(--d-accent)] bg-[var(--d-mint)]"
                                : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                            }`}
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-mint)] text-[var(--d-accent)]">
                              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                            </span>
                            <span className="text-[0.84rem] font-bold text-[var(--d-ink)]">
                              {item.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="step-doctor" {...fade}>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent)]">
                      {content.stepOf.replace("{current}", "2").replace("{total}", "3")} · {specialtyName}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--d-ink)]">
                      {content.chooseDoctor}
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {filteredDoctors.map((d) => {
                        const idx = doctors.findIndex((entry) => entry.id === d.id);
                        const selected = doctorId === d.id;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setDoctorId(d.id);
                              setDayId(null);
                              setSlotIdx(null);
                              setStep(2);
                            }}
                            className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                              selected
                                ? "border-[var(--d-accent)] bg-[var(--d-mint)]"
                                : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                            }`}
                          >
                            <DoctorAvatar name={d.name} index={idx} className="h-12 w-12 text-sm" />
                            <span>
                              <span className="block text-[0.86rem] font-bold text-[var(--d-ink)]">
                                {d.name}
                              </span>
                              <span className="mt-0.5 block text-[0.7rem] text-[var(--d-ink-soft)]">
                                {d.role}
                              </span>
                              <span className="mt-1 flex items-center gap-1 text-[0.7rem] font-semibold text-[var(--d-ink)]">
                                <Star
                                  className="h-3 w-3 fill-[var(--d-peach)] text-[var(--d-peach)]"
                                  strokeWidth={1.5}
                                  aria-hidden
                                />
                                {d.rating} · {d.next}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="mt-7 flex items-center gap-1.5 text-[0.78rem] font-bold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                      {content.back}
                    </button>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div key="step-time" {...fade}>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--d-accent)]">
                      {content.stepOf.replace("{current}", "3").replace("{total}", "3")} ·{" "}
                      {doctor?.name}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--d-ink)]">
                      {content.chooseTime}
                    </h3>

                    <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                      {content.dayLabel}
                    </p>
                    <div className="mt-2.5 grid grid-cols-5 gap-2">
                      {content.days.map((entry) => {
                        const selected = dayId === entry.id;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setDayId(entry.id);
                              setSlotIdx(null);
                            }}
                            className={`rounded-xl border-2 py-2.5 text-center transition-all ${
                              selected
                                ? "border-[var(--d-accent)] bg-[var(--d-mint)]"
                                : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                            }`}
                          >
                            <span className="block text-[0.68rem] font-bold uppercase text-[var(--d-ink-soft)]">
                              {entry.weekday}
                            </span>
                            <span className="mt-0.5 block text-[0.78rem] font-bold text-[var(--d-ink)]">
                              {entry.date}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                      {content.slotLabel}
                    </p>
                    <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {content.slots.map((slot, i) => {
                        const free = dayId !== null && isSlotFree(doctorIdx, dayIdx, i);
                        const selected = slotIdx === i;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={!free}
                            aria-pressed={selected}
                            aria-label={free ? slot : `${slot} — ${content.unavailable}`}
                            onClick={() => setSlotIdx(i)}
                            className={`rounded-xl border-2 py-2.5 text-[0.8rem] font-bold transition-all ${
                              selected
                                ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[var(--d-foam)]"
                                : free
                                  ? "border-[var(--d-line)] text-[var(--d-ink)] hover:border-[var(--d-accent)]/50"
                                  : "cursor-not-allowed border-transparent bg-[var(--d-mist)] text-[var(--d-ink-soft)]/40 line-through"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {summary ? (
                        <motion.p
                          key="summary"
                          initial={reduce ? undefined : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0 }}
                          className="mt-6 rounded-xl bg-[var(--d-mint)] px-4 py-3 text-[0.8rem] font-medium text-[var(--d-accent-deep)]"
                        >
                          {summary}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-1.5 text-[0.78rem] font-bold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                        {content.back}
                      </button>
                      <button
                        type="button"
                        disabled={!dayId || slotIdx === null}
                        onClick={() => setStep(3)}
                        className="flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--d-foam)] transition-all enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
                        {content.confirmCta}
                      </button>
                    </div>
                    <p className="mt-4 flex items-center gap-1.5 text-[0.7rem] text-[var(--d-ink-soft)]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                      {content.note}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="step-done" {...fade} className="flex min-h-[26rem] flex-col">
                    <motion.span
                      initial={reduce ? undefined : { scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--d-accent)] text-[var(--d-foam)]"
                    >
                      <Check className="h-6 w-6" strokeWidth={2.4} aria-hidden />
                    </motion.span>
                    <h3 className="mt-6 [font-family:var(--demo-display)] text-3xl italic tracking-tight text-[var(--d-ink)]">
                      {content.confirmedTitle}
                    </h3>
                    <p className="mt-3 max-w-md leading-[1.8] text-[var(--d-ink-soft)]">
                      {content.confirmedBody}
                    </p>

                    <div className="mt-7 rounded-2xl border border-[var(--d-line)] bg-[var(--d-mist)] p-5">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[var(--d-accent)]">
                        {content.summaryLabel}
                      </p>
                      <p className="mt-2.5 text-sm font-semibold leading-relaxed text-[var(--d-ink)]">
                        {summary}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-[var(--d-line)] pt-4">
                        <span className="text-[0.72rem] font-medium text-[var(--d-ink-soft)]">
                          {content.protocolLabel}
                        </span>
                        <span className="rounded-lg bg-[var(--d-card)] px-3 py-1.5 font-mono text-sm font-bold tracking-[0.14em] text-[var(--d-accent-deep)]">
                          {code}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={reset}
                      className="mt-auto self-start pt-7 text-[0.76rem] font-bold text-[var(--d-accent)] underline-offset-4 hover:underline"
                    >
                      {content.rebook}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
