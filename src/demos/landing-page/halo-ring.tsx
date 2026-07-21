"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The HALO ring, drawn entirely in SVG so it renders crisp at any size and
 * needs no photography. A top-down band with a metallic highlight sweep and an
 * inner sensor array that glows in the ring's face colour. Reused by the hero
 * and the pricing finish preview.
 */
export function HaloRing({
  band = "#1C1F26",
  face = "#7EE7C7",
  glow = true,
  spin = true,
  className,
}: {
  band?: string;
  face?: string;
  glow?: boolean;
  spin?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const animate = spin && !reduce;

  // Three inner sensor bumps, sitting on the lower inner wall of the band.
  const sensors = [-32, 0, 32].map((deg) => {
    const rad = ((deg + 90) * Math.PI) / 180;
    const r = 44;
    return { x: 100 + r * Math.cos(rad), y: 100 + r * Math.sin(rad) };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="presentation"
      aria-hidden
    >
      <defs>
        <radialGradient id="halo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={face} stopOpacity="0.55" />
          <stop offset="45%" stopColor={face} stopOpacity="0.18" />
          <stop offset="100%" stopColor={face} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="halo-band" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={band} stopOpacity="0.55" />
          <stop offset="42%" stopColor={band} />
          <stop offset="100%" stopColor={band} stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="halo-face" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor={face} stopOpacity="0.22" />
          <stop offset="100%" stopColor={face} stopOpacity="0.03" />
        </radialGradient>
        <filter id="halo-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {glow ? (
        <ellipse cx="100" cy="104" rx="96" ry="96" fill="url(#halo-glow)" />
      ) : null}

      {/* Inner face wash */}
      <circle cx="100" cy="100" r="52" fill="url(#halo-face)" />
      <circle cx="100" cy="100" r="52" fill="none" stroke={face} strokeOpacity="0.28" strokeWidth="0.8" />

      {/* Main band */}
      <circle cx="100" cy="100" r="70" fill="none" stroke="url(#halo-band)" strokeWidth="30" />
      {/* Outer + inner edge definition */}
      <circle cx="100" cy="100" r="85" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="1.4" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="#000000" strokeOpacity="0.4" strokeWidth="1.4" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="0.8" />

      {/* Rotating metallic highlight sweep */}
      <motion.g
        style={{ transformOrigin: "100px 100px" }}
        animate={animate ? { rotate: 360 } : undefined}
        transition={animate ? { duration: 14, repeat: Infinity, ease: "linear" } : undefined}
      >
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.5"
          strokeWidth="30"
          strokeLinecap="round"
          strokeDasharray="30 410"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.22"
          strokeWidth="30"
          strokeLinecap="round"
          strokeDasharray="14 200"
          strokeDashoffset="-220"
        />
      </motion.g>

      {/* Sensor array */}
      {sensors.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="6" fill={face} fillOpacity="0.9" filter="url(#halo-soft)" />
          <circle cx={s.x} cy={s.y} r="3.4" fill={face} />
          <circle cx={s.x} cy={s.y} r="1.3" fill="#0E0E12" fillOpacity="0.55" />
        </g>
      ))}

      {/* Pulsing central emitter */}
      <motion.circle
        cx="100"
        cy="100"
        r="4"
        fill={face}
        animate={animate ? { opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] } : undefined}
        transition={animate ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{ transformOrigin: "100px 100px" }}
      />
    </svg>
  );
}
