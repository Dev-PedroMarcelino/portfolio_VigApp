"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, ChevronsUpDown } from "lucide-react";
import type { Content, CurrencyConfig, MemberData, PeriodId } from "./content";
import { MEMBER_DATA, PERIODS, formatMoney } from "./content";
import { cx } from "./ui";

type SortKey = "name" | "revenue" | "deals" | "attainment";
type Dir = "asc" | "desc";

function priorOf(period: PeriodId): PeriodId | null {
  const i = PERIODS.indexOf(period);
  return i <= 0 ? null : PERIODS[i - 1];
}

export function TeamTable({
  copy,
  period,
  currency,
}: {
  copy: Content["team"];
  period: PeriodId;
  currency: CurrencyConfig;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [dir, setDir] = useState<Dir>("desc");

  const prior = priorOf(period);

  const rows = useMemo(() => {
    const list = [...MEMBER_DATA];
    list.sort((a, b) => {
      let cmp: number;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else cmp = a[sortKey][period] - b[sortKey][period];
      return dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [sortKey, dir, period]);

  function toggle(key: SortKey) {
    if (key === sortKey) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDir(key === "name" ? "asc" : "desc");
    }
  }

  function rowTrend(m: MemberData): "up" | "down" {
    if (!prior) return m.trend;
    return m.revenue[period] >= m.revenue[prior] ? "up" : "down";
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (col !== sortKey) return <ChevronsUpDown className="h-3 w-3 opacity-50" />;
    return dir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <section id={copy.id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <span className="[font-family:var(--demo-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--d-accent)]">
          {copy.eyebrow}
        </span>
        <h2 className="[font-family:var(--demo-display)] text-2xl font-semibold tracking-tight text-[var(--d-ink)] sm:text-[1.7rem]">
          {copy.title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--d-ink-soft)]">{copy.subtitle}</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--d-line)] text-[0.7rem] uppercase tracking-[0.1em] text-[var(--d-ink-faint)]">
                <th className="py-3 pl-5 pr-3 font-medium">
                  <SortButton label={copy.columns.rep} onClick={() => toggle("name")}>
                    <SortIcon col="name" />
                  </SortButton>
                </th>
                <th className="px-3 py-3 font-medium">{copy.columns.region}</th>
                <th className="px-3 py-3 font-medium">
                  <SortButton label={copy.columns.revenue} onClick={() => toggle("revenue")}>
                    <SortIcon col="revenue" />
                  </SortButton>
                </th>
                <th className="px-3 py-3 font-medium">
                  <SortButton label={copy.columns.deals} onClick={() => toggle("deals")}>
                    <SortIcon col="deals" />
                  </SortButton>
                </th>
                <th className="px-3 py-3 pr-5 font-medium">
                  <SortButton label={copy.columns.attainment} onClick={() => toggle("attainment")}>
                    <SortIcon col="attainment" />
                  </SortButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, idx) => {
                const attn = m.attainment[period];
                const trend = rowTrend(m);
                const bar = Math.min(100, (attn / 140) * 100);
                const barColor =
                  attn >= 110 ? "var(--d-emerald)" : attn >= 100 ? "var(--d-violet)" : "var(--d-accent)";
                return (
                  <motion.tr
                    key={m.id}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className={cx(
                      "text-sm text-[var(--d-ink)]",
                      idx !== rows.length - 1 && "border-b border-[var(--d-line)]",
                    )}
                  >
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--d-panel-strong)] text-[0.66rem] font-semibold text-[var(--d-ink-soft)]">
                          {m.name.split(" ").map((p) => p[0]).join("")}
                        </div>
                        <div className="leading-tight">
                          <div className="font-medium">{m.name}</div>
                          <div className="text-[0.72rem] text-[var(--d-ink-faint)]">
                            {copy.roles[m.roleKey]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="[font-family:var(--demo-mono)] text-[0.78rem] text-[var(--d-ink-soft)]">
                        {m.region}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="[font-family:var(--demo-mono)] font-medium">
                          {formatMoney(m.revenue[period], currency, { compact: true })}
                        </span>
                        {trend === "up" ? (
                          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--d-emerald)]" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5 text-[var(--d-accent)]" />
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3.5 [font-family:var(--demo-mono)]">{m.deals[period]}</td>
                    <td className="px-3 py-3.5 pr-5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--d-line)]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: barColor }}
                            initial={false}
                            animate={{ width: `${bar}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                        <span className="[font-family:var(--demo-mono)] text-[0.78rem] tabular-nums text-[var(--d-ink)]">
                          {attn}%
                        </span>
                        <span className="hidden text-[0.68rem] text-[var(--d-ink-faint)] sm:inline">
                          {copy.quotaLabel}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function SortButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 uppercase tracking-[0.1em] transition-colors hover:text-[var(--d-ink)]"
    >
      {label}
      {children}
    </button>
  );
}
