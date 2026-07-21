"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  unsplash,
  type ProjectItem,
  type ProjectStatus,
  type VertexContent,
} from "./content";

const STATUS_TONE: Record<ProjectStatus, { dot: string; text: string }> = {
  onTrack: { dot: "var(--d-good)", text: "var(--d-good)" },
  ahead: { dot: "var(--d-accent)", text: "var(--d-accent)" },
  delayed: { dot: "var(--d-danger)", text: "var(--d-danger)" },
};

function ProgressBar({
  progress,
  active,
  label,
}: {
  progress: number;
  active: boolean;
  label: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex items-end justify-between">
        <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
          {label}
        </span>
        <span className="[font-family:var(--demo-display)] text-2xl leading-none text-[var(--d-ink)]">
          {progress}
          <span className="text-sm text-[var(--d-ink-faint)]">%</span>
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden bg-[var(--d-bg-2)]"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className="h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--d-accent-deep) 0 8px, var(--d-accent) 8px 16px)",
          }}
          initial={{ width: reduce ? `${progress}%` : "0%" }}
          animate={{ width: active || reduce ? `${progress}%` : "0%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function ProjectCard({
  item,
  content,
  formatValue,
  active,
}: {
  item: ProjectItem;
  content: VertexContent["projects"];
  formatValue: (v: number) => string;
  active: boolean;
}) {
  const tone = STATUS_TONE[item.status];
  return (
    <article className="group grid grid-cols-1 border border-[var(--d-line)] bg-[var(--d-panel)] transition-colors duration-300 hover:border-[var(--d-line-strong)] sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto">
        <Image
          src={unsplash(item.image, 1000)}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          className="object-cover grayscale-[0.35] transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(21,24,29,0.1) 0%, rgba(21,24,29,0.35) 60%, rgba(31,36,43,0.9) 100%)",
          }}
        />
        <div className="absolute left-3 top-3 bg-[var(--d-accent)] px-2.5 py-1 [font-family:var(--demo-body)] text-[10px] font-medium tracking-[0.14em] text-[var(--d-accent-ink)]">
          {item.code}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[rgba(21,24,29,0.78)] px-2.5 py-1 backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: tone.dot }}
            aria-hidden
          />
          <span
            className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.16em]"
            style={{ color: tone.text }}
          >
            {content.statusLabels[item.status]}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 p-6 sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="[font-family:var(--demo-body)] text-[11px] uppercase tracking-[0.18em] text-[var(--d-ink-faint)]">
              {item.sector}
            </span>
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-[var(--d-ink-faint)]">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
              {item.location}
            </span>
          </div>
          <h3 className="mt-2 [font-family:var(--demo-display)] text-2xl uppercase leading-[0.95] text-[var(--d-ink)] sm:text-[1.75rem]">
            {item.name}
          </h3>
          <div className="mt-4 border-t border-[var(--d-line)] pt-4">
            <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
              {content.phaseLabel}
            </span>
            <p className="mt-1 text-sm text-[var(--d-ink)]">{item.phase}</p>
          </div>
        </div>

        <div className="space-y-5">
          <ProgressBar
            progress={item.progress}
            active={active}
            label={content.progressLabel}
          />
          <div className="flex items-end justify-between border-t border-[var(--d-line)] pt-4">
            <span className="[font-family:var(--demo-body)] text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--d-ink-faint)]">
              {content.valueLabel}
            </span>
            <span className="[font-family:var(--demo-display)] text-xl text-[var(--d-accent)]">
              {formatValue(item.value)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects({
  content,
  formatValue,
}: {
  content: VertexContent["projects"];
  formatValue: (v: number) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="relative border-t border-[var(--d-line)] bg-[var(--d-bg-2)] py-20 sm:py-28"
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

        <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {content.items.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              content={content}
              formatValue={formatValue}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
