"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { CircleCheck, HandCoins, Smartphone, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SketchfabEmbed } from "@/components/demos/sketchfab-embed";
import type { BenefitIcon, ZelaContent } from "./content";
import { CARD_MODEL } from "./content";
import { Blob, EASE, SectionLabel } from "./ui";

const BENEFIT_ICONS: Record<BenefitIcon, LucideIcon> = {
  "circle-check": CircleCheck,
  "hand-coins": HandCoins,
  zap: Zap,
  smartphone: Smartphone,
};

/**
 * The one deliberately dark passage in an otherwise cream demo: a deep
 * forest stage so the real 3D metal card gets a dramatic spotlight.
 */
export function ZelaCard({ content }: { content: ZelaContent["card"] }) {
  const reduced = useReducedMotion() ?? false;

  const reveal = (delay = 0) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    whileInView: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      id="cartao"
      className="relative scroll-mt-16 overflow-hidden bg-[var(--d-forest)] py-20 text-[#F3EEDF] sm:py-28"
    >
      <Blob color="rgba(124,179,66,0.16)" className="-left-40 top-10 h-[30rem] w-[30rem]" />
      <Blob color="rgba(232,161,61,0.1)" className="-bottom-32 right-0 h-[24rem] w-[24rem]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Real 3D card via Sketchfab, click-to-load facade */}
        <motion.div {...reveal(0.08)} className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2.6rem] bg-gradient-to-br from-[var(--d-lime)]/18 via-transparent to-[var(--d-amber)]/12 blur-xl"
          />
          <SketchfabEmbed
            uid={CARD_MODEL.uid}
            title={content.viewerTitle}
            thumb={CARD_MODEL.thumb}
            credit={CARD_MODEL.credit}
            loadLabel={content.loadLabel}
            hint={content.hint}
            accent="#7CB342"
            autospin
            className="aspect-[4/3] w-full rounded-[2.2rem] border border-white/10 bg-black/30 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.8)]"
          />
        </motion.div>

        <div>
          <motion.div {...reveal(0)}>
            <SectionLabel text={content.label} tone="cream" />
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--d-lime)]/35 px-3.5 py-1.5 text-[0.7rem] font-medium text-[var(--d-lime)]">
              {content.badge}
            </p>
            <h2 className="mt-5 text-3xl leading-tight tracking-tight [font-family:var(--demo-display)] sm:text-[2.7rem] sm:leading-[1.08]">
              {content.titleLead}{" "}
              <em className="font-medium italic text-[var(--d-lime)]">{content.titleAccent}</em>
            </h2>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-[#F3EEDF]/70">
              {content.intro}
            </p>
          </motion.div>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {content.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[b.icon];
              return (
                <motion.li
                  key={b.title}
                  {...reveal(0.1 + i * 0.08)}
                  whileHover={reduced ? undefined : { y: -4 }}
                  className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-[var(--d-lime)]/30"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl rounded-tl-sm bg-[var(--d-lime)]/15 text-[var(--d-lime)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-3.5 text-[0.95rem] font-semibold [font-family:var(--demo-display)]">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[#F3EEDF]/65">{b.body}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
