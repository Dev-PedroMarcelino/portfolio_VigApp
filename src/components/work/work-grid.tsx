"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { useTranslations } from "next-intl";
import { demoCategories, demos, type DemoCategory } from "@/lib/demos";
import { DemoCard } from "./demo-card";
import { cn } from "@/lib/utils";

export function WorkGrid({ initialCategory }: { initialCategory?: string }) {
  const t = useTranslations("work");
  const tc = useTranslations("categories");
  const reduce = useReducedMotion();
  const [active, setActive] = useState<DemoCategory | "all">(
    demoCategories.includes(initialCategory as DemoCategory)
      ? (initialCategory as DemoCategory)
      : "all",
  );

  const visible = useMemo(
    () => (active === "all" ? demos : demos.filter((d) => d.category === active)),
    [active],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label={t("kicker")}
        className="flex flex-wrap gap-2"
      >
        {(["all", ...demoCategories] as const).map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={active === category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
              active === category
                ? "border-transparent bg-invert text-invert-foreground"
                : "border-line text-muted hover:bg-subtle hover:text-foreground",
            )}
          >
            {category === "all" ? t("all") : tc(category)}
          </button>
        ))}
      </div>

      {/*
        Keyed by `active` so switching filters remounts the list: React unmounts
        the previous set immediately (no exit animation to leak) and the new
        cards play their enter animation. This stays correct under
        prefers-reduced-motion, where AnimatePresence exit callbacks may never
        fire and would otherwise strand filtered-out cards in the DOM.
      */}
      <ul key={active} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((demo, i) => (
          <motion.li
            key={demo.slug}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: reduce ? 0 : Math.min(i * 0.03, 0.3),
              ease: [0.22, 0.61, 0.2, 1],
            }}
          >
            <DemoCard demo={demo} className="h-full" />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
