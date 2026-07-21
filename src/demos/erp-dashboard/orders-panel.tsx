"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Inbox, MapPin, Package } from "lucide-react";
import type { OrderStatus, OrdersContent } from "./content";
import { PanelHead } from "./overview-panel";
import { OrderBadge } from "./ui";

type Filter = OrderStatus | "all";

const FILTER_ORDER: OrderStatus[] = [
  "paid",
  "processing",
  "shipped",
  "pending",
  "cancelled",
];

export function OrdersPanel({ content }: { content: OrdersContent }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: content.orders.length,
      paid: 0,
      processing: 0,
      shipped: 0,
      pending: 0,
      cancelled: 0,
    };
    for (const o of content.orders) map[o.status] += 1;
    return map;
  }, [content.orders]);

  const rows = useMemo(
    () => (filter === "all" ? content.orders : content.orders.filter((o) => o.status === filter)),
    [filter, content.orders],
  );

  const chips: Filter[] = ["all", ...FILTER_ORDER];

  return (
    <div className="flex flex-col gap-5">
      <PanelHead title={content.title} subtitle={content.subtitle} />

      <div className="flex flex-wrap items-center gap-2">
        {chips.map((c) => {
          const label = c === "all" ? content.filterAll : content.statusLabels[c];
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.76rem] font-medium transition-colors ${
                active
                  ? "border-[rgba(20,184,166,0.45)] bg-[rgba(20,184,166,0.14)] text-[var(--d-accent)]"
                  : "border-[var(--d-line)] bg-[var(--d-surface)] text-[var(--d-ink-soft)] hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
              }`}
            >
              {label}
              <span
                className={`[font-family:var(--demo-mono)] text-[0.64rem] tabular-nums ${
                  active ? "text-[var(--d-accent)]" : "text-[var(--d-ink-faint)]"
                }`}
              >
                {counts[c]}
              </span>
            </button>
          );
        })}
        <span className="ml-auto [font-family:var(--demo-mono)] text-[0.7rem] tabular-nums text-[var(--d-ink-faint)]">
          {rows.length} {content.countLabel}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {rows.map((order) => (
            <motion.article
              key={order.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] px-4 py-3.5 transition-colors hover:border-[var(--d-line-strong)]"
            >
              <div className="flex min-w-[9rem] flex-col">
                <span className="[font-family:var(--demo-mono)] text-[0.82rem] font-medium text-[var(--d-accent)]">
                  {order.id}
                </span>
                <span className="text-[0.66rem] text-[var(--d-ink-faint)]">{order.time}</span>
              </div>
              <div className="flex min-w-[10rem] flex-1 flex-col">
                <span className="text-sm font-medium text-[var(--d-ink)]">{order.customer}</span>
                <span className="inline-flex items-center gap-1 text-[0.68rem] text-[var(--d-ink-faint)]">
                  <MapPin className="h-3 w-3" strokeWidth={1.8} />
                  {order.region}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[0.74rem] text-[var(--d-ink-soft)]">
                <Package className="h-3.5 w-3.5 text-[var(--d-ink-faint)]" strokeWidth={1.8} />
                {order.items} {content.itemsLabel}
              </div>
              <div className="[font-family:var(--demo-mono)] text-sm font-medium tabular-nums text-[var(--d-ink)]">
                {order.total}
              </div>
              <div className="ml-auto">
                <OrderBadge status={order.status} label={content.statusLabels[order.status]} />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--d-line)] bg-[var(--d-surface)] px-6 py-14 text-center">
            <Inbox className="h-8 w-8 text-[var(--d-ink-faint)]" strokeWidth={1.4} />
            <p className="text-sm text-[var(--d-ink-soft)]">{content.emptyLabel}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
