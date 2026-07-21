"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Check, MousePointerClick, TrendingDown, TrendingUp } from "lucide-react";
import type { FeaturesContent, FeatureTabId, TrackStatusId } from "./content";
import { Avatar, Glow, SectionHeading, TONE_CHIP } from "./ui";

/* ------------------------------------------------------------------ */
/* Plan mock: interactive mini-kanban                                  */
/* ------------------------------------------------------------------ */

function KanbanMock({ plan }: { plan: FeaturesContent["plan"] }) {
  const reduce = useReducedMotion();
  const [positions, setPositions] = useState<Record<string, number>>(() =>
    Object.fromEntries(plan.cards.map((c) => [c.id, c.col])),
  );

  const advance = (id: string) =>
    setPositions((prev) => ({ ...prev, [id]: (prev[id] + 1) % plan.columns.length }));

  return (
    <div>
      <p className="mb-4 flex items-center gap-2 text-[0.72rem] font-medium text-[var(--d-accent)]">
        <MousePointerClick className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        {plan.hint}
      </p>
      <LayoutGroup>
        <div className="grid grid-cols-3 gap-3">
          {plan.columns.map((column, colIndex) => {
            const cards = plan.cards.filter((c) => positions[c.id] === colIndex);
            return (
              <div
                key={column}
                className="flex min-h-56 flex-col gap-2.5 rounded-xl border border-[var(--d-line)] bg-[rgba(148,163,184,0.04)] p-2.5"
              >
                <div className="flex items-center justify-between px-1">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                    {column}
                  </span>
                  <span className="rounded-full bg-[var(--d-panel)] px-1.5 text-[0.6rem] font-semibold text-[var(--d-ink-soft)]">
                    {cards.length}
                  </span>
                </div>
                {cards.map((card) => {
                  const cardIndex = plan.cards.findIndex((c) => c.id === card.id);
                  return (
                    <motion.button
                      key={card.id}
                      layout={!reduce}
                      layoutId={reduce ? undefined : `kanban-${card.id}`}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      type="button"
                      onClick={() => advance(card.id)}
                      className="group rounded-lg border border-[var(--d-line)] bg-[rgba(15,23,42,0.85)] p-2.5 text-left transition-colors hover:border-[var(--d-accent)]/50 hover:bg-[rgba(96,165,250,0.08)]"
                    >
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[0.56rem] font-semibold uppercase tracking-wide ${TONE_CHIP[card.tone]}`}
                      >
                        {card.tag}
                      </span>
                      <span className="mt-1.5 block text-[0.7rem] font-medium leading-snug text-[var(--d-ink)]">
                        {card.title}
                      </span>
                      <span className="mt-2 flex items-center justify-between">
                        <Avatar initials={card.initials} index={cardIndex} size="h-5 w-5 text-[0.5rem]" />
                        <span
                          className="h-1 w-6 rounded-full bg-[var(--d-line-strong)] transition-colors group-hover:bg-[var(--d-accent)]"
                          aria-hidden
                        />
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Track mock: live portfolio table                                    */
/* ------------------------------------------------------------------ */

const STATUS_STYLE: Record<TrackStatusId, string> = {
  onTrack: "bg-[rgba(96,165,250,0.14)] text-[#93C5FD]",
  atRisk: "bg-[rgba(251,191,36,0.14)] text-[#FCD34D]",
  done: "bg-[rgba(52,211,153,0.14)] text-[#6EE7B7]",
};

function TrackMock({ track }: { track: FeaturesContent["track"] }) {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--d-line)]">
      <div className="grid grid-cols-[1.6fr_1fr_0.9fr] items-center gap-2 border-b border-[var(--d-line)] bg-[rgba(148,163,184,0.05)] px-3.5 py-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-faint)] sm:grid-cols-[1.6fr_1fr_0.9fr_0.6fr_1fr]">
        <span>{track.headers.task}</span>
        <span>{track.headers.owner}</span>
        <span>{track.headers.status}</span>
        <span className="hidden sm:block">{track.headers.due}</span>
        <span className="hidden sm:block">{track.headers.progress}</span>
      </div>
      {track.rows.map((row, i) => (
        <div
          key={row.task}
          className={`grid grid-cols-[1.6fr_1fr_0.9fr] items-center gap-2 px-3.5 py-3 sm:grid-cols-[1.6fr_1fr_0.9fr_0.6fr_1fr] ${
            i > 0 ? "border-t border-[var(--d-line)]" : ""
          }`}
        >
          <span className="truncate text-[0.72rem] font-medium text-[var(--d-ink)]">{row.task}</span>
          <span className="flex min-w-0 items-center gap-1.5">
            <Avatar
              initials={row.owner
                .split(" ")
                .map((w) => w[0])
                .join("")}
              index={i}
              size="h-5 w-5 text-[0.5rem]"
            />
            <span className="truncate text-[0.68rem] text-[var(--d-ink-soft)]">{row.owner}</span>
          </span>
          <span>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[0.58rem] font-semibold ${STATUS_STYLE[row.status]}`}
            >
              {track.statuses[row.status]}
            </span>
          </span>
          <span className="hidden text-[0.66rem] text-[var(--d-ink-faint)] sm:block">{row.due}</span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--d-line)]">
              <motion.span
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${row.progress}%` }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: "easeOut" }}
                className={`block h-full rounded-full ${row.progress === 100 ? "bg-[#34D399]" : "bg-[var(--d-accent)]"}`}
              />
            </span>
            <span className="w-8 text-right text-[0.62rem] tabular-nums text-[var(--d-ink-soft)]">
              {row.progress}%
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Report mock: velocity chart + stat tiles                            */
/* ------------------------------------------------------------------ */

function ReportMock({ report }: { report: FeaturesContent["report"] }) {
  const reduce = useReducedMotion();
  const max = Math.max(...report.bars.map((b) => b.value));
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-[var(--d-line)] bg-[rgba(148,163,184,0.04)] p-4">
        <p className="text-[0.7rem] font-semibold text-[var(--d-ink)]">{report.title}</p>
        <p className="text-[0.62rem] text-[var(--d-ink-faint)]">{report.subtitle}</p>
        <div className="mt-4 flex h-36 items-end gap-3">
          {report.bars.map((bar, i) => (
            <div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-[0.6rem] tabular-nums text-[var(--d-ink-soft)]">{bar.value}</span>
              <motion.div
                initial={reduce ? false : { height: 0 }}
                animate={{ height: `${(bar.value / max) * 100}%` }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: "easeOut" }}
                className={`w-full max-w-9 rounded-t-md ${
                  i === report.bars.length - 1
                    ? "bg-gradient-to-t from-[#3B82F6] to-[#93C5FD] shadow-[0_0_24px_-4px_rgba(96,165,250,0.7)]"
                    : "bg-[rgba(96,165,250,0.28)]"
                }`}
              />
              <span className="text-[0.58rem] uppercase tracking-wide text-[var(--d-ink-faint)]">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {report.stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[var(--d-line)] bg-[rgba(148,163,184,0.04)] p-3">
            <p className="truncate text-[0.6rem] font-medium text-[var(--d-ink-faint)]">{stat.label}</p>
            <p className="mt-1 [font-family:var(--demo-display)] text-lg font-semibold text-[var(--d-ink)]">
              {stat.value}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[0.6rem] font-medium text-[#6EE7B7]">
              {stat.delta.startsWith("-") ? (
                <TrendingDown className="h-3 w-3" strokeWidth={2.2} aria-hidden />
              ) : (
                <TrendingUp className="h-3 w-3" strokeWidth={2.2} aria-hidden />
              )}
              {stat.delta}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function FeatureTabs({ content }: { content: FeaturesContent }) {
  const [active, setActive] = useState<FeatureTabId>("plan");
  const activeTab = content.tabs.find((t) => t.id === active) ?? content.tabs[0];

  return (
    <section id="product" className="relative scroll-mt-20 py-24">
      <Glow className="-right-40 top-20 h-96 w-96" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div
          role="tablist"
          aria-label={content.label}
          className="mx-auto mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] p-1 backdrop-blur"
        >
          {content.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative rounded-full px-5 py-2 text-[0.8rem] font-medium transition-colors ${
                active === tab.id ? "text-[var(--d-accent-ink)]" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
              }`}
            >
              {active === tab.id && (
                <motion.span
                  layoutId="feature-tab-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="absolute inset-0 rounded-full bg-[var(--d-accent)] shadow-[0_0_24px_-6px_rgba(96,165,250,0.9)]"
                  aria-hidden
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${activeTab.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-3xl">
                {activeTab.title}
              </h3>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--d-ink-soft)]">{activeTab.body}</p>
              <ul className="mt-6 space-y-3">
                {activeTab.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[0.88rem] text-[var(--d-ink)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(96,165,250,0.16)]">
                      <Check className="h-3 w-3 text-[var(--d-accent)]" strokeWidth={2.6} aria-hidden />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`mock-${activeTab.id}`}
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -14 }}
              transition={{ duration: 0.32 }}
              className="rounded-2xl border border-[var(--d-line)] bg-[rgba(15,23,42,0.6)] p-4 shadow-[0_40px_100px_-40px_rgba(2,6,23,0.9),0_0_50px_-18px_rgba(96,165,250,0.3)] backdrop-blur-xl sm:p-5"
            >
              {activeTab.id === "plan" && <KanbanMock plan={content.plan} />}
              {activeTab.id === "track" && <TrackMock track={content.track} />}
              {activeTab.id === "report" && <ReportMock report={content.report} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
