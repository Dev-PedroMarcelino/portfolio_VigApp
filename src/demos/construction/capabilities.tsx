"use client";

import { useState } from "react";
import { Building2, Factory, HousePlus, Waypoints, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Capability, VertexContent } from "./content";

const ICONS: Record<string, typeof Building2> = {
  infrastructure: Waypoints,
  commercial: Building2,
  industrial: Factory,
  residential: HousePlus,
};

function Card({
  item,
  content,
  open,
  onToggle,
}: {
  item: Capability;
  content: VertexContent["capabilities"];
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const Icon = ICONS[item.id] ?? Building2;

  return (
    <div
      className={`group relative flex flex-col border transition-colors duration-300 ${
        open
          ? "border-[var(--d-accent)] bg-[var(--d-panel-2)]"
          : "border-[var(--d-line)] bg-[var(--d-panel)] hover:border-[var(--d-line-strong)]"
      }`}
    >
      <div className="flex items-start justify-between p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-300 ${
              open
                ? "bg-[var(--d-accent)] text-[var(--d-accent-ink)]"
                : "bg-[var(--d-bg-2)] text-[var(--d-accent)]"
            }`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <span className="[font-family:var(--demo-body)] text-[11px] font-medium tracking-[0.28em] text-[var(--d-ink-faint)]">
              {item.index}
            </span>
            <h3 className="mt-1 [font-family:var(--demo-display)] text-2xl uppercase leading-none text-[var(--d-ink)] sm:text-[1.7rem]">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[12px] uppercase tracking-[0.12em] text-[var(--d-accent)]">
              {item.tagline}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="[font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-ink)]">
            {item.metricValue}
          </div>
          <div className="mt-1 max-w-[7rem] text-[10px] uppercase tracking-[0.14em] text-[var(--d-ink-faint)]">
            {item.metricLabel}
          </div>
        </div>
      </div>

      <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--d-ink-soft)] sm:px-7">
        {item.description}
      </p>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="scope"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--d-line)] px-6 py-5 sm:px-7">
              <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--d-ink-faint)]">
                {content.scopeLabel}
              </span>
              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {item.scope.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2.5 text-sm text-[var(--d-ink)]"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 bg-[var(--d-accent)]"
                      aria-hidden
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="mt-auto flex items-center justify-between border-t border-[var(--d-line)] px-6 py-4 text-left [font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--d-ink-soft)] transition-colors duration-200 hover:text-[var(--d-accent)] sm:px-7"
      >
        {open ? content.collapseLabel : content.expandLabel}
        <span className="flex h-6 w-6 items-center justify-center border border-[var(--d-line-strong)]">
          {open ? (
            <Minus className="h-3.5 w-3.5" strokeWidth={2} />
          ) : (
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          )}
        </span>
      </button>
    </div>
  );
}

export function Capabilities({
  content,
}: {
  content: VertexContent["capabilities"];
}) {
  const [openId, setOpenId] = useState<string | null>(content.items[0].id);

  return (
    <section
      id="capabilities"
      className="relative border-t border-[var(--d-line)] bg-[var(--d-bg)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid gap-6 border-b border-[var(--d-line)] pb-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
          <div>
            <span className="[font-family:var(--demo-body)] text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--d-accent)]">
              {content.eyebrow}
            </span>
            <h2 className="mt-3 max-w-2xl [font-family:var(--demo-display)] text-[clamp(2rem,4.5vw,3.4rem)] uppercase leading-[0.95] text-[var(--d-ink)]">
              {content.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--d-ink-soft)] lg:pb-2">
            {content.lede}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {content.items.map((item) => (
            <Card
              key={item.id}
              item={item}
              content={content}
              open={openId === item.id}
              onToggle={() =>
                setOpenId((cur) => (cur === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
