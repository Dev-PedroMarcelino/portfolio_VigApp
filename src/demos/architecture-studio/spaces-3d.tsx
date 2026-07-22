"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { Check } from "lucide-react";
import { SketchfabEmbed } from "@/components/demos/sketchfab-embed";
import type { PrumoContent, SpaceId } from "./content";
import { BRONZE, SPACES_3D } from "./content";
import { Kicker, Reveal, SectionTitle } from "./ui";

/**
 * Centerpiece: interactive 3D rooms. Radix tabs switch between three CC-BY
 * Sketchfab interiors behind a click-to-load facade — the pitch is that every
 * Prumo client approves the house in orbit before the site opens.
 */
export function Spaces3D({ content }: { content: PrumoContent["spaces"] }) {
  const [active, setActive] = useState<SpaceId>("living");

  return (
    <section id="ambientes" className="scroll-mt-24 bg-[var(--d-bg-soft)] py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sales copy */}
          <Reveal className="lg:col-span-4">
            <Kicker>{content.label}</Kicker>
            <SectionTitle lead={content.titleLead} italic={content.titleItalic} className="mt-6 !text-4xl sm:!text-5xl" />
            <p className="mt-8 [font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
              {content.intro}
            </p>
            <p className="mt-4 [font-family:var(--demo-body)] text-[15px] leading-[1.85] text-[var(--d-ink-soft)]">
              {content.body}
            </p>

            <ul className="mt-8 space-y-0">
              {content.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 border-t border-[var(--d-line)] py-3.5 [font-family:var(--demo-body)] text-sm text-[var(--d-ink)] last:border-b"
                >
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-accent)]" strokeWidth={1.5} />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Viewer */}
          <Reveal delay={0.12} className="lg:col-span-8">
            <Tabs.Root value={active} onValueChange={(v) => setActive(v as SpaceId)}>
              <Tabs.List
                aria-label={content.tabsAria}
                className="flex border-b border-[var(--d-line-strong)]"
              >
                {content.items.map((item, i) => (
                  <Tabs.Trigger
                    key={item.id}
                    value={item.id}
                    className="group relative flex-1 pb-4 pt-1 text-center outline-none transition-colors duration-300 focus-visible:bg-[var(--d-line)] data-[state=active]:text-[var(--d-ink)] sm:flex-none sm:px-8 sm:text-left"
                  >
                    <span className="mr-2 hidden [font-family:var(--demo-mono)] text-[10px] tracking-[0.2em] text-[var(--d-ink-faint)] sm:inline">
                      0{i + 1}
                    </span>
                    <span className="[font-family:var(--demo-body)] text-[12px] uppercase tracking-[0.22em] text-[var(--d-ink-soft)] transition-colors duration-300 group-hover:text-[var(--d-ink)] group-data-[state=active]:text-[var(--d-ink)]">
                      {item.tab}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-px h-[2px] scale-x-0 bg-[var(--d-accent)] transition-transform duration-400 ease-out group-data-[state=active]:scale-x-100"
                    />
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {content.items.map((item) => {
                const seed = SPACES_3D.find((s) => s.id === item.id)!;
                return (
                  <Tabs.Content key={item.id} value={item.id} className="pt-8 outline-none">
                    <SketchfabEmbed
                      uid={seed.uid}
                      title={item.name}
                      thumb={seed.thumb}
                      credit={seed.credit}
                      loadLabel={content.loadLabel}
                      hint={content.hint}
                      accent={BRONZE}
                      className="aspect-[4/3] w-full sm:aspect-[16/10]"
                    />
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="[font-family:var(--demo-display)] text-2xl text-[var(--d-ink)]">
                        {item.name}
                      </h3>
                      <p className="max-w-md [font-family:var(--demo-body)] text-[13px] leading-relaxed text-[var(--d-ink-soft)]">
                        {item.blurb}
                      </p>
                    </div>
                  </Tabs.Content>
                );
              })}
            </Tabs.Root>

            <p className="mt-8 border-t border-[var(--d-line)] pt-4 [font-family:var(--demo-mono)] text-[10px] leading-relaxed tracking-[0.06em] text-[var(--d-ink-faint)]">
              {content.note}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
