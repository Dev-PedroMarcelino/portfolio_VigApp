"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Info } from "lucide-react";
import type { ModelsContent } from "./content";
import { Glow, SectionHeading } from "./ui";

export function ModelTiers({ content }: { content: ModelsContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="models" className="relative scroll-mt-20 py-24">
      <Glow className="left-[-6%] top-40 h-96 w-96" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[rgba(11,10,20,0.55)] backdrop-blur-sm">
          {/* Header row (desktop) */}
          <div className="hidden grid-cols-[1.6fr_0.8fr_0.9fr_1fr_1.4fr] gap-4 border-b border-[var(--d-line)] bg-[var(--d-panel)] px-6 py-4 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)] md:grid">
            <span>{content.headers.model}</span>
            <span>{content.headers.context}</span>
            <span>{content.headers.throughput}</span>
            <span>{content.headers.price}</span>
            <span>{content.headers.best}</span>
          </div>

          {content.rows.map((row, i) => (
            <motion.div
              key={row.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative grid grid-cols-2 gap-x-4 gap-y-3 px-6 py-5 md:grid-cols-[1.6fr_0.8fr_0.9fr_1fr_1.4fr] md:items-center ${
                i > 0 ? "border-t border-[var(--d-line)]" : ""
              } ${row.featured ? "bg-[rgba(167,139,250,0.06)]" : ""}`}
            >
              {row.featured && (
                <span className="absolute right-5 top-4 rounded-full bg-[var(--d-accent)] px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide text-[var(--d-accent-ink)] md:right-6">
                  {content.popular}
                </span>
              )}

              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      row.id === "flux"
                        ? "bg-[#67E8F9]"
                        : row.id === "core"
                          ? "bg-[var(--d-accent)] shadow-[0_0_10px_var(--d-accent)]"
                          : "bg-[#F0ABFC]"
                    }`}
                    aria-hidden
                  />
                  <span className="[font-family:var(--demo-display)] text-[0.98rem] font-semibold text-[var(--d-ink)]">
                    {row.name}
                  </span>
                </div>
                <p className="mt-1 text-[0.74rem] text-[var(--d-ink-faint)]">{row.desc}</p>
              </div>

              <TierCell label={content.headers.context} value={row.context} mono />
              <TierCell label={content.headers.throughput} value={row.throughput} mono />
              <TierCell
                label={content.headers.price}
                value={row.price}
                mono
                emphasis
              />

              <div className="col-span-2 md:col-span-1">
                <span className="hidden text-[0.82rem] text-[var(--d-ink-soft)] md:inline">{row.best}</span>
                <div className="md:hidden">
                  <span className="text-[0.62rem] uppercase tracking-wide text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                    {content.headers.best}
                  </span>
                  <p className="text-[0.82rem] text-[var(--d-ink-soft)]">{row.best}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2 text-center text-[0.8rem] text-[var(--d-ink-faint)]">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
          {content.note}
        </p>
      </div>
    </section>
  );
}

function TierCell({
  label,
  value,
  mono,
  emphasis,
}: {
  label: string;
  value: string;
  mono?: boolean;
  emphasis?: boolean;
}) {
  return (
    <div>
      <span className="block text-[0.62rem] uppercase tracking-wide text-[var(--d-ink-faint)] [font-family:var(--demo-mono)] md:hidden">
        {label}
      </span>
      <span
        className={`text-[0.86rem] ${mono ? "[font-family:var(--demo-mono)]" : ""} ${
          emphasis ? "font-semibold text-[var(--d-accent-bright)]" : "text-[var(--d-ink)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
