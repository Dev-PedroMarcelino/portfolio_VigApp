"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { PizzeriaContent } from "./content";
import { Eyebrow, FlourOverlay, Reveal } from "./ui";

export function StoriaSection({ content }: { content: PizzeriaContent["story"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ovenY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const tablesY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <section
      ref={sectionRef}
      id="storia"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--d-char)] py-20 text-[#F1E4CC] lg:py-28"
    >
      <FlourOverlay opacity={0.07} blend="screen" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <motion.div
              className="absolute inset-x-0 -inset-y-[10%]"
              style={{ y: reduce ? 0 : ovenY }}
            >
              <Image
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80"
                alt={content.ovenAlt}
                fill
                sizes="(min-width: 1024px) 480px, 92vw"
                className="object-cover"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(200deg,rgba(193,39,45,0.18),transparent_45%,rgba(32,18,9,0.55))]"
            />
          </div>
          <motion.div
            className="absolute -bottom-8 -right-2 w-40 rotate-3 overflow-hidden rounded-2xl border-4 border-[var(--d-char)] shadow-[0_24px_48px_rgba(0,0,0,0.45)] sm:-right-6 sm:w-52"
            style={{ y: reduce ? 0 : tablesY }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80"
                alt={content.tablesAlt}
                fill
                sizes="208px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[rgba(193,39,45,0.12)] mix-blend-multiply"
              />
            </div>
          </motion.div>
        </div>

        <div className="pt-2 lg:pt-6">
          <Reveal>
            <Eyebrow tone="cream">{content.eyebrow}</Eyebrow>
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
              {content.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[#CBB795]">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="mt-8 border-l-2 border-[var(--d-red)] pl-6">
              <blockquote className="[font-family:var(--demo-display)] text-xl italic leading-snug text-[#F1E4CC] sm:text-2xl">
                {content.quote}
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9A855F]">
                {content.quoteAttribution}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[rgba(241,228,204,0.16)] pt-8">
              {content.stats.map((stat) => (
                <div key={stat.value} className="flex flex-col">
                  <dt className="order-2 mt-1.5 text-[11px] leading-snug text-[#9A855F]">
                    {stat.label}
                  </dt>
                  <dd className="order-1 [font-family:var(--demo-display)] text-3xl font-semibold italic text-[var(--d-red)] sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
