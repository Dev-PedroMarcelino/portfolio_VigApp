"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";

/**
 * The Zela Metal card, built out of the page rather than imported into it.
 *
 * It is a real six-sided object in CSS 3D — two faces plus four edges — turned
 * by the page's own scroll, so the visitor sees the front, the milled edge and
 * the back without ever being asked to drag anything. The brushed finish is a
 * fine repeating gradient under a broad one, the engraving is `background-clip`
 * text, and a specular band travels across the metal on its own clock.
 *
 * Reduced motion parks it at a three-quarter view, engraving forward.
 */

/** Card thickness in px at the rendered size — enough to read as milled metal. */
const EDGE = 7;

/** Reeding runs across the short edges and along the long ones. */
const V_GRAIN = "repeating-linear-gradient(0deg, #D6DED8 0px, #7C867E 1px, #C3CCC5 2px, #59635B 3px)";
const H_GRAIN = "repeating-linear-gradient(90deg, #D6DED8 0px, #7C867E 1px, #C3CCC5 2px, #59635B 3px)";

/**
 * The four side walls. Each is hinged on its own edge of the card outline
 * (`transform-origin`), folded out a quarter turn, then slid back half a
 * thickness *along its own rotated axis* so the wall straddles the two faces
 * instead of standing proud of the front one. The follow-up translate is
 * deliberately not `translateZ`: after the fold, the wall's local depth axis is
 * no longer the card's.
 */
const EDGES = [
  { key: "left" as const, className: "absolute inset-y-0 w-[7px]", rotate: `rotateY(-90deg) translateX(-${EDGE / 2}px)`, grain: V_GRAIN },
  { key: "right" as const, className: "absolute inset-y-0 w-[7px]", rotate: `rotateY(90deg) translateX(${EDGE / 2}px)`, grain: V_GRAIN },
  { key: "top" as const, className: "absolute inset-x-0 h-[7px]", rotate: `rotateX(90deg) translateY(-${EDGE / 2}px)`, grain: H_GRAIN },
  { key: "bottom" as const, className: "absolute inset-x-0 h-[7px]", rotate: `rotateX(-90deg) translateY(${EDGE / 2}px)`, grain: H_GRAIN },
];

