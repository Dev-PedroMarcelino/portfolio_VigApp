"use client";

import dynamic from "next/dynamic";
import { useSceneActive } from "@/components/three/use-scene-active";

/**
 * Lazy-mounts the forged-wheel <Canvas> (client-only, no SSR) inside the
 * configurator preview and feeds it the chosen paint colour. The wrapper is
 * decorative (aria-hidden) — the real, accessible controls, labels and prices
 * live in the configurator DOM; this 3D object only reflects the selection.
 */
const WheelScene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <div aria-hidden />,
});

export function WheelStage({ accentColor }: { accentColor: string }) {
  const { ref, active } = useSceneActive<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-[240px] w-full sm:h-[300px]"
      style={{ touchAction: "pan-y" }}
    >
      <WheelScene accentColor={accentColor} active={active} />
    </div>
  );
}
