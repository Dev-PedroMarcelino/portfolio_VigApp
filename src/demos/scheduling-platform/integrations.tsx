"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Check,
  Cloud,
  CreditCard,
  FileText,
  Layers,
  Magnet,
  Mail,
  MessageSquare,
  Plus,
  Users,
  Video,
  Webcam,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IntegrationsContent } from "./content";
import { SectionLabel } from "./ui";

const ICONS: Record<string, LucideIcon> = {
  gcal: Calendar,
  outlook: Mail,
  zoom: Video,
  meet: Webcam,
  slack: MessageSquare,
  stripe: CreditCard,
  notion: FileText,
  hubspot: Magnet,
  salesforce: Cloud,
  msteams: Users,
  zapier: Zap,
  linear: Layers,
};

export function IntegrationsWall({ content }: { content: IntegrationsContent }) {
  const reduce = useReducedMotion() ?? false;
  const [connected, setConnected] = useState<string[]>(["gcal", "zoom"]);

  const toggle = (id: string) =>
    setConnected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );

  const counter = content.counter
    .replace("{count}", String(connected.length))
    .replace("{total}", String(content.items.length));

  return (
    <section id="integrations" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 leading-[1.8] text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>
          <p
            className="shrink-0 rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-4 py-2 text-xs font-bold text-[var(--d-accent-deep)]"
            aria-live="polite"
          >
            {counter}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {content.items.map((item, idx) => {
            const Icon = ICONS[item.id] ?? Zap;
            const isOn = connected.includes(item.id);
            return (
              <motion.button
                key={item.id}
                type="button"
                aria-pressed={isOn}
                onClick={() => toggle(item.id)}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: reduce ? 0 : (idx % 4) * 0.06, ease: "easeOut" }}
                className={`group relative rounded-2xl border-2 bg-[var(--d-card)] p-4 text-left transition-all hover:-translate-y-1 hover:shadow-[0_20px_36px_-24px_rgba(4,47,46,0.45)] ${
                  isOn
                    ? "border-[var(--d-accent)]"
                    : "border-[var(--d-line)] hover:border-[var(--d-accent)]/50"
                }`}
              >
                <AnimatePresence>
                  {isOn && (
                    <motion.span
                      initial={reduce ? undefined : { scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={reduce ? undefined : { scale: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--d-accent)] text-white shadow-md"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </motion.span>
                  )}
                </AnimatePresence>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    isOn
                      ? "bg-[var(--d-accent)] text-white"
                      : "bg-[var(--d-mint)] text-[var(--d-accent-deep)] group-hover:bg-[var(--d-accent)] group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="mt-3 block text-sm font-bold text-[var(--d-ink)]">{item.name}</span>
                <span className="mt-1 block min-h-[2rem] text-[0.68rem] leading-snug text-[var(--d-ink-soft)]">
                  {item.blurb}
                </span>
                <span
                  className={`mt-3 inline-flex items-center gap-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                    isOn
                      ? "text-[var(--d-accent-deep)]"
                      : "text-[var(--d-ink-soft)] group-hover:text-[var(--d-accent-deep)]"
                  }`}
                >
                  {isOn ? (
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  ) : (
                    <Plus className="h-3 w-3" strokeWidth={3} aria-hidden />
                  )}
                  {isOn ? content.connected : content.connect}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
