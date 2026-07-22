"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { ArrowRight } from "lucide-react";
import type { ZelaContent } from "./content";
import { Blob, EASE } from "./ui";

export function ZelaCta({ content }: { content: ZelaContent["cta"] }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="cta" className="scroll-mt-16 px-5 pb-20 sm:pb-28">
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.6rem] bg-[var(--d-forest)] px-6 py-16 text-center text-[#F3EEDF] sm:px-12 sm:py-20"
      >
        <Blob color="rgba(124,179,66,0.2)" className="-left-24 -top-28 h-[22rem] w-[22rem]" />
        <Blob color="rgba(232,161,61,0.14)" className="-bottom-32 -right-20 h-[24rem] w-[24rem]" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl leading-tight tracking-tight [font-family:var(--demo-display)] sm:text-[2.9rem] sm:leading-[1.08]">
            {content.titleLead}{" "}
            <em className="font-medium italic text-[var(--d-lime)]">{content.titleAccent}</em>{" "}
            {content.titleEnd}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-[#F3EEDF]/70">
            {content.body}
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="group mx-auto mt-9 flex items-center gap-2 rounded-full bg-[#FFFDF7] px-8 py-4 text-sm font-semibold text-[var(--d-green)] shadow-[0_20px_44px_-18px_rgba(0,0,0,0.55)]"
          >
            {content.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </motion.button>

          <ol className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-7">
            {content.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-2.5 text-[0.8rem] text-[#F3EEDF]/75">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--d-lime)]/20 text-[0.68rem] font-bold text-[var(--d-lime)] [font-family:var(--demo-mono)]">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <p className="mt-8 text-[0.68rem] text-[#F3EEDF]/45">{content.note}</p>
        </div>
      </motion.div>
    </section>
  );
}
