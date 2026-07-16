"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Seconds before the first word animates. */
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

/** Splits a headline into words that rise out of an overflow mask. */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = "span",
  once = true,
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%", rotate: 4 }}
              whileInView={{ y: "0%", rotate: 0 }}
              viewport={{ once, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: delay + i * stagger,
                ease: [0.22, 0.61, 0.2, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
