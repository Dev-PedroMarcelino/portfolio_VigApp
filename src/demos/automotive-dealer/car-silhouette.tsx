"use client";

import { motion } from "framer-motion";

/**
 * A side-profile supercar rendered in pure SVG so the configurator can repaint
 * the body live to any hex without depending on photography. A metallic sheen
 * gradient sits over the chosen colour; the accent brake caliper stays red.
 */
export function CarSilhouette({ color, finish }: { color: string; finish: string }) {
  const isMatte = /matte|fosco|mate/i.test(finish);

  return (
    <svg
      viewBox="0 0 600 220"
      className="h-auto w-full"
      role="img"
      aria-label={`Stradale RS silhouette painted ${color}`}
    >
      <defs>
        <linearGradient id="apx-body-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isMatte ? 0.12 : 0.5} />
          <stop offset="34%" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="70%" stopColor="#000000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.45} />
        </linearGradient>
        <radialGradient id="apx-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="apx-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fb4d6" stopOpacity={0.85} />
          <stop offset="100%" stopColor="#0c1622" stopOpacity={0.95} />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="300" cy="196" rx="250" ry="16" fill="url(#apx-floor)" />

      {/* body — animates colour changes */}
      <motion.path
        d="M40 150
           C46 150 58 150 70 149
           C78 128 96 120 120 120
           C150 120 168 108 196 96
           C232 80 286 74 336 78
           C380 82 430 92 470 108
           C500 120 520 128 545 132
           C558 134 566 140 566 150
           C566 160 556 164 545 164
           L60 164
           C46 164 40 158 40 150 Z"
        animate={{ fill: color }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        stroke="#000000"
        strokeOpacity={0.35}
        strokeWidth={1}
      />
      {/* sheen overlay */}
      <path
        d="M40 150
           C46 150 58 150 70 149
           C78 128 96 120 120 120
           C150 120 168 108 196 96
           C232 80 286 74 336 78
           C380 82 430 92 470 108
           C500 120 520 128 545 132
           C558 134 566 140 566 150
           C566 160 556 164 545 164
           L60 164
           C46 164 40 158 40 150 Z"
        fill="url(#apx-body-sheen)"
      />

      {/* greenhouse / cabin glass */}
      <path
        d="M198 98 C232 82 284 78 330 82 C352 84 372 90 388 98 C360 100 250 100 210 100 C205 100 200 99 198 98 Z"
        fill="url(#apx-glass)"
      />

      {/* character speedline down the flank */}
      <path
        d="M120 132 C200 118 320 116 470 126"
        stroke="#000000"
        strokeOpacity={0.22}
        strokeWidth={2}
        fill="none"
      />

      {/* side intake */}
      <path d="M408 118 L452 126 L444 138 L404 132 Z" fill="#000000" fillOpacity={0.55} />

      {/* front splitter + rear diffuser hints */}
      <rect x="540" y="160" width="26" height="6" rx="2" fill="#111114" />
      <rect x="40" y="160" width="30" height="6" rx="2" fill="#111114" />

      {/* wheels */}
      {[150, 452].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={164} r={30} fill="#0b0b0d" />
          <circle cx={cx} cy={164} r={30} fill="none" stroke="#2a2a30" strokeWidth={2} />
          <circle cx={cx} cy={164} r={17} fill="#17171b" />
          {/* red brake caliper */}
          <path
            d={`M${cx - 6} ${150} a17 17 0 0 1 12 0`}
            fill="none"
            stroke="var(--d-accent)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* spokes derived from index, no randomness */}
          {[0, 1, 2, 3, 4].map((s) => {
            const a = (s / 5) * Math.PI * 2;
            return (
              <line
                key={s}
                x1={cx}
                y1={164}
                x2={cx + Math.cos(a) * 16}
                y2={164 + Math.sin(a) * 16}
                stroke="#3a3a42"
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={cx} cy={164} r={4} fill="#4a4a52" />
        </g>
      ))}

      {/* headlight */}
      <path d="M556 138 L566 142 L566 150 L552 148 Z" fill="#e9eef5" fillOpacity={0.9} />
    </svg>
  );
}
