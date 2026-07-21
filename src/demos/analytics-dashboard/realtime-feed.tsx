"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import {
  FEED_ACTORS,
  FEED_CITIES,
  type AnalyticsContent,
} from "./content";
import { cx, formatCurrency } from "./ui";

const ANCHOR = Date.UTC(2026, 6, 21, 14, 32, 11);

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Deterministic 0..1 fraction from a counter (no Math.random in render). */
function frac(counter: number, salt: number): number {
  const x = Math.sin(counter * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface FeedEvent {
  key: number;
  actor: string;
  city: string;
  label: string;
  hasValue: boolean;
  value: number;
  ts: string;
}

function makeEvent(counter: number, content: AnalyticsContent): FeedEvent {
  const actions = content.feed.actions;
  const action = actions[Math.floor(frac(counter, 1) * actions.length) % actions.length];
  const actor = FEED_ACTORS[counter % FEED_ACTORS.length];
  const city = FEED_CITIES[(counter * 3 + 1) % FEED_CITIES.length];
  const value = Math.round((40 + frac(counter, 5) * 920) / 5) * 5;
  const d = new Date(ANCHOR + counter * 3000);
  const ts = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  return {
    key: counter,
    actor,
    city,
    label: action.label,
    hasValue: action.hasValue,
    value,
    ts,
  };
}

const INITIAL = 6;

export function RealtimeFeed({ content }: { content: AnalyticsContent }) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const counterRef = useRef(INITIAL);
  const [events, setEvents] = useState<FeedEvent[]>(() =>
    Array.from({ length: INITIAL }, (_, i) => makeEvent(INITIAL - 1 - i, content)),
  );

  const push = useCallback(() => {
    const next = makeEvent(counterRef.current, content);
    counterRef.current += 1;
    setEvents((prev) => [next, ...prev].slice(0, 7));
  }, [content]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(push, 2600);
    return () => window.clearInterval(id);
  }, [reduce, paused, push]);

  const live = !paused && !reduce;

  return (
    <section
      id="live"
      aria-label={content.feed.title}
      className="flex scroll-mt-32 flex-col rounded-2xl border border-[var(--d-line)] bg-[var(--d-surface)] p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.feed.title}
            </h2>
            <span
              className={cx(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] [font-family:var(--demo-mono)]",
              )}
              style={{
                color: live ? "#34D399" : "#94A6BF",
                backgroundColor: live
                  ? "rgba(52,211,153,0.12)"
                  : "rgba(148,166,191,0.12)",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                {live && (
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-[var(--d-emerald)]"
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 2, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: live ? "#34D399" : "#94A6BF" }}
                />
              </span>
              {live ? content.feed.liveLabel : content.feed.pausedLabel}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[var(--d-ink-soft)]">
            {content.feed.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          disabled={!!reduce}
          aria-label={paused ? content.feed.resumeAction : content.feed.pauseAction}
          className="flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3 py-1.5 text-[12px] font-medium text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)] disabled:opacity-40"
        >
          {paused ? (
            <Play className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
          ) : (
            <Pause className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
          )}
          <span className="hidden sm:inline">
            {paused ? content.feed.resumeAction : content.feed.pauseAction}
          </span>
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.li
              key={e.key}
              layout
              initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-xl border border-[var(--d-line)] bg-[var(--d-panel)] px-3 py-2.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--d-bg)] text-[11px] font-semibold text-[var(--d-accent)] [font-family:var(--demo-mono)]">
                {e.actor
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] text-[var(--d-ink)]">
                  <span className="font-semibold">{e.actor}</span>{" "}
                  <span className="text-[var(--d-ink-soft)]">{e.label}</span>
                </p>
                <p className="text-[11px] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                  {content.feed.fromLabel} {e.city} · {e.ts}
                </p>
              </div>
              {e.hasValue && (
                <span className="shrink-0 rounded-full bg-[var(--d-bg)] px-2.5 py-1 text-[12px] font-semibold text-[var(--d-emerald)] [font-family:var(--demo-mono)]">
                  {formatCurrency(e.value, content.currency)}
                </span>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
