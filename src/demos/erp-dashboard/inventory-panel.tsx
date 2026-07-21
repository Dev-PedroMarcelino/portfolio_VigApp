"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  CATEGORY_LABELS,
  INVENTORY_RECORDS,
  type InventoryContent,
} from "./content";
import { PanelHead } from "./overview-panel";
import { StockBadge, stockBarColor } from "./ui";

type SortKey = "stock" | "sku";
type SortDir = "asc" | "desc";

function localeKey(locale: string): "en" | "pt" | "es" {
  return locale === "pt" || locale === "es" ? locale : "en";
}

export function InventoryPanel({
  content,
  locale,
}: {
  content: InventoryContent;
  locale: string;
}) {
  const reduce = useReducedMotion();
  const lk = localeKey(locale);
  const [sortKey, setSortKey] = useState<SortKey>("stock");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const rows = useMemo(() => {
    const copy = [...INVENTORY_RECORDS];
    copy.sort((a, b) => {
      const cmp =
        sortKey === "stock" ? a.stock - b.stock : a.sku.localeCompare(b.sku);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const dirLabel = sortDir === "asc" ? content.ascLabel : content.descLabel;

  return (
    <div className="flex flex-col gap-5">
      <PanelHead title={content.title} subtitle={content.subtitle} />

      <div className="flex flex-wrap items-center gap-2">
        <SortButton
          active={sortKey === "stock"}
          dir={sortDir}
          label={content.sortByStock}
          dirLabel={dirLabel}
          onClick={() => toggleSort("stock")}
        />
        <SortButton
          active={sortKey === "sku"}
          dir={sortDir}
          label={content.sortBySku}
          dirLabel={dirLabel}
          onClick={() => toggleSort("sku")}
        />
        <span className="ml-auto [font-family:var(--demo-mono)] text-[0.7rem] tabular-nums text-[var(--d-ink-faint)]">
          {rows.length} {content.resultLabel}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--d-line)] text-left text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
                <th scope="col" className="px-4 py-3 [font-family:var(--demo-mono)]">
                  {content.columns.sku}
                </th>
                <th scope="col" className="px-4 py-3">
                  {content.columns.product}
                </th>
                <th scope="col" className="px-4 py-3">
                  {content.columns.category}
                </th>
                <th scope="col" className="px-4 py-3">
                  {content.columns.stock}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {content.columns.price}
                </th>
                <th scope="col" className="px-4 py-3">
                  {content.columns.status}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const pct = Math.max(3, Math.round((row.stock / row.capacity) * 100));
                return (
                  <motion.tr
                    key={row.sku}
                    layout={!reduce}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="border-b border-[var(--d-line)] last:border-0 transition-colors hover:bg-[var(--d-panel)]"
                  >
                    <td className="px-4 py-3 [font-family:var(--demo-mono)] text-[0.78rem] font-medium text-[var(--d-accent)]">
                      {row.sku}
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--d-ink)]">{row.name}</td>
                    <td className="px-4 py-3 text-[var(--d-ink-soft)]">
                      {CATEGORY_LABELS[row.categoryId][lk]}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[var(--d-panel-strong)]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: stockBarColor(row.status) }}
                            initial={reduce ? false : { width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.04, ease: "easeOut" }}
                          />
                        </div>
                        <span className="[font-family:var(--demo-mono)] text-[0.74rem] tabular-nums text-[var(--d-ink-soft)]">
                          {row.stock}
                        </span>
                        <span className="hidden text-[0.64rem] text-[var(--d-ink-faint)] sm:inline">
                          / {row.capacity} {content.unitsLabel}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right [font-family:var(--demo-mono)] text-[0.8rem] tabular-nums text-[var(--d-ink)]">
                      {row.price[lk]}
                    </td>
                    <td className="px-4 py-3">
                      <StockBadge status={row.status} label={content.statusLabels[row.status]} />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SortButton({
  active,
  dir,
  label,
  dirLabel,
  onClick,
}: {
  active: boolean;
  dir: SortDir;
  label: string;
  dirLabel: string;
  onClick: () => void;
}) {
  const Icon = dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? `${label}, ${dirLabel}` : label}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[0.78rem] font-medium transition-colors ${
        active
          ? "border-[rgba(20,184,166,0.4)] bg-[rgba(20,184,166,0.12)] text-[var(--d-accent)]"
          : "border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-ink-soft)] hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
      }`}
    >
      {label}
      {active ? <Icon className="h-3.5 w-3.5" strokeWidth={2} /> : null}
    </button>
  );
}
