"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CornerDownLeft, Cpu, RotateCcw, Zap } from "lucide-react";
import type { PlaygroundContent, ScenarioId, ModelTierId } from "./content";
import { Glow, SectionHeading } from "./ui";

type Status = "idle" | "streaming" | "done";

const TICK_MS = 16;
const CHARS_PER_TICK: Record<ModelTierId, number> = { flux: 4, core: 3, atlas: 2 };

export function Playground({ content }: { content: PlaygroundContent }) {
  const reduce = useReducedMotion();
  const [model, setModel] = useState<ModelTierId>("core");
  const [scenarioId, setScenarioId] = useState<ScenarioId>("support");
  const [prompt, setPrompt] = useState(content.scenarios[0].prompt);
  const [status, setStatus] = useState<Status>("idle");
  const [target, setTarget] = useState("");
  const [shown, setShown] = useState(0);
  const outputRef = useRef<HTMLDivElement | null>(null);

  const scenario = useMemo(
    () => content.scenarios.find((s) => s.id === scenarioId) ?? content.scenarios[0],
    [content.scenarios, scenarioId],
  );
  const activeModel = content.models.find((m) => m.id === model) ?? content.models[1];

  // Typewriter reveal loop.
  useEffect(() => {
    if (status !== "streaming") return;
    const speed = CHARS_PER_TICK[model];
    let i = 0;
    const id = window.setInterval(() => {
      i += speed;
      if (i >= target.length) {
        setShown(target.length);
        setStatus("done");
        window.clearInterval(id);
      } else {
        setShown(i);
      }
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [status, target, model]);

  // Keep the output scrolled to the latest streamed line.
  useEffect(() => {
    if (status === "streaming" && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [shown, status]);

  const run = () => {
    const text = scenario.response;
    setTarget(text);
    if (reduce) {
      setShown(text.length);
      setStatus("done");
      return;
    }
    setShown(0);
    setStatus("streaming");
  };

  const reset = () => {
    setStatus("idle");
    setShown(0);
    setTarget("");
  };

  const pickScenario = (id: ScenarioId) => {
    const next = content.scenarios.find((s) => s.id === id);
    if (!next) return;
    setScenarioId(id);
    setPrompt(next.prompt);
    reset();
  };

  const displayed = target.slice(0, shown);
  const tokens = Math.round(shown / 4);
  const running = status === "streaming";

  return (
    <section id="playground" className="relative scroll-mt-20 py-24">
      <Glow className="left-[-10%] top-24 h-96 w-96" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[rgba(11,10,20,0.7)] shadow-[0_60px_140px_-60px_rgba(0,0,0,0.95),0_0_60px_-30px_rgba(167,139,250,0.35)] backdrop-blur-xl">
          {/* Model selector */}
          <div className="flex flex-col gap-3 border-b border-[var(--d-line)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                {content.modelLabel}
              </span>
            </div>
            <div
              role="radiogroup"
              aria-label={content.modelLabel}
              className="flex gap-1 rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] p-1"
            >
              {content.models.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={model === m.id}
                  onClick={() => setModel(m.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-[0.76rem] font-medium transition-colors ${
                    model === m.id ? "text-[var(--d-accent-ink)]" : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                  }`}
                >
                  {model === m.id && (
                    <motion.span
                      layoutId="pg-model-pill"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      className="absolute inset-0 rounded-full bg-[var(--d-accent)] shadow-[0_0_20px_-6px_var(--d-accent)]"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {m.name.replace("Cortexa ", "")}
                    <span className="hidden text-[0.6rem] opacity-70 sm:inline">{m.tag}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scenario presets */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--d-line)] px-4 py-3.5 sm:px-5">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
              {content.presetLabel}
            </span>
            {content.scenarios.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={scenarioId === s.id}
                onClick={() => pickScenario(s.id)}
                className={`rounded-full border px-3 py-1.5 text-[0.74rem] font-medium transition-colors ${
                  scenarioId === s.id
                    ? "border-[var(--d-accent)]/60 bg-[rgba(167,139,250,0.14)] text-[var(--d-accent-bright)]"
                    : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-line-strong)] hover:text-[var(--d-ink)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Prompt input */}
          <div className="p-4 sm:p-5">
            <label
              htmlFor="cortexa-prompt"
              className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]"
            >
              {content.promptLabel}
            </label>
            <textarea
              id="cortexa-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={content.placeholder}
              rows={2}
              className="w-full resize-none rounded-xl border border-[var(--d-line)] bg-[rgba(5,5,10,0.6)] px-3.5 py-3 text-[0.86rem] leading-relaxed text-[var(--d-ink)] outline-none transition-colors placeholder:text-[var(--d-ink-faint)] focus:border-[var(--d-accent)]/60 focus:ring-2 focus:ring-[rgba(167,139,250,0.25)]"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={reset}
                disabled={status === "idle"}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--d-line)] px-3.5 py-2 text-[0.78rem] font-medium text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-ink)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                {content.reset}
              </button>
              <button
                type="button"
                onClick={run}
                disabled={running}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.82rem] font-semibold text-[var(--d-accent-ink)] shadow-[0_0_28px_-8px_var(--d-accent)] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {running ? (
                  <>
                    <Zap className="h-4 w-4 animate-pulse" strokeWidth={2.2} aria-hidden />
                    {content.running}
                  </>
                ) : (
                  <>
                    {content.run}
                    <CornerDownLeft className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="border-t border-[var(--d-line)] bg-[rgba(5,5,10,0.5)]">
            <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                {content.outputLabel}
              </span>
              <div className="flex items-center gap-3 text-[0.66rem] [font-family:var(--demo-mono)] text-[var(--d-ink-faint)]">
                {status !== "idle" && (
                  <>
                    <span>
                      {content.latencyLabel} {activeModel.latencyMs}ms
                    </span>
                    <span className="text-[var(--d-ink-soft)]">
                      {tokens} {content.tokensLabel}
                    </span>
                  </>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${
                    status === "streaming"
                      ? "bg-[rgba(167,139,250,0.16)] text-[var(--d-accent-bright)]"
                      : status === "done"
                        ? "bg-[rgba(52,211,153,0.14)] text-[#6EE7B7]"
                        : "bg-[var(--d-panel)] text-[var(--d-ink-faint)]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status === "streaming"
                        ? "animate-pulse bg-[var(--d-accent)]"
                        : status === "done"
                          ? "bg-[#34D399]"
                          : "bg-[var(--d-ink-faint)]"
                    }`}
                    aria-hidden
                  />
                  {status === "streaming"
                    ? content.streamingLabel
                    : status === "done"
                      ? content.doneLabel
                      : content.outputLabel}
                </span>
              </div>
            </div>
            <div
              ref={outputRef}
              aria-live="polite"
              className="max-h-72 min-h-40 overflow-y-auto px-4 pb-5 sm:px-5"
            >
              {status === "idle" ? (
                <p className="pt-6 text-center text-[0.82rem] text-[var(--d-ink-faint)]">{content.idleHint}</p>
              ) : (
                <pre className="whitespace-pre-wrap break-words [font-family:var(--demo-mono)] text-[0.82rem] leading-relaxed text-[var(--d-ink)]">
                  {displayed}
                  {running && (
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[var(--d-accent)] align-middle" aria-hidden />
                  )}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
