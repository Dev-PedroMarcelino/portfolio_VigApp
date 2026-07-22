"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Asterisk } from "lucide-react";
import type { MarqueeContent } from "./content";

export function BrandMarquee({ content }: { content: MarqueeContent }) {
  const reduce = useReducedMotion() ?? false;
  const row = [...content.phrases, ...content.phrases];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-[var(--d-line)] bg-[var(--d-accent)] py-4"
    >
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 24, ease: "linear", repeat: Infinity }}
      >
        {row.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-8 text-lg font-bold uppercase tracking-[0.18em] text-[#12081F] [font-family:var(--demo-display)]"
          >
            {phrase}
            <Asterisk className="h-4 w-4 text-[#12081F]/60" strokeWidth={2.4} />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
