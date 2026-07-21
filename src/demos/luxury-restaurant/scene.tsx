"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneActive } from "@/components/three/use-scene-active";

/**
 * Candlelit signature scene for the Maison Lumière hero: a barely-there field of
 * drifting golden embers (additive Points) rising over the near-black room, plus
 * one slowly-turning faceted gold form as a quiet accent. This is the slowest,
 * most restrained motion in the portfolio — a warm glow, never a spectacle.
 *
 * All geometry is primitive; all light is manual (no assets are ever fetched).
 * The render loop is gated by `useSceneActive`: off-screen or reduced-motion
 * users get a single composed still frame instead of animation.
 */

const GOLD = new THREE.Color("#C9A227");
const GOLD_BRIGHT = new THREE.Color("#E8C973");

const EMBER_COUNT = 150;
// Bounds of the drifting field, in world units (camera sits at z = 6).
const FIELD_X = 4.6;
const FIELD_Y_BOTTOM = -3.4;
const FIELD_Y_TOP = 3.4;
const FIELD_Z = 1.6;

interface EmberSeed {
  x: number;
  z: number;
  /** Vertical rise speed, units/sec — deliberately tiny. */
  rise: number;
  /** Horizontal sway amplitude and frequency. */
  swayAmp: number;
  swayFreq: number;
  phase: number;
}

function seededEmbers() {
  // Deterministic pseudo-random so SSR-free mount is stable and composed.
  let s = 0x9e3779b9;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };

  const seeds: EmberSeed[] = [];
  const positions = new Float32Array(EMBER_COUNT * 3);
  const colors = new Float32Array(EMBER_COUNT * 3);
  const tmp = new THREE.Color();

  for (let i = 0; i < EMBER_COUNT; i += 1) {
    const x = (rand() * 2 - 1) * FIELD_X;
    const y = FIELD_Y_BOTTOM + rand() * (FIELD_Y_TOP - FIELD_Y_BOTTOM);
    const z = (rand() * 2 - 1) * FIELD_Z;

    seeds.push({
      x,
      z,
      rise: 0.03 + rand() * 0.06,
      swayAmp: 0.12 + rand() * 0.28,
      swayFreq: 0.08 + rand() * 0.16,
      phase: rand() * Math.PI * 2,
    });

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Warmth varies by height: cooler gold low, brighter gold as it rises.
    tmp.copy(GOLD).lerp(GOLD_BRIGHT, rand());
    const glow = 0.55 + rand() * 0.45;
    colors[i * 3] = tmp.r * glow;
    colors[i * 3 + 1] = tmp.g * glow;
    colors[i * 3 + 2] = tmp.b * glow;
  }

  return { seeds, positions, colors };
}

function Embers({ activeRef }: { activeRef: MutableRefObject<boolean> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { seeds, positions, colors } = useMemo(seededEmbers, []);

  const texture = useMemo(() => {
    // Soft radial sprite so each ember reads as a glowing mote, not a hard dot.
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, "rgba(255,244,214,1)");
      grad.addColorStop(0.35, "rgba(232,201,115,0.6)");
      grad.addColorStop(1, "rgba(232,201,115,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!activeRef.current) return;
    const points = pointsRef.current;
    if (!points) return;

    // Clamp delta so a backgrounded tab returning to focus never lurches.
    const dt = Math.min(delta, 0.05);
    const t = points.userData.t === undefined ? 0 : (points.userData.t as number) + dt;
    points.userData.t = t;

    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < EMBER_COUNT; i += 1) {
      const seed = seeds[i];
      let y = arr[i * 3 + 1] + seed.rise * dt;
      if (y > FIELD_Y_TOP) {
        // Wrap gently back to the floor of the room.
        y = FIELD_Y_BOTTOM;
      }
      arr[i * 3 + 1] = y;
      arr[i * 3] = seed.x + Math.sin(t * seed.swayFreq + seed.phase) * seed.swayAmp;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={texture}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GoldForm({ activeRef }: { activeRef: MutableRefObject<boolean> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // A pleasing resting angle so the reduced-motion still frame already glints.
  const rest = useMemo(() => new THREE.Euler(0.5, 0.7, 0.15), []);

  useFrame((_, delta) => {
    if (!activeRef.current) return;
    const mesh = meshRef.current;
    if (!mesh) return;
    const dt = Math.min(delta, 0.05);
    // The slowest rotation in the portfolio: a facet catches the light, waits.
    mesh.rotation.y += dt * 0.06;
    mesh.rotation.x += dt * 0.018;
  });

  return (
    <mesh ref={meshRef} position={[1.85, 0.55, -0.4]} rotation={rest} scale={0.92}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={GOLD}
        emissive={GOLD}
        emissiveIntensity={0.12}
        metalness={1}
        roughness={0.28}
        flatShading
      />
    </mesh>
  );
}

function Rig({ activeRef }: { activeRef: MutableRefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    if (activeRef.current) {
      // Feather the whole field toward the pointer — a hair of parallax only.
      target.current.x = state.pointer.x * 0.18;
      target.current.y = state.pointer.y * 0.12;
    }
    group.position.x += (target.current.x - group.position.x) * 0.03;
    group.position.y += (target.current.y - group.position.y) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <Embers activeRef={activeRef} />
      <GoldForm activeRef={activeRef} />
    </group>
  );
}

export default function LumiereScene() {
  const { ref, active } = useSceneActive<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  // R3F occasionally misses its first size measurement for an absolutely
  // positioned canvas under React 19, leaving the drawing buffer at the intrinsic
  // 300x150 until the next window resize. Observing the wrapper guarantees a
  // post-layout tick — R3F re-measures on the dispatched resize and fills the hero.
  useEffect(() => {
    const node = ref.current;
    const nudge = () => window.dispatchEvent(new Event("resize"));
    // A macrotask nudge fires even before the first paint; the observer covers
    // any later layout shift (font load, orientation change).
    const timer = window.setTimeout(nudge, 120);
    const observer = node ? new ResizeObserver(nudge) : null;
    if (node && observer) observer.observe(node);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [ref]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 h-full w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        frameloop={active ? "always" : "demand"}
      >
        <ambientLight intensity={0.35} color="#3a2f1c" />
        <pointLight position={[3, 2, 4]} intensity={22} color="#E8C973" distance={16} decay={2} />
        <pointLight position={[-4, -1, 2]} intensity={12} color="#C9A227" distance={14} decay={2} />
        <directionalLight position={[0, 4, 2]} intensity={0.4} color="#E8C973" />
        <Rig activeRef={activeRef} />
      </Canvas>
    </div>
  );
}
