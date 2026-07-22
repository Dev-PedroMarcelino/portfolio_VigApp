"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Plus } from "lucide-react";
import type { IaraContent } from "./content";
import { SectionLabel } from "./ui";

/**
 * Sector cases as a big numbered editorial index. Each row expands (Radix
 * Accordion) into a fictional Brazilian mini-case with three headline metrics.
 */
export function SectorCases({ content }: { content: IaraContent["cases"] }) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="casos" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel text={content.label} />
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
              {content.intro}
            </p>
          </div>
          <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
            {content.fictionNote}
          </p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-14"
        >
          <Accordion.Root type="single" collapsible defaultValue={content.items[0].id}>
            {content.items.map((item) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className="group border-t border-[var(--d-line)] last:border-b"
              >
                <Accordion.Header asChild>
                  <h3>
                    <Accordion.Trigger className="flex w-full items-center gap-5 py-7 text-left transition-colors hover:bg-[rgba(6,42,48,0.4)] sm:gap-8 sm:py-8">
                      <span
                        aria-hidden
                        className="w-14 shrink-0 text-[2.4rem] font-extrabold leading-none tracking-tight text-[var(--d-line)] transition-colors [font-family:var(--demo-display)] group-data-[state=open]:text-[var(--d-teal)] sm:w-20 sm:text-[3.2rem]"
                      >
                        {item.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xl font-bold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-2xl">
                          {item.sector}
                        </span>
                        <span className="mt-1 block truncate text-[0.8rem] text-[var(--d-ink-soft)]">
                          {item.summary}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] text-[var(--d-ink-soft)] transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:border-[var(--d-teal)]/60 group-data-[state=open]:text-[var(--d-teal)]"
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                    </Accordion.Trigger>
                  </h3>
                </Accordion.Header>

                <Accordion.Content className="iara-acc-content">
                  <div className="grid gap-8 pb-9 pl-0 sm:pl-[5rem] lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pl-[7rem]">
                    <div>
                      <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[var(--d-teal)] [font-family:var(--demo-mono)]">
                        {item.company}
                      </p>
                      <p className="mt-3 max-w-xl text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">
                        {item.body}
                      </p>
                    </div>
                    <dl className="grid grid-cols-3 gap-4 self-start">
                      {item.metrics.map((m) => (
                        <div key={m.label} className="border-l border-[var(--d-line)] pl-3">
                          <dt className="sr-only">{m.label}</dt>
                          <dd className="text-lg font-bold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-xl">
                            {m.value}
                          </dd>
                          <dd className="mt-1 text-[0.68rem] leading-snug text-[var(--d-ink-faint)]">
                            {m.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
