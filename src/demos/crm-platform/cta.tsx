"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { CtaContent } from "./content";
import { scrollToId } from "./ui";

export function Cta({ content }: { content: CtaContent }) {
  const reduce = useReducedMotion();

  return (
    <section id="cta" className="relative scroll-mt-20 px-5 py-20 sm:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-7 py-14 text-center sm:px-12 sm:py-16"
        style={{ backgroundColor: "var(--d-accent-deep)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 120% at 15% 0%, rgba(255,255,255,0.16), transparent 50%), radial-gradient(80% 100% at 100% 100%, rgba(14,165,233,0.4), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage: "radial-gradient(ellipse 70% 80% at 50% 40%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 40%, black, transparent 75%)",
          }}
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="[font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.08]">
            {content.title}
          </h2>
          <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/80">{content.sub}</p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--d-accent-deep)] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.03]"
            >
              {content.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondary}
            </button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-1.5 text-[0.78rem] font-medium text-white/85">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.6} aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>

          <p className="mt-6 [font-family:var(--demo-mono)] text-[0.68rem] tracking-wide text-white/55">{content.note}</p>
        </div>
      </motion.div>
    </section>
  );
}
