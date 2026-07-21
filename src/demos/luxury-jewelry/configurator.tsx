"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { AureliaContent } from "./content";

const EASE_SLOW: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RingPreview({
  band,
  bandEdge,
  stone,
  glow,
  reduceMotion,
}: {
  band: string;
  bandEdge: string;
  stone: string;
  glow: string;
  reduceMotion: boolean;
}) {
  return (
    <svg
      viewBox="0 0 240 260"
      className="h-full w-full"
      role="img"
      aria-hidden
    >
      <defs>
        <radialGradient id="aur-velvet" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#1b1b21" />
          <stop offset="100%" stopColor="#050506" />
        </radialGradient>
        <linearGradient id="aur-band" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={band} />
          <stop offset="50%" stopColor={bandEdge} />
          <stop offset="100%" stopColor={band} />
        </linearGradient>
        <radialGradient id="aur-stone" cx="42%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="34%" stopColor={stone} />
          <stop offset="100%" stopColor={bandEdge} />
        </radialGradient>
        <radialGradient id="aur-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="240" height="260" fill="url(#aur-velvet)" />

      <motion.ellipse
        cx="120"
        cy="96"
        rx="70"
        ry="70"
        fill="url(#aur-glow)"
        animate={reduceMotion ? undefined : { opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* band */}
      <ellipse
        cx="120"
        cy="168"
        rx="52"
        ry="60"
        fill="none"
        stroke="url(#aur-band)"
        strokeWidth="13"
      />
      <ellipse
        cx="120"
        cy="168"
        rx="52"
        ry="60"
        fill="none"
        stroke="#000000"
        strokeOpacity="0.18"
        strokeWidth="3"
      />

      {/* prongs */}
      {[-18, 18].map((dx) => (
        <path
          key={dx}
          d={`M ${120 + dx} 118 L ${120 + dx * 0.5} 96`}
          stroke="url(#aur-band)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* stone */}
      <g>
        <polygon
          points="120,60 150,92 120,132 90,92"
          fill="url(#aur-stone)"
          stroke={bandEdge}
          strokeWidth="1.5"
        />
        <polygon points="120,60 150,92 120,96 90,92" fill="#ffffff" fillOpacity="0.28" />
        <polygon points="90,92 120,96 120,132" fill="#000000" fillOpacity="0.14" />
        <line x1="120" y1="60" x2="120" y2="132" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="0.75" />
      </g>

      <motion.circle
        cx="132"
        cy="82"
        r="3.4"
        fill="#ffffff"
        animate={reduceMotion ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.15, 0.8] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Configurator({
  content,
  format,
}: {
  content: AureliaContent["configurator"];
  format: (value: number) => string;
}) {
  const reduceMotion = useReducedMotion();
  const [metalId, setMetalId] = useState(content.metals[2].id);
  const [stoneId, setStoneId] = useState(content.stones[0].id);
  const [caratId, setCaratId] = useState(content.carats[1].id);
  const [reserved, setReserved] = useState(false);

  const metal = content.metals.find((m) => m.id === metalId) ?? content.metals[0];
  const stone = content.stones.find((s) => s.id === stoneId) ?? content.stones[0];
  const carat = content.carats.find((c) => c.id === caratId) ?? content.carats[0];

  const total = useMemo(
    () => Math.round(metal.price + stone.price * carat.multiplier),
    [metal.price, stone.price, carat.multiplier],
  );

  function onChange(setter: (value: string) => void, value: string) {
    setter(value);
    setReserved(false);
  }

  return (
    <section
      id="atelier"
      className="relative overflow-hidden border-y border-[var(--d-line-soft)] bg-[var(--d-bg-soft)] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[var(--d-gold)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-6 [font-family:var(--demo-display)] text-4xl font-light text-[var(--d-ink)] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* preview */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[var(--d-line-soft)]">
              <RingPreview
                band={metal.swatch}
                bandEdge={metal.swatchEdge}
                stone={stone.hex}
                glow={stone.glow}
                reduceMotion={Boolean(reduceMotion)}
              />
              <span className="sr-only">{content.ringAlt}</span>
            </div>
          </div>

          {/* controls */}
          <div>
            <fieldset>
              <legend className="text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
                {content.metalLabel}
              </legend>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {content.metals.map((item) => {
                  const selected = item.id === metalId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChange(setMetalId, item.id)}
                      className={`flex items-center gap-3 border px-4 py-3.5 text-left transition-colors duration-500 ${
                        selected
                          ? "border-[var(--d-gold)] bg-[var(--d-bg-raised)]"
                          : "border-[var(--d-line-soft)] hover:border-[var(--d-line)]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="h-6 w-6 shrink-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, ${item.swatch}, ${item.swatchEdge})`,
                        }}
                      />
                      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--d-ink)]">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
                {content.stoneLabel}
              </legend>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {content.stones.map((item) => {
                  const selected = item.id === stoneId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChange(setStoneId, item.id)}
                      className={`flex items-center gap-3 border px-4 py-3.5 text-left transition-colors duration-500 ${
                        selected
                          ? "border-[var(--d-gold)] bg-[var(--d-bg-raised)]"
                          : "border-[var(--d-line-soft)] hover:border-[var(--d-line)]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="h-6 w-6 shrink-0 rounded-full border border-white/20"
                        style={{
                          background: `radial-gradient(circle at 34% 28%, #ffffff, ${item.hex} 62%)`,
                        }}
                      />
                      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--d-ink)]">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
                {content.caratLabel}
              </legend>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {content.carats.map((item) => {
                  const selected = item.id === caratId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChange(setCaratId, item.id)}
                      className={`border px-2 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-500 ${
                        selected
                          ? "border-[var(--d-gold)] bg-[var(--d-bg-raised)] text-[var(--d-gold-bright)]"
                          : "border-[var(--d-line-soft)] text-[var(--d-ink-soft)] hover:border-[var(--d-line)] hover:text-[var(--d-ink)]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 border-l-2 border-[var(--d-line)] pl-4">
              <p className="text-[9px] uppercase tracking-[0.32em] text-[var(--d-gold)]">
                {content.stoneNoteLabel}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={stone.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_SLOW }}
                  className="mt-2 text-xs font-light leading-relaxed text-[var(--d-ink-soft)]"
                >
                  {stone.note}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-10 border-t border-[var(--d-line-soft)] pt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--d-ink-faint)]">
                    {content.totalLabel}
                  </p>
                  <p className="mt-2 [font-family:var(--demo-display)] text-4xl font-light text-[var(--d-gold-bright)]">
                    {format(total)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setReserved(true)}
                  className="flex items-center gap-2 border border-[var(--d-gold)] bg-[var(--d-gold)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#101014] transition-colors duration-500 hover:bg-transparent hover:text-[var(--d-gold)]"
                >
                  {reserved ? <Check aria-hidden className="h-4 w-4" strokeWidth={2} /> : null}
                  {content.ctaLabel}
                </button>
              </div>
              <p className="mt-5 text-[11px] font-light leading-relaxed text-[var(--d-ink-faint)]">
                {content.priceNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
