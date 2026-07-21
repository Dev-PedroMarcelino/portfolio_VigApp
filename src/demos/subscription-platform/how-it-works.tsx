"use client";

import { PackageOpen, Search, SlidersHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HowContent } from "./content";
import { SectionLabel } from "./ui";

const STEP_ICONS: LucideIcon[] = [SlidersHorizontal, Search, PackageOpen];
const STEP_TILTS = ["-rotate-1", "rotate-1", "-rotate-1"];

export function HowItWorks({ content }: { content: HowContent }) {
  return (
    <section id="how" className="scroll-mt-24 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {content.steps.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            return (
              <li
                key={step.title}
                className={`relative rounded-[1.75rem] border border-[var(--d-line)] bg-[var(--d-card)] p-7 shadow-[0_18px_44px_-32px_rgba(55,39,26,0.5)] transition-transform hover:-translate-y-1 ${
                  STEP_TILTS[i % STEP_TILTS.length]
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--d-peach)] text-[var(--d-accent)]">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span
                    aria-hidden
                    className="[font-family:var(--demo-display)] text-5xl italic leading-none text-[var(--d-kraft-deep)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 [font-family:var(--demo-display)] text-2xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.8] text-[var(--d-ink-soft)]">{step.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
