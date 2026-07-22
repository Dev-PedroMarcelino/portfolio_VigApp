"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Eye, EyeOff, MoonStar, ScanFace, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SecurityIcon, ZelaContent } from "./content";
import { APP_BALANCE } from "./content";
import { EASE, fmtBRL, SectionLabel } from "./ui";

const BLOCK_ICONS: Record<SecurityIcon, LucideIcon> = {
  "eye-off": EyeOff,
  "shield-alert": ShieldAlert,
  "scan-face": ScanFace,
  "moon-star": MoonStar,
};

/** Tiny live demo inside the "Modo Rua" block: toggling blurs the balance. */
function StreetModeDemo({ demo }: { demo: ZelaContent["security"]["streetDemo"] }) {
  const [on, setOn] = useState(false);

  return (
    <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-[var(--d-bg)] px-4 py-3">
      <div className="min-w-0">
        <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">
          {demo.balanceLabel}
        </p>
        <p
          aria-hidden={on}
          className={`text-[1.05rem] font-medium text-[var(--d-ink)] [font-family:var(--demo-mono)] transition-[filter] duration-300 ${
            on ? "select-none blur-[7px]" : ""
          }`}
        >
          {fmtBRL(APP_BALANCE)}
        </p>
      </div>
      <motion.button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        aria-label={demo.toggleLabel}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.2, ease: EASE }}
        className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[0.72rem] font-medium transition-colors ${
          on
            ? "bg-[var(--d-green)] text-[#FFFDF7]"
            : "border border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-ink-soft)]"
        }`}
      >
        {on ? (
          <EyeOff className="h-3.5 w-3.5" strokeWidth={2} />
        ) : (
          <Eye className="h-3.5 w-3.5" strokeWidth={2} />
        )}
        {on ? demo.on : demo.off}
      </motion.button>
    </div>
  );
}

export function ZelaSecurity({ content }: { content: ZelaContent["security"] }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="seguranca"
      className="relative scroll-mt-16 border-b border-[var(--d-line)] bg-[var(--d-surface)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {content.blocks.map((block, i) => {
            const Icon = BLOCK_ICONS[block.icon];
            return (
              <motion.article
                key={block.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                whileHover={reduced ? undefined : { y: -4 }}
                className="rounded-[1.8rem] border border-[var(--d-line)] bg-[var(--d-bg)] p-6 transition-colors hover:border-[var(--d-green)]/30 sm:p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl rounded-tl-sm bg-[var(--d-green)]/10 text-[var(--d-green)]">
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-[1.1rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-display)]">
                  {block.title}
                </h3>
                <p className="mt-2 text-[0.87rem] leading-relaxed text-[var(--d-ink-soft)]">
                  {block.body}
                </p>

                {block.id === "rua" && <StreetModeDemo demo={content.streetDemo} />}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
