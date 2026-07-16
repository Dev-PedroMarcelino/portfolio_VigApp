"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Global dot + ring cursor. Only activates on precise pointers and respects
 * reduced motion. The ring inflates over links, buttons and [data-cursor]
 * targets; elements can opt into a label via data-cursor="View".
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-native");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor]",
      );
      setHovering(Boolean(target));
      setHoverLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("cursor-none-native");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/60 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hoverLabel ? 72 : hovering ? 44 : 28,
          height: hoverLabel ? 72 : hovering ? 44 : 28,
          scale: pressed ? 0.8 : 1,
          backgroundColor: hoverLabel ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        {hoverLabel ? (
          <span className="text-[10px] font-medium uppercase tracking-widest text-black">
            {hoverLabel}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
