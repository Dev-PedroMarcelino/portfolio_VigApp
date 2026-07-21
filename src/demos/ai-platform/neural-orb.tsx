"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Canvas particle orb: points distributed on a sphere via a Fibonacci
 * lattice, rotated around the Y axis and projected to 2D. Colours are drawn
 * from the violet palette. When reduced motion is requested the sphere is
 * painted once as a still frame instead of animating.
 */
export function NeuralOrb({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 520;
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));
    // Deterministic points on the unit sphere.
    const points = Array.from({ length: COUNT }, (_, i) => {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GOLDEN * i;
      return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
    });

    let raf = 0;
    let angle = 0;
    let dpr = 1;
    let size = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.max(1, rect.width);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    };

    const draw = () => {
      const cx = (size * dpr) / 2;
      const cy = (size * dpr) / 2;
      const R = size * dpr * 0.4;
      ctx.clearRect(0, 0, size * dpr, size * dpr);

      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      // Soft violet core.
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3);
      core.addColorStop(0, "rgba(167,139,250,0.34)");
      core.addColorStop(0.45, "rgba(124,58,237,0.14)");
      core.addColorStop(1, "rgba(124,58,237,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      const projected = points
        .map((p) => {
          const x = p.x * cos - p.z * sin;
          const z = p.x * sin + p.z * cos;
          return { x, y: p.y, z };
        })
        .sort((a, b) => a.z - b.z);

      for (const p of projected) {
        const depth = (p.z + 1) / 2; // 0 back -> 1 front
        const px = cx + p.x * R;
        const py = cy + p.y * R;
        const r = (0.6 + depth * 1.7) * dpr;
        const alpha = 0.15 + depth * 0.7;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle =
          depth > 0.82
            ? `rgba(196,181,253,${alpha})`
            : `rgba(167,139,250,${alpha})`;
        ctx.fill();
      }
    };

    resize();
    draw();

    if (!reduce) {
      const loop = () => {
        angle += 0.0032;
        draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
