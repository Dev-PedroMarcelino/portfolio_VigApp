"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredDemos } from "@/lib/demos";
import { DemoCard } from "@/components/work/demo-card";
import { Reveal } from "@/components/fx/reveal";

/**
 * Scroll-storytelling rail: the section pins while featured demos travel
 * horizontally. Falls back to native swipe on touch layouts.
 */
export function Showcase() {
  const t = useTranslations("home.showcase");
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!railRef.current) return;
      setDistance(
        Math.max(0, railRef.current.scrollWidth - window.innerWidth + 96),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const header = (
    <div className="mx-auto max-w-7xl px-6">
      <Reveal>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
          {t("kicker")}
        </p>
      </Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/work"
            className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.8} />
          </Link>
        </Reveal>
      </div>
      <Reveal delay={0.12}>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {t("subtitle")}
        </p>
      </Reveal>
    </div>
  );

  return (
    <section className="py-24 md:py-0">
      {/* Touch / small screens: native snap rail */}
      <div className="md:hidden">
        {header}
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none]">
          {featuredDemos.map((demo) => (
            <DemoCard
              key={demo.slug}
              demo={demo}
              className="w-[78vw] max-w-sm shrink-0 snap-center"
            />
          ))}
        </div>
      </div>

      {/* Desktop: pinned horizontal travel */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${Math.max(220, featuredDemos.length * 26)}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10">
          {header}
          <motion.div
            ref={railRef}
            style={{ x }}
            className="mt-12 flex w-max gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
          >
            {featuredDemos.map((demo) => (
              <DemoCard key={demo.slug} demo={demo} className="w-[26rem] shrink-0" />
            ))}
            <Link
              href="/work"
              data-cursor={t("viewAll")}
              className="group flex w-[26rem] shrink-0 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-line text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">{t("viewAll")}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
