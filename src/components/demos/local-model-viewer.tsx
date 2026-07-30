"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bounds, Center, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import type { Group } from "three";

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
  scrollProgress,
  spinTurns,
  introSpin,
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
  /**
   * Live 0..1 position of the frame through the viewport. When given, the page
   * scroll drives the rotation and dragging is switched off.
   */
  scrollProgress?: MutableRefObject<number>;
  /** Full turns across one pass of the frame through the viewport. */
  spinTurns?: number;
  /** Spin the model in on arrival, easing out into the scroll position. */
  introSpin?: boolean;
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
      <FrameGate active={active} />

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
            of the model so the turntable does not swing it around.

            Deliberately not `observe`: a rotating model changes its own
            bounding box every frame, and a watching Bounds answers by dollying
            the camera in and out — the model appears to breathe instead of
            turn. Fit once, then leave the camera alone. */}
        <Bounds fit clip margin={framing === "interior" ? 0.7 : 1.55}>
          <ScrollSpin
            progress={scrollProgress}
            turns={spinTurns}
            intro={introSpin}
            /* Without a scroll to follow, the object turns on its own. */
            idleSpin={autospin && !scrollProgress ? 0.22 : 0}
            /* Rooms are architecture — they stay put; objects drift. */
            float={framing !== "interior"}
          >
            <Center>
              <Model url={url} onReady={onReady} />
            </Center>
          </ScrollSpin>
        </Bounds>
      </Suspense>

      {/* No controls at all: nothing to grab, nothing to click, no cursor
          change inviting it. The object simply lives on the page — turning
          with the scroll or on its own — and the wheel always belongs to the
          document. */}
    </Canvas>
  );
}

/**
 * Owns the render loop from inside the canvas.
 *
 * The scene renders on demand, and with no orbit controls there is nothing
 * asking for frames — a scroll-driven or drifting model would sit frozen.
 * Rather than trust the `frameloop` prop (which only applies as the Canvas
 * mounts), this drives frames explicitly while the frame is on screen, and
 * stops asking the moment it leaves. Off-screen viewports cost nothing.
 */
function FrameGate({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const tick = () => {
      invalidate();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, invalidate]);

  return null;
}

function Model({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url);

  /* Suspense has resolved by the time this runs, so the poster can fade out. */
  useEffect(() => onReady(), [onReady]);

  return <primitive object={scene} />;
}

/**
 * Turns the page's own scroll into rotation: the model reads as part of the
 * document rather than as a widget you have to discover and drag. `progress`
 * is written by the parent on scroll (0 when the frame enters the viewport, 1
 * when it leaves) and read here per frame, so scrolling never re-renders React.
 *
 * With no `progress` ref the object falls back to a slow turntable.
 */
function ScrollSpin({
  progress,
  turns = 1,
  intro,
  idleSpin = 0,
  float,
  children,
}: {
  progress?: MutableRefObject<number>;
  turns?: number;
  intro?: boolean;
  /** Turntable speed in radians per second when the scroll is not driving. */
  idleSpin?: number;
  /** Idle drift, so a still object does not look pinned to the layout. */
  float?: boolean;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);
  /** Extra turns folded in at the start, easing out into the scroll position. */
  const introLeft = useRef(intro ? 1 : 0);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    /* Nothing anchors the object to the page but this drift: a slow rise and
       fall, plus a hair of tilt, so it reads as suspended rather than parked. */
    if (float) {
      const t = state.clock.elapsedTime;
      node.position.y = Math.sin(t * 0.6) * 0.04;
      node.rotation.z = Math.sin(t * 0.45) * 0.02;
      node.rotation.x = Math.sin(t * 0.35) * 0.015;
    }

    if (!progress) {
      node.rotation.y += idleSpin * delta;
      return;
    }

    /* Centred in the viewport reads as the model's neutral pose. */
    const target = (progress.current - 0.5) * turns * Math.PI * 2;

    if (introLeft.current > 0) {
      introLeft.current = Math.max(0, introLeft.current - delta / 1.3);
      /* easeOutCubic on the remaining spin, so it lands instead of stopping. */
      const eased = introLeft.current ** 3;
      node.rotation.y = target + eased * Math.PI * 2 * 1.5;
      return;
    }

    /* Chase the scroll position instead of snapping to it: a flick of the
       wheel becomes a glide, and a trackpad's jitter disappears. */
    node.rotation.y += (target - node.rotation.y) * Math.min(1, delta * 6);
  });

  return <group ref={group}>{children}</group>;
}
