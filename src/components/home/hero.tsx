"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/fx/split-text";
import { Magnetic } from "@/components/fx/magnetic";
import { WireframeCanvas } from "./wireframe-canvas";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="noise relative flex min-h-svh flex-col justify-center overflow-hidden">
      <WireframeCanvas className="absolute right-[-10%] top-1/2 h-[130vmin] w-[130vmin] -translate-y-1/2 opacity-70 md:right-[-4%]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_45%,transparent_30%,var(--background)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-muted"
        >
          <span className="h-px w-10 bg-foreground/40" aria-hidden />
          {t("kicker")}
        </motion.p>

        <h1 className="max-w-5xl font-display text-[clamp(2.8rem,8.5vw,7.5rem)] font-semibold leading-[0.98] tracking-tight">
          <SplitText text={t("title")} delay={0.25} />
          <br />
          <span className="font-serif italic font-normal text-muted">
            <SplitText text={t("titleAccent")} delay={0.5} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link
              href="/work"
              data-cursor={t("ctaPrimary")}
              className="group flex items-center gap-2 rounded-full bg-invert px-7 py-3.5 text-sm font-medium text-invert-foreground"
            >
              {t("ctaPrimary")}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:bg-subtle"
            >
              {t("ctaSecondary")}
            </Link>
          </Magnetic>
          <span className="ml-2 hidden font-mono text-xs uppercase tracking-widest text-muted sm:inline">
            {t("badge")}
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted md:left-10"
      >
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={1.5} />
        {t("scroll")}
      </motion.div>
    </section>
  );
}
