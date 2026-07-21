"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqContent } from "./content";
import { SectionHeading } from "./ui";

const FAQ_IMG =
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80";

export function FaqSection({ content }: { content: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--d-bg)] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            label={content.label}
            title={content.title}
            accent={content.accent}
            intro={content.intro}
          />
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-40px_rgba(12,74,67,0.55)] lg:block">
            <Image
              src={FAQ_IMG}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 460px, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(234,246,244,0.28) 0%, rgba(29,138,126,0.06) 45%, rgba(12,74,67,0.36) 100%)",
              }}
            />
          </div>
        </div>

        <ul className="space-y-3">
          {content.items.map((item, index) => {
            const expanded = open === index;
            const panelId = `aurora-faq-panel-${index}`;
            return (
              <li
                key={item.q}
                className={`overflow-hidden rounded-[1.5rem] border transition-colors ${
                  expanded
                    ? "border-[var(--d-accent)]/35 bg-[var(--d-mint)]"
                    : "border-[var(--d-line)] bg-[var(--d-card)]"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[0.95rem] font-bold tracking-tight text-[var(--d-ink)]">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      expanded
                        ? "bg-[var(--d-accent)] text-[var(--d-foam)]"
                        : "bg-[var(--d-mist)] text-[var(--d-accent)]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      id={panelId}
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-[1.8] text-[var(--d-ink-soft)]">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