export function MetalCard({
  holder,
  number,
  validLabel,
  valid,
  tier,
  className,
}: {
  /** Cardholder line, engraved. */
  holder: string;
  /** Grouped card number; only the last group is real in a demo. */
  number: string;
  validLabel: string;
  valid: string;
  /** Product line stamped on the edge of the front face, e.g. "METAL". */
  tier: string;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  /* One pass of the section through the viewport turns the card a little over
     one full revolution: front, edge, back, edge, front. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const spin = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });
  /* Front-on through the reading position, edge and back as it leaves. */
  const rotateY = useTransform(spin, [0, 1], [-120, 200]);
  /* A touch of counter-tilt as it travels, so it never reads as a flat flip. */
  const rotateX = useTransform(spin, [0, 0.5, 1], [14, -6, 12]);
  const lift = useTransform(spin, [0, 0.5, 1], [26, -14, 26]);
  /* The contact shadow widens as the card comes face-on and narrows edge-on. */
  const shadowScale = useTransform(spin, [0, 0.5, 1], [0.8, 1, 0.8]);

  const face =
    "absolute inset-0 overflow-hidden rounded-[1.1rem] [backface-visibility:hidden]";

  return (
    <div ref={ref} className={className}>
      <div className="[perspective:1400px]">
        <motion.div
          /* The reduced-motion flag only resolves after mount, by which point
             the live transform has been written imperatively. Remounting on
             the switch is the one way to be sure the parked pose replaces it
             rather than layering under it. */
          key={reduced ? "parked" : "live"}
          style={
            reduced
              ? { transform: "rotateX(12deg) rotateY(-18deg)", transformStyle: "preserve-3d" }
              : { rotateX, rotateY, y: lift, transformStyle: "preserve-3d" }
          }
          className="relative mx-auto aspect-[1.586] w-full max-w-[26rem]"
        >
          {/* ---- Front face ---- */}
          <div className={face} style={{ transform: `translateZ(${EDGE / 2}px)` }}>
            {/* Brushed steel: a broad sheen with a fine mill grain over it. */}
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(128deg, #6E7A72 0%, #C9D2CB 18%, #8C978F 34%, #4C574F 52%, #A9B4AC 68%, #5D675F 86%, #869089 100%)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(122deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
              }}
            />
            {/* Forest tint so the metal belongs to Zela and not to a stock render. */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(145deg, rgba(14,59,41,0.85) 0%, rgba(14,59,41,0.25) 45%, rgba(22,107,74,0.5) 100%)",
              }}
            />

            {/* Travelling specular band. */}
            {!reduced && (
              <motion.span
                aria-hidden
                className="absolute inset-0 mix-blend-screen"
                style={{
                  backgroundImage:
                    "linear-gradient(108deg, transparent 36%, rgba(255,255,255,0.28) 46%, rgba(232,161,61,0.38) 50%, rgba(255,255,255,0.22) 55%, transparent 64%)",
                  backgroundSize: "250% 100%",
                }}
                initial={{ backgroundPosition: "125% 0%" }}
                animate={{ backgroundPosition: "-45% 0%" }}
                transition={{ duration: 5.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              />
            )}

            <div className="relative flex h-full flex-col justify-between p-6 text-[#F3EEDF]">
              <div className="flex items-start justify-between">
                <span className="[font-family:var(--demo-display)] text-[1.35rem] leading-none tracking-tight">
                  zela
                </span>
                <span className="rounded-full border border-[#F3EEDF]/35 px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.28em] [font-family:var(--demo-mono)]">
                  {tier}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* EMV chip: gold plate with its contact pads milled in. */}
                <span
                  aria-hidden
                  className="h-8 w-11 rounded-[5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(140deg, #E8C56B 0%, #B98C2E 38%, #F0DCA0 62%, #A87C23 100%)",
                  }}
                >
                  <span
                    className="block h-full w-full opacity-45"
                    style={{
                      backgroundImage:
                        "linear-gradient(#6B4E12 1px, transparent 1px), linear-gradient(90deg, #6B4E12 1px, transparent 1px)",
                      backgroundSize: "100% 33%, 33% 100%",
                    }}
                  />
                </span>
                {/* Contactless mark, drawn rather than iconified. */}
                <span aria-hidden className="flex items-center gap-[3px] opacity-70">
                  {[8, 12, 16].map((h) => (
                    <span
                      key={h}
                      className="block w-[3px] rounded-full border-r-2 border-[#F3EEDF]"
                      style={{ height: h, borderRadius: "0 100% 100% 0" }}
                    />
                  ))}
                </span>
              </div>

              <div>
                {/* Engraved, not printed: light from above, shadow below. */}
                <p className="text-[1.02rem] tracking-[0.16em] text-transparent [font-family:var(--demo-mono)] [text-shadow:0_1px_0_rgba(255,255,255,0.35),0_-1px_0_rgba(0,0,0,0.5)] [-webkit-text-stroke:0.6px_rgba(243,238,223,0.72)]">
                  {number}
                </p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[#F3EEDF]/85 [font-family:var(--demo-mono)]">
                    {holder}
                  </p>
                  <p className="text-right text-[0.55rem] uppercase tracking-[0.16em] text-[#F3EEDF]/60 [font-family:var(--demo-mono)]">
                    {validLabel}
                    <span className="ml-2 text-[0.72rem] tracking-[0.12em] text-[#F3EEDF]/90">
                      {valid}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <span
              aria-hidden
              className="absolute inset-0 rounded-[1.1rem] ring-1 ring-inset ring-white/25"
            />
          </div>

          {/* ---- Back face ---- */}
          <div
            className={face}
            style={{ transform: `rotateY(180deg) translateZ(${EDGE / 2}px)` }}
          >
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(128deg, #5A645D 0%, #9CA79F 22%, #4A544C 48%, #838E86 74%, #525C54 100%)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{ backgroundImage: "linear-gradient(160deg, rgba(14,59,41,0.9), rgba(14,59,41,0.4))" }}
            />
            {/* Magnetic stripe */}
            <span aria-hidden className="absolute inset-x-0 top-[16%] h-[19%] bg-[#0B120F]" />
            {/* Signature panel with the CVV block at its right edge */}
            <div className="absolute inset-x-6 top-[48%] flex items-stretch">
              <span
                aria-hidden
                className="h-9 flex-1 rounded-l-[3px] bg-[#EFEADC]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(124,179,66,0.35) 0px, rgba(124,179,66,0.35) 6px, transparent 6px, transparent 12px)",
                }}
              />
              <span className="grid h-9 w-14 place-items-center rounded-r-[3px] bg-[#FFFDF7] text-[0.7rem] tracking-[0.2em] text-[#1C2B24] [font-family:var(--demo-mono)]">
                ***
              </span>
            </div>
            <p className="absolute inset-x-6 bottom-5 text-[0.5rem] leading-relaxed tracking-[0.1em] text-[#F3EEDF]/55 [font-family:var(--demo-mono)]">
              zela · sociedade de crédito direto · 00.000.000/0001-00
            </p>
            <span
              aria-hidden
              className="absolute inset-0 rounded-[1.1rem] ring-1 ring-inset ring-white/20"
            />
          </div>

          {/* ---- Milled edges: four strips folded out of the card's outline ---- */}
          {EDGES.map((e) => (
            <span
              key={e.key}
              aria-hidden
              className={e.className}
              style={{
                left: e.key === "right" ? undefined : 0,
                right: e.key === "right" ? 0 : undefined,
                top: e.key === "bottom" ? undefined : 0,
                bottom: e.key === "bottom" ? 0 : undefined,
                transform: e.rotate,
                transformOrigin: e.key,
                backgroundImage: e.grain,
              }}
            />
          ))}
        </motion.div>

        {/* Contact shadow on the forest floor, tied to the same travel. */}
        <motion.span
          aria-hidden
          style={reduced ? undefined : { scaleX: shadowScale }}
          className="mx-auto mt-10 block h-10 w-3/4 rounded-[100%] bg-black/45 blur-2xl"
        />
      </div>
    </div>
  );
}
