"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MaterialId, NordformContent } from "./content";
import { IMAGES } from "./content";
import { Reveal, SectionHeading } from "./ui";

/** Pure-CSS material samples: base tone plus faint grain striping. */
const SWATCHES: Record<MaterialId, { background: string; dot: string }> = {
  oak: {
    background:
      "linear-gradient(115deg, #DEC49B 0%, #CDAE80 45%, #C2A170 100%), repeating-linear-gradient(100deg, rgba(107,74,50,0.10) 0 2px, transparent 2px 14px)",
    dot: "#C8A97E",
  },
  walnut: {
    background:
      "linear-gradient(115deg, #7C583D 0%, #6B4A32 50%, #573A26 100%), repeating-linear-gradient(100deg, rgba(33,29,25,0.16) 0 2px, transparent 2px 12px)",
    dot: "#6B4A32",
  },
  linen: {
    background:
      "linear-gradient(115deg, #EBE4D2 0%, #E1D9C4 55%, #D8CFB8 100%), repeating-linear-gradient(0deg, rgba(110,101,88,0.08) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(110,101,88,0.08) 0 1px, transparent 1px 4px)",
    dot: "#DED5C0",
  },
};

export function CollectionStory({ content }: { content: NordformContent["collection"] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<MaterialId>("oak");
  const material = content.materials.find((m) => m.id === active) ?? content.materials[0];

  return (
    <section id="collection" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading label={content.label} title={content.title} intro={content.intro} />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-[24px] border border-[var(--d-line)] lg:min-h-0">
            <Image
              src={IMAGES.collection}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[rgba(46,42,38,0.22)] to-transparent"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[24px] border border-[var(--d-line)] bg-[var(--d-bone)] p-6 sm:p-8">
              <div role="tablist" aria-label={content.label} className="flex flex-wrap gap-2">
                {content.materials.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    id={`material-tab-${m.id}`}
                    aria-selected={m.id === active}
                    aria-controls={`material-panel-${m.id}`}
                    onClick={() => setActive(m.id)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      m.id === active
                        ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-bone)]"
                        : "border-[var(--d-line)] text-[var(--d-soft)] hover:border-[var(--d-ink)] hover:text-[var(--d-ink)]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-3 w-3 rounded-full border border-[rgba(46,42,38,0.3)]"
                      style={{ backgroundColor: SWATCHES[m.id].dot }}
                    />
                    {m.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={material.id}
                  role="tabpanel"
                  id={`material-panel-${material.id}`}
                  aria-labelledby={`material-tab-${material.id}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="mt-6 flex flex-1 flex-col"
                >
                  <div
                    aria-hidden
                    className="h-28 rounded-2xl border border-[var(--d-line)] sm:h-36"
                    style={{ backgroundImage: SWATCHES[material.id].background }}
                  />
                  <h3 className="mt-6 text-2xl text-[var(--d-ink)] [font-family:var(--demo-display)]">
                    {material.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--d-soft)]">
                    {material.body}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {material.traits.map((trait) => (
                      <li
                        key={trait}
                        className="rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-3 py-1.5 text-[11px] font-medium text-[var(--d-ink)]"
                      >
                        {trait}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
