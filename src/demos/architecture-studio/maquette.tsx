"use client";

import dynamic from "next/dynamic";
import { Rotate3d } from "lucide-react";
import { useSceneActive } from "@/components/three/use-scene-active";
import type { AtelierContent } from "./content";

// Lazy client-only mount so the WebGL bundle never blocks first paint.
const MassingScene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <div aria-hidden />,
});

function CornerTicks() {
  const base =
    "pointer-events-none absolute h-3 w-3 border-[var(--d-line-strong)]";
  return (
    <span aria-hidden>
      <span className={`${base} -left-px -top-px border-l border-t`} />
      <span className={`${base} -right-px -top-px border-r border-t`} />
      <span className={`${base} -bottom-px -left-px border-b border-l`} />
      <span className={`${base} -bottom-px -right-px border-b border-r`} />
    </span>
  );
}

export function Maquette({ content }: { content: AtelierContent["maquette"] }) {
  const { ref, active } = useSceneActive<HTMLDivElement>();

  return (
    <section
      id="massing"
      className="relative border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
              {content.title}
            </h2>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-[var(--d-ink-soft)] [font-family:var(--demo-body)]">
              {content.body}
            </p>
            <p className="mt-6 [font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
              {content.caption}
            </p>
          </div>

          <div className="relative">
            <CornerTicks />
            <div className="relative border border-[var(--d-line)] bg-[var(--d-bg-soft)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-4 py-3">
                <span className="[font-family:var(--demo-display)] text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                  {content.frameLabel}
                </span>
                <span className="flex items-center gap-1.5 border border-[var(--d-line-strong)] bg-[var(--d-bg-dim)] px-2 py-1 [font-family:var(--demo-display)] text-[9px] uppercase tracking-[0.25em] text-[var(--d-ink-soft)]">
                  <Rotate3d className="h-3 w-3" strokeWidth={1.5} />
                  {content.liveLabel}
                </span>
              </div>

              <div ref={ref} aria-hidden className="aspect-[16/11] w-full">
                <MassingScene active={active} />
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-3 left-4 z-10 flex items-center gap-2"
              >
                <span className="block h-px w-10 bg-[var(--d-line-strong)]" />
                <span className="[font-family:var(--demo-display)] text-[9px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
                  {content.scaleLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
