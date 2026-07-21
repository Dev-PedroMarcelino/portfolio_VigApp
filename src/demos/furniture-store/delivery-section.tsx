"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, RotateCcw, Truck, Wrench } from "lucide-react";
import type { DeliveryIcon, NordformContent } from "./content";
import { Reveal, SectionHeading } from "./ui";

const ICONS: Record<DeliveryIcon, typeof Truck> = {
  truck: Truck,
  wrench: Wrench,
  rotate: RotateCcw,
};

export function DeliverySection({ content }: { content: NordformContent["delivery"] }) {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="delivery" className="scroll-mt-20 bg-[var(--d-bone)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {content.cards.map((card, index) => {
            const Icon = ICONS[card.icon];
            return (
              <Reveal key={card.title} delay={index * 0.07}>
                <div className="flex h-full flex-col rounded-[20px] border border-[var(--d-line)] bg-[var(--d-card)] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--d-sage)]">
                    <Icon className="h-5 w-5 text-[var(--d-bone)]" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--d-soft)]">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 max-w-3xl">
            <h3 className="text-xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.faqTitle}
            </h3>
            <div className="mt-5 overflow-hidden rounded-[20px] border border-[var(--d-line)] bg-[var(--d-card)]">
              {content.faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.q} className="border-b border-[var(--d-line)] last:border-b-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-bone)] sm:px-6"
                    >
                      {faq.q}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.25 }}
                        className="shrink-0 text-[var(--d-soft)]"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-[13px] leading-relaxed text-[var(--d-soft)] sm:px-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
