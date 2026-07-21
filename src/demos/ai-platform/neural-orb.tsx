"use client";

import dynamic from "next/dynamic";
import { useSceneActive } from "@/components/three/use-scene-active";

/**
 * Neural orb wrapper. Lazily mounts the real-time Three.js scene client-side
 * only (next/dynamic, ssr:false) so it never blocks first paint or hydrates.
 * `useSceneActive` parks the render loop when the orb is off-screen and paints
 * a still composed frame under prefers-reduced-motion. Decorative: aria-hidden.
 */
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <div aria-hidden />,
});

export function NeuralOrb({ className = "" }: { className?: string }) {
  const { ref, active } = useSceneActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
      style={{ width: "100%", height: "100%" }}
    >
      <Scene active={active} />
    </div>
  );
}
