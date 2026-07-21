"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Gem, Globe, Landmark, TrendingUp } from "lucide-react";
import type { AssetClassId, VantageContent } from "./content";
import { SectionLabel } from "./ui";

const ICONS: Record<AssetClassId, typeof TrendingUp> = {
  equities: TrendingUp,
  income: Landmark,
  alternatives: Gem,
  global: Globe,
};

export function AssetClasses({ content }: { content: VantageContent["assetClasses"] }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<Set<AssetClassId>>(() => new Set<AssetClassId>(["equities"]));

  const toggle = (id: AssetClassId) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="strategies" className="scroll-mt-20 border-t border-[var(--d-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl leading-tight text-[var(--d-ink)] sm:text-[2.6rem] sm:leading-[1.12]">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {content.classes.map((cls, index) => {
            const Icon = ICONS[cls.id];
            const expanded = open.has(cls.id);
            const panelId = `vc-asset-${cls.id}`;
            return (
              <article
                key={cls.id}
                className={`rounded-2xl border transition-colors ${
                  expanded
                    ? "border-[var(--d-gold)]/50 bg-[var(--d-panel)]"
                    : "border-[var(--d-line)] bg-[var(--d-panel)]/50 hover:border-[var(--d-gold)]/30"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  aria-label={expanded ? `${content.collapseLabel} — ${cls.name}` : `${content.expandLabel} — ${cls.name}`}
                  onClick={() => toggle(cls.id)}
                  className="flex w-full items-center gap-5 p-6 text-left sm:p-7"
                >
                  <span
                    aria-hidden
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      expanded ? "border-[var(--d-gold)]/60 text-[var(--d-gold)]" : "border-[var(--d-line)] text-[var(--d-ink-soft)]"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.66rem] tabular-nums text-[var(--d-gold)]/70">
                        0{index + 1}
                      </span>
                      <span className="[font-family:var(--demo-display)] text-xl text-[var(--d-ink)] sm:text-2xl">
                        {cls.name}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs italic text-[var(--d-ink-soft)]">{cls.tagline}</span>
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                    className="text-[var(--d-ink-soft)]"
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[var(--d-line)] px-6 pb-7 pt-6 sm:px-7">
                        <p className="text-sm leading-relaxed text-[var(--d-ink-soft)]">{cls.description}</p>

                        <dl className="mt-6 grid grid-cols-3 gap-4">
                          {(
                            [
                              [content.fields.target, cls.target],
                              [content.fields.band, cls.band],
                              [content.fields.liquidity, cls.liquidity],
                            ] as const
                          ).map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-[var(--d-line)] bg-[#0A101D] px-3 py-3">
                              <dt className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-soft)]">
                                {label}
                              </dt>
                              <dd className="mt-1 font-mono text-[0.78rem] tabular-nums text-[var(--d-gold)]">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--d-ink-soft)]">
                          {content.holdingsTitle}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {cls.holdings.map((h) => (
                            <li key={h} className="flex items-start gap-3 text-sm text-[var(--d-ink)]/90">
                              <span aria-hidden className="mt-[0.55em] h-px w-4 shrink-0 bg-[var(--d-gold)]/60" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
