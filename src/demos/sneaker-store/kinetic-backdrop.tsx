"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";

/**
 * The drop's soundsystem, drawn behind the hero.
 *
 * Four things on four different clocks: a conic wash turning slowly, bass
 * pulses expanding out of the centre on a stagger, a reeded ring counter-
 * rotating against them, and two light streaks crossing the frame. Nothing
 * here is a shape floating in space — it is a rig, and it reads as one.
 *
 * All of it is composited transforms and opacity, so it animates off the main
 * thread; reduced motion leaves the rig posed and silent.
 */

/** Bass pulses, staggered across one shared 3.6s bar. */
const PULSES = [0, 0.9, 1.8, 2.7];

export function KineticBackdrop({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div aria-hidden className={className}>
      {/* Conic wash */}
      <motion.span
        className="absolute inset-[12%] rounded-full opacity-55 blur-[70px]"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, var(--d-accent), var(--d-accent-2), var(--d-volt) 62%, var(--d-accent))",
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={reduced ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {/* Bass pulses */}
        {PULSES.map((delay) => (
          <motion.circle
            key={delay}
            cx="200"
            cy="200"
            r="80"
            fill="none"
            stroke="var(--d-accent)"
            strokeWidth="1.5"
            style={{ transformOrigin: "200px 200px" }}
            initial={reduced ? { scale: 1, opacity: 0.25 } : { scale: 0.25, opacity: 0 }}
            animate={reduced ? undefined : { scale: [0.25, 2.1], opacity: [0, 0.5, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 3.6, delay, repeat: Infinity, ease: "easeOut", times: [0, 0.25, 1] }
            }
          />
        ))}

        {/* Reeded ring, counter-rotating against the wash */}
        <motion.circle
          cx="200"
          cy="200"
          r="148"
          fill="none"
          stroke="var(--d-volt)"
          strokeWidth="2"
          strokeDasharray="3 13"
          opacity="0.5"
          style={{ transformOrigin: "200px 200px" }}
          animate={reduced ? undefined : { rotate: -360 }}
          transition={reduced ? undefined : { duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="176"
          fill="none"
          stroke="var(--d-accent-2)"
          strokeWidth="1"
          strokeDasharray="40 26"
          opacity="0.45"
          style={{ transformOrigin: "200px 200px" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 44, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Light streaks crossing the rig */}
      {!reduced &&
        [0, 2.6].map((delay) => (
          <motion.span
            key={delay}
            className="absolute left-0 h-px w-full origin-left"
            style={{
              top: delay === 0 ? "34%" : "68%",
              rotate: delay === 0 ? "-18deg" : "12deg",
              backgroundImage:
                "linear-gradient(90deg, transparent, var(--d-volt), var(--d-accent), transparent)",
            }}
            initial={{ scaleX: 0, x: "-30%", opacity: 0 }}
            animate={{ scaleX: [0, 1, 0], x: ["-30%", "20%", "70%"], opacity: [0, 0.9, 0] }}
            transition={{ duration: 2.2, delay, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}
