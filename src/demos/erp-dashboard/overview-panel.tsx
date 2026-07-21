"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { OverviewContent } from "./content";
import { Avatar, Sparkline } from "./ui";

export function OverviewPanel({ content }: { content: OverviewContent }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-6">
      <PanelHead title={content.title} subtitle={content.subtitle} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {content.kpis.map((kpi, i) => {
          const up = kpi.trend === "up";
          const stroke = up ? "#2DD4BF" : "#F59E0B";
          const Delta = up ? ArrowUpRight : ArrowDownRight;
          return (
            <motion.article
              key={kpi.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--d-ink-soft)]">
                  {kpi.label}
                </p>
                <span
                  className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[0.66rem] font-semibold ${
                    up
                      ? "bg-[rgba(20,184,166,0.14)] text-[#5EEAD4]"
                      : "bg-[rgba(245,158,11,0.14)] text-[#FCD34D]"
                  }`}
                >
                  <Delta className="h-3 w-3" strokeWidth={2.2} />
                  {kpi.delta}
                </span>
              </div>
              <p className="mt-3 [font-family:var(--demo-display)] text-3xl font-semibold tracking-tight text-[var(--d-ink)]">
                {kpi.value}
              </p>
              <p className="mt-0.5 text-[0.68rem] text-[var(--d-ink-faint)]">{kpi.caption}</p>
              <div className="mt-3 h-8">
                <Sparkline points={kpi.spark} stroke={stroke} />
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
        {/* Live activity feed */}
        <section className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5 lg:col-span-3">
          <h3 className="[font-family:var(--demo-display)] text-base font-semibold text-[var(--d-ink)]">
            {content.activityTitle}
          </h3>
          <ol className="mt-4 flex flex-col gap-1">
            {content.activity.map((item, i) => (
              <li
                key={`${item.initials}-${i}`}
                className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-[var(--d-panel)]"
              >
                <Avatar initials={item.initials} index={i} />
                <p className="min-w-0 flex-1 text-sm leading-snug text-[var(--d-ink-soft)]">
                  <span className="font-medium text-[var(--d-ink)]">{item.actor}</span>{" "}
                  {item.action}{" "}
                  <span className="font-medium text-[var(--d-accent)]">{item.target}</span>
                </p>
                <span className="shrink-0 text-[0.66rem] tabular-nums text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                  {item.time}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Warehouse capacity */}
        <section className="rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5 lg:col-span-2">
          <h3 className="[font-family:var(--demo-display)] text-base font-semibold text-[var(--d-ink)]">
            {content.capacityTitle}
          </h3>
          <p className="mt-1 text-[0.72rem] text-[var(--d-ink-faint)]">{content.capacitySubtitle}</p>
          <div className="mt-4 flex flex-col gap-4">
            {content.warehouses.map((wh, i) => {
              const pct = Math.round((wh.used / wh.capacity) * 100);
              const tone =
                pct >= 92 ? "var(--d-rose)" : pct >= 75 ? "var(--d-amber)" : "var(--d-accent)";
              return (
                <div key={wh.code}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--d-ink)]">
                      <span className="[font-family:var(--demo-mono)] text-[0.68rem] text-[var(--d-ink-faint)]">
                        {wh.code}
                      </span>{" "}
                      {wh.name}
                    </p>
                    <p className="[font-family:var(--demo-mono)] text-[0.72rem] tabular-nums text-[var(--d-ink-soft)]">
                      {pct}% {content.utilizationLabel}
                    </p>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--d-panel-strong)]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tone }}
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: reduce ? 0 : 0.1 + i * 0.08, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-1 text-[0.64rem] text-[var(--d-ink-faint)]">{wh.note}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export function PanelHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="[font-family:var(--demo-display)] text-xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-2xl">
        {title}
      </h2>
      <p className="mt-1 text-sm text-[var(--d-ink-soft)]">{subtitle}</p>
    </div>
  );
}
