"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import type { PastBoxesContent } from "./content";
import { SectionLabel } from "./ui";

const IMG_JARS =
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80";
const IMG_SNACKS =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80";

const TILTS = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];

export function PastBoxes({ content }: { content: PastBoxesContent }) {
  return (
    <section id="archive" className="scroll-mt-24 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 leading-[1.85] text-[var(--d-ink-soft)]">{content.intro}</p>
          </div>
          <p className="flex shrink-0 items-center gap-2.5 rounded-full border border-[var(--d-line)] bg-[var(--d-card)] px-5 py-3 text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-[var(--d-olive-deep)]">
            <CalendarDays className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
            {content.archiveNote}
          </p>
        </div>

        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {content.boxes.map((box, i) => (
            <li
              key={box.month}
              className={`w-[272px] shrink-0 snap-start lg:w-auto ${TILTS[i % TILTS.length]}`}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--d-line)] bg-[var(--d-card)] shadow-[0_20px_50px_-36px_rgba(55,39,26,0.6)] transition-transform hover:-translate-y-1.5">
                <div className="relative h-40">
                  {i === 0 ? (
                    <>
                      <Image
                        src={IMG_JARS}
                        alt={content.alts.jars}
                        fill
                        sizes="272px"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#37271A]/45 via-transparent to-[#E2593B]/15"
                      />
                    </>
                  ) : i === 3 ? (
                    <>
                      <Image
                        src={IMG_SNACKS}
                        alt={content.alts.snacks}
                        fill
                        sizes="272px"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#474E2C]/50 via-transparent to-transparent"
                      />
                    </>
                  ) : (
                    <CrateArt index={i} />
                  )}
                  {box.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-[var(--d-ink)]/85 px-3 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-bg)]">
                      {box.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-[var(--d-accent)]">
                    {box.month}
                  </p>
                  <h3 className="mt-2 [font-family:var(--demo-display)] text-2xl tracking-tight">
                    {box.theme}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.75] text-[var(--d-ink-soft)]">{box.blurb}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Pure CSS/SVG crate art for archive months without photography. */
function CrateArt({ index }: { index: number }) {
  const warm = index % 2 === 1;
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background: warm
          ? "linear-gradient(150deg, #E2593B 0%, #C24428 100%)"
          : "linear-gradient(150deg, #6B7243 0%, #474E2C 100%)",
      }}
    >
      <svg viewBox="0 0 272 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke={warm ? "#FFE7CC" : "#F3E6CE"} strokeOpacity="0.4" strokeWidth="1.5">
          <circle cx="216" cy="30" r="52" strokeDasharray="6 5" />
          <circle cx="216" cy="30" r="34" />
          <circle cx="40" cy="140" r="46" strokeDasharray="3 4" />
        </g>
        <g fill={warm ? "#FFE7CC" : "#F3E6CE"} fillOpacity="0.28">
          <circle cx="90" cy="52" r="7" />
          <circle cx="126" cy="96" r="5" />
          <circle cx="170" cy="120" r="9" />
        </g>
      </svg>
    </div>
  );
}
