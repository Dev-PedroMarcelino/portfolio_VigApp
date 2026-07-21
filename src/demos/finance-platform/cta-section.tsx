"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { NuvexContent } from "./content";
import { scrollToId } from "./ui";

export function CtaSection({ content }: { content: NuvexContent["cta"] }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="cta"
      className="relative scroll-mt-16 overflow-hidden border-t border-[var(--d-line)] py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,36,54,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26,36,54,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(100% 90% at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(100% 90% at 50% 50%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 z-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)" }}
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-3xl px-5 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)]/60 px-3 py-1.5 text-[0.7rem] tracking-wide text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--d-accent)] shadow-[0_0_8px_var(--d-accent)]" />
          {content.badge}
        </span>

        <h2 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[3.4rem]">
          {content.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]">
          {content.body}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="group flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-7 py-3.5 text-sm font-semibold text-[#05070C] shadow-[0_0_30px_rgba(16,185,129,0.42)] transition-transform hover:scale-[1.03]"
          >
            {content.ctaPrimary}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => scrollToId("security")}
            className="rounded-full border border-[var(--d-line)] px-7 py-3.5 text-sm font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)]/50 hover:bg-[var(--d-panel)]"
          >
            {content.ctaSecondary}
          </button>
        </div>

        <p className="mt-8 text-[0.7rem] text-[var(--d-ink-soft)]/70 [font-family:var(--demo-mono)]">
          {content.disclaimer}
        </p>
      </motion.div>
    </section>
  );
}
