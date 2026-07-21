"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { AtelierContent, Project } from "./content";
import { unsplash } from "./content";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--d-line)] py-4">
      <dt className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
        {label}
      </dt>
      <dd className="text-right [font-family:var(--demo-body)] text-[1.05rem] text-[var(--d-ink)]">
        {value}
      </dd>
    </div>
  );
}

export function ProjectDetail({
  content,
  project,
  areaValue,
}: {
  content: AtelierContent["detail"];
  project: Project;
  areaValue: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const count = project.gallery.length;

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % count)),
    [count],
  );
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + count) % count)),
    [count],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, next, prev]);

  return (
    <section
      id="project"
      className="relative border-t border-[var(--d-line)] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[92rem]">
        <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.4em] text-[var(--d-ink-faint)]">
          {content.eyebrow}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[1.35fr_1fr]">
          {/* left: hero image + description */}
          <div>
              <motion.button
                key={project.id}
                type="button"
                onClick={() => setLightbox(0)}
                aria-label={content.openGalleryLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="group relative block aspect-[4/3] w-full overflow-hidden"
              >
                <Image
                  src={unsplash(project.gallery[0].id, 1400)}
                  alt={project.gallery[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  style={{ filter: "grayscale(1) contrast(1.04)" }}
                  priority={false}
                />
                <span
                  aria-hidden
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--d-bg)] bg-[rgba(26,26,26,0.35)] text-[var(--d-bg)] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" strokeWidth={1.25} />
                </span>
              </motion.button>

              <motion.div
                key={`${project.id}-copy`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <div className="mt-8 flex items-baseline gap-4">
                  <span className="[font-family:var(--demo-display)] text-[clamp(1.1rem,2vw,1.6rem)] font-medium tabular-nums text-[var(--d-ink-faint)]">
                    {project.index}
                  </span>
                  <h3 className="[font-family:var(--demo-display)] text-[clamp(1.8rem,4vw,3rem)] font-medium leading-none tracking-[-0.02em] text-[var(--d-ink)]">
                    {project.name}
                  </h3>
                </div>
                {project.description.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--d-ink-soft)] [font-family:var(--demo-body)]"
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
          </div>

          {/* right: facts + thumbnails */}
          <div className="lg:pt-2">
            <p className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
              {content.factsLabel}
            </p>
            <dl className="mt-4 border-t border-[var(--d-line-strong)]">
              <Fact label={content.siteLabel} value={project.location} />
              <Fact label={content.areaLabel} value={`${areaValue} m²`} />
              <Fact label={content.yearLabel} value={project.year} />
              <Fact label={content.statusLabel} value={project.status} />
            </dl>

            <p className="mt-10 [font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[var(--d-ink-faint)]">
              {content.galleryLabel}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {project.gallery.map((img, i) => (
                <button
                  key={img.id + i}
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`${content.openGalleryLabel} — ${i + 1}`}
                  className="group relative aspect-square overflow-hidden"
                >
                  <Image
                    src={unsplash(img.id, 500)}
                    alt={img.alt}
                    fill
                    sizes="18vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: "grayscale(1) contrast(1.04)" }}
                  />
                  <span className="absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-[var(--d-ink)]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9000] flex flex-col"
            style={{ backgroundColor: "rgba(15,14,11,0.96)" }}
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <span className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] text-[#E9E5DC]">
                {project.name}
              </span>
              <span className="flex items-center gap-6">
                <span className="[font-family:var(--demo-display)] text-[10px] uppercase tracking-[0.3em] tabular-nums text-[#9B968B]">
                  {lightbox + 1} {content.counterOf} {count}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label={content.closeLabel}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3a382f] text-[#E9E5DC] transition-colors hover:bg-[#E9E5DC] hover:text-[#0F0E0B]"
                >
                  <X className="h-5 w-5" strokeWidth={1.25} />
                </button>
              </span>
            </div>

            <div className="relative flex-1 px-4 pb-6 sm:px-16">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={unsplash(project.gallery[lightbox].id, 1800)}
                  alt={project.gallery[lightbox].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  style={{ filter: "grayscale(1) contrast(1.04)" }}
                />
              </motion.div>

              <button
                type="button"
                onClick={prev}
                aria-label={content.prevLabel}
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#3a382f] text-[#E9E5DC] transition-colors hover:bg-[#E9E5DC] hover:text-[#0F0E0B] sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={content.nextLabel}
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#3a382f] text-[#E9E5DC] transition-colors hover:bg-[#E9E5DC] hover:text-[#0F0E0B] sm:right-4"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>

            <p className="px-5 pb-6 text-center italic [font-family:var(--demo-body)] text-sm text-[#9B968B] sm:px-8">
              {project.gallery[lightbox].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
