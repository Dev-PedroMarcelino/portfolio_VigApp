"use client";

import { useState } from "react";
import type { AtelierContent } from "./content";

export function Awards({ content }: { content: AtelierContent["awards"] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="awards"
      className="relative border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.02em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.title}
            </h2>
          </div>
          <p className="max-w-xs [font-family:var(--demo-body)] text-sm italic text-[var(--d-ink-soft)]">
            {content.note}
          </p>
        </div>

        <ul className="border-t border-[var(--d-line-strong)]">
          {content.items.map((item) => {
            const isHot = hovered === item.id;
            return (
              <li
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                className="group grid grid-cols-[auto_1fr] items-center gap-4 border-b border-[var(--d-line)] py-6 outline-none transition-colors duration-500 focus-visible:bg-[var(--d-bg-soft)] sm:grid-cols-[7rem_1fr_auto] sm:gap-8 sm:py-7"
              >
                <span
                  className={`[font-family:var(--demo-display)] text-[clamp(1.75rem,4vw,3rem)] font-medium leading-none tabular-nums transition-all duration-500 ${
                    isHot
                      ? "text-[var(--d-ink)] sm:-translate-y-0.5"
                      : "text-[var(--d-ink-faint)]"
                  }`}
                >
                  {item.year}
                </span>

                <span className="min-w-0">
                  <span className="block [font-family:var(--demo-display)] text-[clamp(1.05rem,2.2vw,1.65rem)] font-medium leading-tight text-[var(--d-ink)]">
                    {item.title}
                  </span>
                  <span className="mt-1 block italic [font-family:var(--demo-body)] text-[0.95rem] text-[var(--d-ink-soft)]">
                    {item.body}
                  </span>
                </span>

                <span
                  className={`justify-self-start border px-3 py-1.5 [font-family:var(--demo-display)] text-[9px] uppercase tracking-[0.28em] transition-colors duration-500 sm:justify-self-end ${
                    isHot
                      ? "border-[var(--d-ink)] bg-[var(--d-ink)] text-[var(--d-bg)]"
                      : "border-[var(--d-line-strong)] text-[var(--d-ink-soft)]"
                  }`}
                >
                  {item.role}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
