"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Check, HandCoins } from "lucide-react";
import type { ZelaContent } from "./content";
import { FEE_ROWS, FEE_TOTAL_YEAR } from "./content";
import { AnimatedMoney, Blob, EASE, fmtBRL, SectionLabel } from "./ui";

export function ZelaFees({ content }: { content: ZelaContent["fees"] }) {
  const reduced = useReducedMotion() ?? false;
  const totalRef = useRef<HTMLDivElement>(null);
  const totalInView = useInView(totalRef, { once: true, amount: 0.5 });

  return (
    <section id="tarifas" className="relative scroll-mt-16 overflow-hidden py-20 sm:py-28">
      <Blob color="rgba(124,179,66,0.1)" className="-right-32 top-24 h-[26rem] w-[26rem]" />

      <div className="relative mx-auto max-w-4xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 text-3xl leading-tight tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[2.7rem] sm:leading-[1.08]">
            {content.titleLead}{" "}
            <em className="font-medium italic text-[var(--d-green)]">{content.titleAccent}</em>
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        {/* Comparison table */}
        <div className="mt-12 overflow-hidden rounded-[1.8rem] border border-[var(--d-line)] bg-[var(--d-surface)] shadow-[0_30px_60px_-44px_rgba(28,43,36,0.4)]">
          <div className="grid grid-cols-[1.3fr_0.75fr_1fr] gap-3 border-b border-[var(--d-line)] bg-[var(--d-bg)] px-5 py-3.5 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)] sm:px-7">
            <span>{content.colService}</span>
            <span className="text-[var(--d-green)]">{content.colZela}</span>
            <span className="text-right sm:text-left">{content.colBank}</span>
          </div>

          {FEE_ROWS.map((row, i) => {
            const meta = content.rows[row.id];
            return (
              <motion.div
                key={row.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -18 }}
                whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
                className="grid grid-cols-[1.3fr_0.75fr_1fr] items-center gap-3 border-b border-[var(--d-line)] px-5 py-4 last:border-b-0 sm:px-7 sm:py-5"
              >
                <p className="text-[0.82rem] font-medium text-[var(--d-ink)] sm:text-[0.9rem]">
                  {meta.label}
                </p>

                <p className="flex items-center gap-1.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--d-green)]/12" aria-hidden>
                    <Check className="h-3 w-3 text-[var(--d-green)]" strokeWidth={3} />
                  </span>
                  <span className="text-[0.82rem] font-semibold text-[var(--d-green)] [font-family:var(--demo-mono)] sm:text-[0.9rem]">
                    {content.free}
                  </span>
                </p>

                <div className="text-right sm:text-left">
                  <p className="text-[0.78rem] text-[var(--d-ink)] [font-family:var(--demo-mono)] sm:text-[0.84rem]">
                    {meta.bankNote}
                  </p>
                  <p className="text-[0.66rem] text-[var(--d-ink-soft)]">
                    {fmtBRL(row.bankPerYear)} {content.perYearLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Annual savings highlight */}
        <motion.div
          ref={totalRef}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mt-6 flex flex-col items-start gap-5 rounded-[1.8rem] bg-[var(--d-green)] p-7 text-[#FFFDF7] sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl rounded-tl-sm bg-[var(--d-lime)]/25 text-[var(--d-lime)]">
              <HandCoins className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#FFFDF7]/65 [font-family:var(--demo-mono)]">
                {content.totalLabel}
              </p>
              <p className="mt-1 max-w-sm text-[0.7rem] leading-relaxed text-[#FFFDF7]/50">
                {content.totalNote}
              </p>
            </div>
          </div>
          <AnimatedMoney
            value={totalInView ? FEE_TOTAL_YEAR : 0}
            reduced={reduced}
            whole={false}
            className="text-[2.2rem] font-medium leading-none [font-family:var(--demo-mono)] sm:text-[2.6rem]"
          />
        </motion.div>
      </div>
    </section>
  );
}
