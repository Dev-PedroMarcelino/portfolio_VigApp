"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";

/**
 * Our own glTF stage — the model is rendered by the site itself: our lighting,
 * our framing, our controls, a transparent background so the section's own
 * surface shows through, and no third-party interface anywhere.
 *
 * Only reached for models we self-host under `public/models`. Loaded through
 * `next/dynamic` so three.js stays out of the initial bundle.
 */
export default function LocalModelViewer({
  url,
  accent,
  autospin,
  framing = "object",
  active,
  onReady,
  onLost,
}: {
  /** Path to a .glb under `public/`, e.g. "/models/porsche-911.glb". */
  url: string;
  /** Demo accent, used as a rim light so the model sits in the palette. */
  accent: string;
  /** Slow turntable; the caller already resolved reduced-motion. */
  autospin?: boolean;
  /** "interior" pulls the camera in tight for room scans. */
  framing?: "object" | "interior";
  /** Park the render loop while the frame is off screen. */
  active: boolean;
  onReady: () => void;
  /** The GPU gave up (context lost) — the caller should show the poster. */
  onLost?: () => void;
}) {
  /* Phones shade every pixel of a retina buffer at full DPR, which is where a
     mid-range device actually falls over — not at the triangle count. */
  const maxDpr = useMemo(
    () => (window.matchMedia?.("(pointer: coarse)").matches ? 1.5 : 2),
    [],
  );

  return (
    <Canvas
      dpr={[1, maxDpr]}
      frameloop={active ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: framing === "interior" ? 62 : 38, position: [2.6, 1.5, 3.4] }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        /* A weak GPU that runs out of memory kills the context instead of
           throwing. Catch it so the section degrades to its poster. */
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            onLost?.();
          },
          { once: true },
        );
      }}
      className="!absolute !inset-0"
    >
      {/* Three-point studio rig, plus an accent rim from behind. */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} />
      <directionalLight position={[-5, 2, -3]} intensity={0.45} />
      <directionalLight position={[0, 3, -6]} intensity={0.9} color={accent} />

      {/* Metals and clearcoats render black without something to reflect. This
          builds the reflection probe from softboxes in the scene itself — baked
          once, and with no HDRI fetched from anyone else's CDN. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.6} position={[0, 3.5, 2.5]} scale={[9, 4, 1]} />
        <Lightformer form="rect" intensity={1.1} position={[-4.5, 1, -2]} scale={[6, 3, 1]} color={accent} />
        <Lightformer form="rect" intensity={0.9} position={[4.5, 0.5, -3]} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={1.4} position={[0, -2.5, 1.5]} scale={4} />
      </Environment>

      <Suspense fallback={null}>
        {/* Bounds frames whatever arrives; Center puts the pivot in the middle
            of the model so the turntable does not swing it around. */}
        <Bounds fit clip observe margin={framing === "interior" ? 0.7 : 1.55}>
          <Center>
            <Model url={url} onReady={onReady} />
          </Center>
        </Bounds>
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        /* Wheel stays with the page — the viewport never hijacks scrolling. */
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={autospin}
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI * 0.12}
        maxPolarAngle={Math.PI * 0.88}
      />
    </Canvas>
  );
}

function Model({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url);

  /* Suspense has resolved by the time this runs, so the poster can fade out. */
  useEffect(() => onReady(), [onReady]);

  return <primitive object={scene} />;
}
