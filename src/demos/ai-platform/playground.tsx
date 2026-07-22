"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { RotateCcw, Sparkles, User } from "lucide-react";
import type { IaraContent, PlaygroundScenario, ScenarioId } from "./content";
import { SCENARIO_META } from "./content";

/* ------------------------------------------------------------------ */
/* Streaming chat window — one instance per active scenario             */
/* ------------------------------------------------------------------ */

type Status = "waiting" | "streaming" | "done";

const TICK_MS = 30;
const WORDS_PER_TICK = 2;
const START_DELAY_MS = 500;

function ChatWindow({
  scenario,
  labels,
  reduced,
}: {
  scenario: PlaygroundScenario;
  labels: IaraContent["playground"];
  reduced: boolean;
}) {
  /** Response pre-split into word chunks so streaming lands on boundaries. */
  const words = useMemo(() => scenario.response.match(/\S+\s*/g) ?? [], [scenario.response]);
  const [shown, setShown] = useState(0);
  const [status, setStatus] = useState<Status>("waiting");
  const [runId, setRunId] = useState(0);
  const outputRef = useRef<HTMLDivElement | null>(null);

  const meta = SCENARIO_META[scenario.id];

  // Auto-run on mount and on every "run again"; reduced motion skips ahead.
  useEffect(() => {
    if (reduced) {
      setShown(words.length);
      setStatus("done");
      return;
    }
    setShown(0);
    setStatus("waiting");
    const start = window.setTimeout(() => setStatus("streaming"), START_DELAY_MS);
    return () => window.clearTimeout(start);
  }, [runId, words.length, reduced]);

  useEffect(() => {
    if (status !== "streaming") return;
    let i = 0;
    const id = window.setInterval(() => {
      i += WORDS_PER_TICK;
      if (i >= words.length) {
        setShown(words.length);
        setStatus("done");
        window.clearInterval(id);
      } else {
        setShown(i);
      }
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [status, words.length]);

  // Keep the transcript pinned to the newest streamed line.
  useEffect(() => {
    if (status === "streaming" && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [shown, status]);

  const displayed = words.slice(0, shown).join("");
  const streaming = status === "streaming";
  const tokens = Math.round(scenario.response.length / 3.8);
  const shownTokens = status === "done" ? tokens : Math.round(displayed.length / 3.8);

  return (
    <div>
      {/* Transcript */}
      <div ref={outputRef} className="max-h-[26rem] space-y-5 overflow-y-auto p-4 sm:p-6">
        {/* User turn */}
        <div className="flex gap-3">
          <span
            aria-hidden
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--d-line)] bg-[var(--d-surface)]"
          >
            <User className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
              {labels.userLabel}
            </p>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[var(--d-ink)]">
              {scenario.prompt}
            </p>
          </div>
        </div>

        {/* IARA turn */}
        <div className="flex gap-3">
          <span
            aria-hidden
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--d-teal)] to-[var(--d-cyan)]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#03191D]" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-[var(--d-teal)] [font-family:var(--demo-mono)]">
              {labels.assistantLabel}
              <span className="rounded-full border border-[var(--d-line)] px-1.5 py-px normal-case tracking-normal text-[var(--d-ink-faint)]">
                {labels.modelChip}
              </span>
            </p>
            <div aria-live="polite" aria-busy={status !== "done"} className="mt-1.5">
              {status === "waiting" ? (
                <span className="inline-flex gap-1.5 py-2" aria-label={labels.streamingLabel}>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--d-teal)] [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--d-teal)] [animation-delay:140ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--d-teal)] [animation-delay:280ms]" />
                </span>
              ) : (
                <pre className="whitespace-pre-wrap break-words text-[0.88rem] leading-relaxed text-[var(--d-ink)] [font-family:var(--demo-body)]">
                  {displayed}
                  {streaming && (
                    <span
                      aria-hidden
                      className="iara-cursor ml-0.5 inline-block h-[1.05em] w-[0.52em] translate-y-[0.18em] rounded-[2px] bg-[var(--d-teal)]"
                    />
                  )}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry + replay */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--d-line)] px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.66rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
          <span>
            {labels.firstTokenLabel} {meta.firstTokenMs} ms
          </span>
          <span>
            {shownTokens} {labels.tokensLabel}
          </span>
          <span>
            {meta.tokPerSec} {labels.tokPerSecLabel}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${
              status === "done"
                ? "bg-[rgba(45,212,191,0.12)] text-[var(--d-teal)]"
                : "bg-[rgba(34,211,238,0.1)] text-[var(--d-cyan)]"
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${
                status === "done" ? "bg-[var(--d-teal)]" : "animate-pulse bg-[var(--d-cyan)]"
              }`}
            />
            {status === "done" ? labels.doneLabel : labels.streamingLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          disabled={streaming || status === "waiting"}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3.5 py-1.5 text-[0.76rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:border-[var(--d-teal)]/50 hover:text-[var(--d-ink)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          {labels.runAgain}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Playground shell — window chrome + scenario tabs                     */
/* ------------------------------------------------------------------ */

export function Playground({ content }: { content: IaraContent["playground"] }) {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState<ScenarioId>(content.scenarios[0].id);

  return (
    <div
      id="playground"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[rgba(6,42,48,0.72)] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9),0_0_80px_-40px_rgba(45,212,191,0.4)] backdrop-blur-xl"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--d-line)] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--d-line)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--d-line)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--d-teal)]/60" />
          </span>
          <span className="truncate text-[0.7rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
            {content.windowTitle}
          </span>
        </div>
        <span className="hidden items-center gap-1.5 text-[0.66rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)] sm:flex">
          <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--d-teal)]" />
          {content.region}
        </span>
      </div>

      <Tabs.Root value={active} onValueChange={(v) => setActive(v as ScenarioId)}>
        <Tabs.List
          aria-label={content.tabsLabel}
          className="flex gap-1 overflow-x-auto border-b border-[var(--d-line)] px-3 pt-3 sm:px-5"
        >
          {content.scenarios.map((s) => (
            <Tabs.Trigger
              key={s.id}
              value={s.id}
              className="relative whitespace-nowrap rounded-t-lg px-4 py-2.5 text-[0.8rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)] data-[state=active]:text-[var(--d-teal)]"
            >
              {s.tab}
              <span
                aria-hidden
                className="absolute inset-x-2 bottom-0 hidden h-0.5 rounded-full bg-[var(--d-teal)] shadow-[0_0_10px_var(--d-teal)] data-[on=true]:block"
                data-on={active === s.id}
              />
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {content.scenarios.map((s) => (
          <Tabs.Content key={s.id} value={s.id} className="outline-none">
            <ChatWindow scenario={s} labels={content} reduced={reduced} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
