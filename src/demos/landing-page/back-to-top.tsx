"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const CIRC = 2 * Math.PI * 18;

export function BackToTop({ label }: { label: string }) {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const offset = useTransform(scrollYProgress, (v) => CIRC * (1 - v));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setVisible(v > 0.06));
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          aria-label={label}
          initial={reduce ? undefined : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-[8000] grid h-12 w-12 place-items-center rounded-full border border-[var(--d-line)] bg-[#0E0E12]/85 text-[var(--d-ink)] backdrop-blur-xl transition-colors hover:border-[var(--d-accent)]"
        >
          <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--d-line)" strokeWidth="2" />
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="var(--d-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              style={{ strokeDashoffset: offset }}
            />
          </svg>
          <ArrowUp className="relative h-4 w-4" strokeWidth={2} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
