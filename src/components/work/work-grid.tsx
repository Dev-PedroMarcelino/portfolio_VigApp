"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { demoCategories, demos, type DemoCategory } from "@/lib/demos";
import { DemoCard } from "./demo-card";
import { cn } from "@/lib/utils";

export function WorkGrid({ initialCategory }: { initialCategory?: string }) {
  const t = useTranslations("work");
  const tc = useTranslations("categories");
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

      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((demo) => (
            <motion.li
              key={demo.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.2, 1] }}
            >
              <DemoCard demo={demo} className="h-full" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
