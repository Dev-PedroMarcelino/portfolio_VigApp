"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { ArrowUpRight, Check } from "lucide-react";
import type { IaraContent } from "./content";
import { scrollToId } from "./ui";

/** Final CTA — one last dive — followed by the concept-disclaimer footer. */
export function Closing({
  cta,
  footer,
}: {
  cta: IaraContent["cta"];
  footer: IaraContent["footer"];
}) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <section id="cta" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
        {/* Deep glow rising from the bottom */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-[-40%] z-0 h-[70%] opacity-70 blur-[110px]"
          style={{
            background:
              "radial-gradient(60% 90% at 50% 100%, rgba(45,212,191,0.24), rgba(34,211,238,0.08) 55%, transparent 85%)",
          }}
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10 mx-auto max-w-3xl px-5 text-center"
        >
          <h2 className="text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-6xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]">
            {cta.sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("playground")}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--d-teal)] px-7 py-3.5 text-[0.9rem] font-semibold text-[#03191D] shadow-[0_0_40px_-8px_rgba(45,212,191,0.7)] transition-transform hover:scale-[1.04]"
            >
              {cta.primary}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.4}
                aria-hidden
              />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("precos")}
              className="rounded-full border border-[var(--d-line)] px-7 py-3.5 text-[0.9rem] font-medium text-[var(--d-ink)] transition-colors hover:border-[var(--d-teal)]/50 hover:bg-[var(--d-surface)]"
            >
              {cta.secondary}
            </button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {cta.bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-1.5 text-[0.76rem] text-[var(--d-ink-soft)]"
              >
                <Check className="h-3.5 w-3.5 text-[var(--d-teal)]" strokeWidth={2.4} aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <footer className="relative border-t border-[var(--d-line)] bg-[#02161A] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-extrabold tracking-[0.08em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
              IARA
            </p>
            <p className="mt-2 max-w-xs text-[0.8rem] leading-relaxed text-[var(--d-ink-soft)]">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="IARA — footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(link.href.slice(1));
                }}
                className="text-[0.8rem] text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-teal)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-[var(--d-line)]/60 px-5 pt-6">
          <p className="text-[0.7rem] tracking-wide text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
            {footer.disclaimer}
          </p>
        </div>
      </footer>
    </>
  );
}
