"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";

/**
 * A struck coin, turned out of CSS.
 *
 * Two faces at ±half thickness plus a reeded rim assembled from `SEGMENTS`
 * tangential strips: `rotateZ(θ) translateY(-r) rotateX(90deg)` places each
 * strip flat against the cylinder, so the edge is genuinely there when the coin
 * turns side-on instead of vanishing the way a two-plane fake does.
 *
 * It sits on the crypto screen doing exactly what a coin on a counter does:
 * turning slowly, catching the light. Reduced motion holds it face-on.
 */

const SEGMENTS = 40;
/** Face radius and thickness in px; the rim maths is derived from both. */
const R = 62;
const THICK = 13;
/** Arc length per strip, rounded up so neighbours overlap and leave no seam. */
const SEG_W = Math.ceil((2 * Math.PI * R) / SEGMENTS) + 2;

export function Coin({ label, className }: { label: string; className?: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className={className} role="img" aria-label={label}>
      <div className="grid h-full w-full place-items-center [perspective:900px]">
        <motion.div
          className="relative"
          style={{ width: R * 2, height: R * 2, transformStyle: "preserve-3d" }}
          initial={false}
          animate={reduced ? { rotateY: 0 } : { rotateY: 360 }}
          transition={
            reduced ? undefined : { duration: 11, repeat: Infinity, ease: "linear" }
          }
        >
          {/* Obverse */}
          <CoinFace z={THICK / 2}>
            <span className="[font-family:var(--demo-display)] text-[3.2rem] leading-none text-[#7A4E0B] [text-shadow:0_1px_0_rgba(255,236,190,0.75),0_-1px_1px_rgba(90,54,4,0.6)]">
              ₿
            </span>
          </CoinFace>

          {/* Reverse — a milled ring rather than a second glyph, so the coin
              reads as struck on both sides without repeating itself. */}
          <CoinFace z={THICK / 2} flipped>
            <span
              aria-hidden
              className="h-[62%] w-[62%] rounded-full border-2 border-[#8A5A10]/45"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(from 0deg, rgba(122,78,11,0.28) 0deg 4deg, transparent 4deg 8deg)",
              }}
            />
          </CoinFace>

          {/* Reeded rim */}
          {Array.from({ length: SEGMENTS }, (_, i) => {
            const angle = (360 / SEGMENTS) * i;
            return (
              <span
                key={i}
                aria-hidden
                className="absolute left-1/2 top-1/2"
                style={{
                  width: SEG_W,
                  height: THICK,
                  marginLeft: -SEG_W / 2,
                  marginTop: -THICK / 2,
                  transform: `rotateZ(${angle}deg) translateY(-${R}px) rotateX(90deg)`,
                  backgroundImage:
                    i % 2 === 0
                      ? "linear-gradient(180deg, #F2C978, #B27C1E 55%, #8A5A10)"
                      : "linear-gradient(180deg, #E0B45E, #9C6A16 55%, #79490B)",
                }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Contact shadow, breathing with the turn. */}
      <motion.span
        aria-hidden
        className="mx-auto -mt-3 block h-4 w-24 rounded-[100%] bg-black/55 blur-md"
        initial={false}
        animate={reduced ? { scaleX: 1, opacity: 0.55 } : { scaleX: [1, 0.55, 1], opacity: [0.55, 0.3, 0.55] }}
        transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function CoinFace({
  z,
  flipped,
  children,
}: {
  z: number;
  flipped?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className="absolute inset-0 grid place-items-center overflow-hidden rounded-full [backface-visibility:hidden]"
      style={{
        transform: `${flipped ? "rotateY(180deg) " : ""}translateZ(${z}px)`,
        backgroundImage:
          "radial-gradient(circle at 32% 26%, #FCE6B0 0%, #E8A13D 34%, #B4761C 66%, #7A4E0B 100%)",
        boxShadow: "inset 0 0 0 4px rgba(122,78,11,0.35), inset 0 -8px 18px rgba(90,54,4,0.45)",
      }}
    >
      {children}
      {/* Struck relief: a hard highlight arc across the upper left. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 26%, transparent 46%)",
        }}
      />
    </span>
  );
}
