"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Check, Minus } from "lucide-react";
import type { IaraContent, ModelId } from "./content";
import { CALC_INPUT_SHARE, MODEL_PRICES } from "./content";
import { SectionLabel, fmtBRL, fmtNum } from "./ui";

const MIN_VOL = 1;
const MAX_VOL = 400;

/**
 * Pricing as one comparative table (attributes × three currents), with the
 * flagship column visually raised — plus a monthly-cost slider calculator.
 */
export function Pricing({
  content,
  localeTag,
}: {
  content: IaraContent["pricing"];
  localeTag: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  const [volume, setVolume] = useState(40);
  const [calcModel, setCalcModel] = useState<ModelId>("correnteza");

  const monthly = useMemo(() => {
    const p = MODEL_PRICES[calcModel];
    const perMillion = p.input * CALC_INPUT_SHARE + p.output * (1 - CALC_INPUT_SHARE);
    return volume * perMillion;
  }, [volume, calcModel]);

  const fillPct = ((volume - MIN_VOL) / (MAX_VOL - MIN_VOL)) * 100;

  return (
    <section id="precos" className="relative scroll-mt-24 bg-[var(--d-surface)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <SectionLabel text={content.label} />
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 overflow-x-auto rounded-2xl border border-[var(--d-line)] bg-[rgba(3,25,29,0.5)]"
        >
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">{content.title}</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[22%] px-5 py-6 sm:px-7" aria-label="—" />
                {content.models.map((m) => {
                  const flagship = m.id === "correnteza";
                  return (
                    <th
                      key={m.id}
                      scope="col"
                      className={`px-5 py-6 align-bottom sm:px-7 ${
                        flagship ? "bg-[rgba(45,212,191,0.07)]" : ""
                      }`}
                    >
                      {flagship && (
                        <span className="mb-2 inline-block rounded-full bg-[var(--d-teal)] px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#03191D] [font-family:var(--demo-mono)]">
                          {content.flagshipTag}
                        </span>
                      )}
                      <span className="block text-xl font-extrabold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
                        {m.name}
                      </span>
                      <span className="mt-1 block text-[0.66rem] uppercase tracking-[0.24em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                        {m.tag}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-[0.86rem]">
              {/* Input price — the headline row */}
              <Row label={content.attrInput}>
                {content.models.map((m) => (
                  <Cell key={m.id} flagship={m.id === "correnteza"}>
                    <span className="text-2xl font-extrabold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
                      {fmtBRL(MODEL_PRICES[m.id].input, localeTag, 2)}
                    </span>
                    <span className="ml-1.5 text-[0.66rem] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                      {content.perMillion}
                    </span>
                  </Cell>
                ))}
              </Row>
              <Row label={content.attrOutput}>
                {content.models.map((m) => (
                  <Cell key={m.id} flagship={m.id === "correnteza"}>
                    <span className="font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                      {fmtBRL(MODEL_PRICES[m.id].output, localeTag, 2)}
                    </span>
                  </Cell>
                ))}
              </Row>
              <Row label={content.attrContext}>
                {content.models.map((m) => (
                  <Cell key={m.id} flagship={m.id === "correnteza"}>
                    <span className="text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">{m.context}</span>
                  </Cell>
                ))}
              </Row>
              <Row label={content.attrLatency}>
                {content.models.map((m) => (
                  <Cell key={m.id} flagship={m.id === "correnteza"}>
                    <span className="text-[var(--d-ink-soft)] [font-family:var(--demo-mono)]">{m.latency}</span>
                  </Cell>
                ))}
              </Row>
              <Row label={content.attrReasoning}>
                {content.models.map((m) => (
                  <Cell key={m.id} flagship={m.id === "correnteza"}>
                    {m.reasoning ? (
                      <span className="inline-flex items-center gap-1.5 text-[var(--d-teal)]">
                        <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                        {content.yes}
                      </span>
                    ) : (
                      <span className="text-[var(--d-ink-faint)]">
                        <Minus className="h-4 w-4" strokeWidth={2} aria-label={content.no} />
                      </span>
                    )}
                  </Cell>
                ))}
              </Row>
              <Row label={content.attrBestFor} last>
                {content.models.map((m) => (
                  <Cell key={m.id} flagship={m.id === "correnteza"}>
                    <span className="block max-w-[16rem] text-[0.8rem] leading-relaxed text-[var(--d-ink-soft)]">
                      {m.bestFor}
                    </span>
                  </Cell>
                ))}
              </Row>
            </tbody>
          </table>
        </motion.div>

        {/* Cost calculator */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.1 }}
          className="mt-8 grid gap-10 rounded-2xl border border-[var(--d-line)] bg-[rgba(3,25,29,0.5)] p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
        >
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.calc.title}
            </h3>
            <p className="mt-2 text-[0.86rem] text-[var(--d-ink-soft)]">{content.calc.sub}</p>

            {/* Model chips */}
            <div
              role="radiogroup"
              aria-label={content.calc.modelLabel}
              className="mt-7 flex flex-wrap gap-2"
            >
              {content.models.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={calcModel === m.id}
                  onClick={() => setCalcModel(m.id)}
                  className={`rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-colors ${
                    calcModel === m.id
                      ? "border-[var(--d-teal)] bg-[rgba(45,212,191,0.12)] text-[var(--d-teal)]"
                      : "border-[var(--d-line)] text-[var(--d-ink-soft)] hover:border-[var(--d-teal)]/40 hover:text-[var(--d-ink)]"
                  }`}
                >
                  {m.name.replace("Iara ", "")}
                </button>
              ))}
            </div>

            {/* Volume slider */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="iara-volume"
                  className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]"
                >
                  {content.calc.volumeLabel}
                </label>
                <span className="text-[0.82rem] font-semibold text-[var(--d-ink)] [font-family:var(--demo-mono)]">
                  {fmtNum(volume, localeTag)} {content.calc.volumeUnit}
                </span>
              </div>
              <input
                id="iara-volume"
                type="range"
                min={MIN_VOL}
                max={MAX_VOL}
                step={1}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="iara-range mt-4"
                style={{ "--fill": `${fillPct}%` } as CSSProperties}
                aria-valuetext={`${fmtNum(volume, localeTag)} ${content.calc.volumeUnit}`}
              />
            </div>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-[var(--d-teal)]/25 bg-[rgba(45,212,191,0.06)] p-7 text-center sm:p-9">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.28em] text-[var(--d-teal)] [font-family:var(--demo-mono)]">
              {content.calc.totalLabel}
            </p>
            <p
              className="mt-3 text-[2.6rem] font-extrabold leading-none tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-[3rem]"
              aria-live="polite"
            >
              {fmtBRL(monthly, localeTag)}
              <span className="ml-1 text-base font-medium text-[var(--d-ink-soft)]">
                {content.calc.perMonth}
              </span>
            </p>
            <p className="mt-4 text-[0.72rem] leading-relaxed text-[var(--d-ink-faint)]">
              {content.calc.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Table primitives                                                     */
/* ------------------------------------------------------------------ */

function Row({ label, children }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <tr>
      <th
        scope="row"
        className="border-t border-[var(--d-line)] px-5 py-4 align-top text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)] sm:px-7"
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({ children, flagship }: { children: React.ReactNode; flagship: boolean }) {
  return (
    <td
      className={`border-t border-[var(--d-line)] px-5 py-4 align-top sm:px-7 ${
        flagship ? "bg-[rgba(45,212,191,0.07)]" : ""
      }`}
    >
      {children}
    </td>
  );
}
