"use client";

import { useEffect, useRef } from "react";

/**
 * Rotating wireframe icosahedron rendered on a 2D canvas — a living version
 * of the VigApp mark. Follows the pointer with soft inertia and renders a
 * single static frame for reduced-motion users.
 */
export function WireframeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const phi = (1 + Math.sqrt(5)) / 2;
    const raw: [number, number, number][] = [
      [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
      [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
    ];
    const norm = Math.hypot(1, phi);
    const vertices = raw.map((v) => v.map((c) => c / norm) as [number, number, number]);

    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const d = Math.hypot(
          vertices[i][0] - vertices[j][0],
          vertices[i][1] - vertices[j][1],
          vertices[i][2] - vertices[j][2],
        );
        if (d < 1.2) edges.push([i, j]);
      }
    }

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.9;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.9;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const isDark = () => document.documentElement.classList.contains("dark");

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.34;
      const cx = width / 2;
      const cy = height / 2;

      pointerX += (targetX - pointerX) * 0.04;
      pointerY += (targetY - pointerY) * 0.04;

      const rx = t * 0.00012 + pointerY;
      const ry = t * 0.00017 + pointerX;

      const projected = vertices.map(([x, y, z]) => {
        const y1 = y * Math.cos(rx) - z * Math.sin(rx);
        const z1 = y * Math.sin(rx) + z * Math.cos(rx);
        const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
        const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
        const depth = 3 / (3 + z2);
        return { x: cx + x2 * scale * depth, y: cy + y1 * scale * depth, z: z2 };
      });

      const stroke = isDark() ? "245, 245, 245" : "10, 10, 10";
      for (const [a, b] of edges) {
        const za = (projected[a].z + projected[b].z) / 2;
        ctx.beginPath();
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
        ctx.strokeStyle = `rgba(${stroke}, ${0.08 + (1 - (za + 1) / 2) * 0.22})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${stroke}, ${0.15 + (1 - (p.z + 1) / 2) * 0.4})`;
        ctx.fill();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    if (reduced) {
      draw(4000);
    } else {
      const loop = (t: number) => {
        draw(t);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
