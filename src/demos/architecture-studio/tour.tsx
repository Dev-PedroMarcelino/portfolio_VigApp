"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { PrumoContent } from "./content";
import { VIDEOS } from "./content";
import { Reveal } from "./ui";

/**
 * Walkthrough of a delivered house. Nothing plays until asked: an Unsplash
 * poster with a bronze play ring, then a muted loop with a quiet corner
 * pause control. User-initiated, so reduced-motion users stay in control too.
 */
export function Tour({ content }: { content: PrumoContent["tour"] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setStarted(true);
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="bg-[#16130F] py-24 text-[var(--d-bg)] sm:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-3 [font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.3em] text-[var(--d-bg)]/60">
                <span aria-hidden className="h-px w-8 bg-[var(--d-accent-soft)]" />
                {content.label}
              </p>
              <h2 className="mt-6 [font-family:var(--demo-display)] text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                {content.titleLead}{" "}
                <em className="italic text-[var(--d-accent-soft)]">{content.titleItalic}</em>
              </h2>
            </div>
            <p className="max-w-md [font-family:var(--demo-body)] text-sm leading-relaxed text-[var(--d-bg)]/70 lg:pb-2">
              {content.intro}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mt-14 overflow-hidden sm:mt-16">
            <div className="relative aspect-video w-full">
              <video
                ref={videoRef}
                src={VIDEOS.tour.src}
                poster={VIDEOS.tour.poster}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={content.videoAria}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Poster overlay + big play affordance until first play */}
              {!started && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={content.playLabel}
                  className="group absolute inset-0 z-10 block h-full w-full"
                >
                  <Image
                    src={VIDEOS.tour.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 84vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <span aria-hidden className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:bg-black/25" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="flex flex-col items-center gap-4">
                      <span className="grid h-20 w-20 place-items-center rounded-full border border-[var(--d-accent-soft)]/70 bg-black/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Play
                          className="ml-1 h-7 w-7 text-[var(--d-accent-soft)]"
                          strokeWidth={1.4}
                          fill="currentColor"
                        />
                      </span>
                      <span className="[font-family:var(--demo-mono)] text-[11px] uppercase tracking-[0.3em] text-white/85">
                        {content.playLabel}
                      </span>
                    </span>
                  </span>
                </button>
              )}

              {/* Quiet corner control once running */}
              {started && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? content.pauseLabel : content.playLabel}
                  className="absolute bottom-5 right-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:border-[var(--d-accent-soft)] hover:text-[var(--d-accent-soft)]"
                >
                  {playing ? (
                    <Pause className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  ) : (
                    <Play className="ml-0.5 h-[18px] w-[18px]" strokeWidth={1.5} />
                  )}
                </button>
              )}
            </div>
          </div>

          <p className="mt-5 [font-family:var(--demo-mono)] text-[10px] uppercase tracking-[0.26em] text-[var(--d-bg)]/50">
            {content.caption}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
