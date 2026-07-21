"use client";

import dynamic from "next/dynamic";
import { useSceneActive } from "@/components/three/use-scene-active";

/**
 * Lazy-mounts the WebGL kinetic drop stage. The Three.js Canvas is imported
 * with ssr:false so it never runs on the server, and `useSceneActive` parks the
 * render loop (frameloop="demand") whenever the rig is off-screen or the user
 * prefers reduced motion — in which case the shapes stay posed but do not spin.
 */
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <div aria-hidden />,
});

export function KineticStage({ className }: { className?: string }) {
  const { ref, active } = useSceneActive<HTMLDivElement>();

  return (
    <div ref={ref} aria-hidden className={className}>
      <Scene active={active} />
    </div>
  );
}
