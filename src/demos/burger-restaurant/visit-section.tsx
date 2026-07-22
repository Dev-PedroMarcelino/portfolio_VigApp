"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { AtSign, Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import type { GaragemContent } from "./content";
import {
  ADDRESS_AREA,
  ADDRESS_LINE,
  INSTAGRAM_HANDLE,
  MAP_EMBED_URL,
  MAP_LINK_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "./content";
import { FOCUS_RING, SectionLabel, Tape } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center border-2 border-[var(--d-line)] bg-[var(--d-panel)] text-[var(--d-red)]"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--d-yellow)] [font-family:var(--demo-mono)]">
          {label}
        </h3>
        <div className="mt-2 text-[0.92rem] leading-relaxed text-[var(--d-ink)]">{children}</div>
      </div>
    </div>
  );
}

export function VisitSection({ content }: { content: GaragemContent["visit"] }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="como-chegar" className="relative scroll-mt-20 bg-[var(--d-bg-soft)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionLabel text={content.label} />
        <h2 className="mt-4 text-4xl uppercase leading-[0.98] text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
          {content.title}
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Info column */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col gap-8"
          >
            <InfoBlock icon={<MapPin className="h-5 w-5" strokeWidth={2} />} label={content.addressLabel}>
              <p className="font-semibold">{ADDRESS_LINE}</p>
              <p className="text-[var(--d-ink-soft)]">{ADDRESS_AREA}</p>
            </InfoBlock>

            <InfoBlock icon={<Clock className="h-5 w-5" strokeWidth={2} />} label={content.hoursLabel}>
              <ul className="space-y-1.5">
                {content.hours.map((h) => (
                  <li key={h.days} className="flex items-baseline gap-3">
                    <span className="w-24 shrink-0 font-semibold uppercase tracking-wide text-[var(--d-ink)] [font-family:var(--demo-mono)] text-[0.78rem]">
                      {h.days}
                    </span>
                    <span aria-hidden className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-[var(--d-line)]" />
                    <span className="shrink-0 text-[0.85rem] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 inline-block -rotate-1 bg-[color:rgba(242,183,5,0.12)] px-2 py-1 text-[0.78rem] text-[var(--d-yellow)]">
                {content.closedNote}
              </p>
            </InfoBlock>

            <InfoBlock icon={<Phone className="h-5 w-5" strokeWidth={2} />} label={content.contactLabel}>
              <p className="[font-family:var(--demo-mono)]">{WHATSAPP_DISPLAY}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[var(--d-ink-soft)]">
                <AtSign className="h-3.5 w-3.5 text-[var(--d-red)]" strokeWidth={2.2} aria-hidden />
                <span className="[font-family:var(--demo-mono)] text-[0.85rem]">{INSTAGRAM_HANDLE}</span>
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex items-center gap-2 bg-[var(--d-red)] px-5 py-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[var(--d-bg)] shadow-[3px_3px_0_var(--d-yellow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--d-yellow)] active:translate-y-0 ${FOCUS_RING}`}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                {content.whatsappCta}
              </a>
            </InfoBlock>
          </motion.div>

          {/* Map with taped poster frame */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.12 }}
            className="relative"
          >
            <div className="relative border-4 border-[var(--d-line)] bg-[var(--d-panel)] p-2.5 shadow-[10px_10px_0_rgba(242,183,5,0.25)]">
              <Tape className="-top-4 left-10" rotate={-5} />
              <Tape className="-top-4 right-12 hidden sm:block" rotate={4} />

              <iframe
                title={content.mapTitle}
                src={MAP_EMBED_URL}
                loading="lazy"
                className="block h-[380px] w-full border-0 sm:h-[460px]"
              />

              <div className="flex items-center justify-between gap-3 px-1.5 pb-1 pt-3">
                <p className="truncate text-[0.68rem] uppercase tracking-[0.2em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
                  {ADDRESS_LINE} · Cambuí
                </p>
                <a
                  href={MAP_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex shrink-0 items-center gap-1.5 border-2 border-[var(--d-line)] px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--d-ink)] transition-colors hover:border-[var(--d-yellow)] hover:text-[var(--d-yellow)] ${FOCUS_RING}`}
                >
                  {content.openMap}
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
