"use client";

import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ShieldCheck } from "lucide-react";
import { pickContent } from "@/demos/content";
import {
  businessDashboardDict,
  OBJECTIVE_DATA,
  type PeriodId,
} from "./content";
import { Header } from "./header";
import { OkrRings } from "./okr-rings";
import { RevenueChart } from "./revenue-chart";
import { TeamTable } from "./team-table";
import { GoalsPanel } from "./goals-panel";
import { ActivityFeed } from "./activity-feed";
import { Outro } from "./outro";
import { Footer } from "./footer";

/**
 * Pulseboard — executive business dashboard concept.
 * Plum-black surface, coral accent, violet and cyan data series. The palette
 * lives here as CSS variables so the demo renders identically in any host
 * theme (light or dark).
 */
const PALETTE = {
  "--d-bg": "#0C0A10",
  "--d-surface": "#14111C",
  "--d-surface-2": "#1B1626",
  "--d-panel": "rgba(251,113,133,0.06)",
  "--d-panel-strong": "rgba(196,181,253,0.12)",
  "--d-line": "rgba(196,181,253,0.13)",
  "--d-line-strong": "rgba(196,181,253,0.26)",
  "--d-ink": "#F4F1F8",
  "--d-ink-soft": "#A79FB6",
  "--d-ink-faint": "#6E6580",
  "--d-accent": "#FB7185",
  "--d-accent-soft": "#FDA4AF",
  "--d-accent-ink": "#2A0A12",
  "--d-violet": "#A78BFA",
  "--d-cyan": "#22D3EE",
  "--d-emerald": "#34D399",
  "--d-amber": "#FBBF24",
} as CSSProperties;

export function Pulseboard({ locale }: { locale: string }) {
  const content = pickContent(businessDashboardDict, locale);
  const reduce = useReducedMotion() ?? false;

  const [period, setPeriod] = useState<PeriodId>("q4");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const objective = selectedGoal ? OBJECTIVE_DATA.find((o) => o.id === selectedGoal) ?? null : null;
  const objMeta = content.okr.objectives.find((o) => o.id === selectedGoal);

  return (
    <div
      id="top"
      style={{ ...PALETTE, backgroundColor: "#0C0A10", color: "#F4F1F8" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[rgba(251,113,133,0.32)]"
    >
      <Header
        nav={content.nav}
        periods={content.periods}
        period={period}
        onPeriod={setPeriod}
      />

      {/* Overview hero */}
      <section id="overview" className="relative overflow-hidden">
        <span
          className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full opacity-25 blur-[120px]"
          style={{ background: "var(--d-accent)" }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full opacity-20 blur-[120px]"
          style={{ background: "var(--d-violet)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:py-20 lg:px-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="[font-family:var(--demo-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--d-accent)]">
              {content.header.eyebrow}
            </span>
            <h1 className="mt-3 max-w-xl [font-family:var(--demo-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--d-ink)] sm:text-5xl">
              {content.header.title}
            </h1>
            <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-[var(--d-ink-soft)]">
              {content.header.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(52,211,153,0.15)] text-[var(--d-emerald)]">
                  <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div className="leading-tight">
                  <div className="text-[0.72rem] uppercase tracking-[0.12em] text-[var(--d-ink-faint)]">
                    {content.header.healthLabel}
                  </div>
                  <div className="text-[0.95rem] font-semibold text-[var(--d-ink)]">
                    {content.header.healthValue}
                  </div>
                </div>
              </div>
              <span className="[font-family:var(--demo-mono)] text-[0.72rem] text-[var(--d-ink-soft)]">
                {content.periods[period].window}
              </span>
            </div>
            <div className="h-px bg-[var(--d-line)]" />
            <div className="flex items-center gap-2.5 text-[0.86rem] text-[var(--d-ink-soft)]">
              <Activity className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={1.8} />
              {content.header.pace}
            </div>
          </motion.div>
        </div>
      </section>

      <OkrRings
        copy={content.okr}
        data={OBJECTIVE_DATA}
        period={period}
        onSelect={setSelectedGoal}
        selectedId={selectedGoal}
      />

      <RevenueChart copy={content.revenue} period={period} currency={content.currency} />

      <TeamTable copy={content.team} period={period} currency={content.currency} />

      <ActivityFeed copy={content.activity} />

      <Outro copy={content.outro} />

      <Footer copy={content.footer} />

      <GoalsPanel
        objective={objective}
        objectiveLabel={objMeta?.label ?? ""}
        caption={objMeta?.caption ?? ""}
        drill={content.drill}
        period={period}
        onClose={() => setSelectedGoal(null)}
      />
    </div>
  );
}
