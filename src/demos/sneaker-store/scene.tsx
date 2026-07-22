"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/*
 * VIELA — kinetic drop stage (real-time Three.js).
 * A charged turntable rig: instanced neon shards + orbiting torus-knots orbit a
 * pulsing additive core, ringed by a spinning podium halo and additive glow
 * particles. Hot pink (#FF3D81) -> electric violet (#B026FF) with a volt accent.
 * The whole rig energizes toward the cursor. Decorative backdrop only — all
 * product info and controls live in the DOM in front of it.
 *
 * Safety: primitives only (no asset fetches / no drei text / no postprocessing).
 * Geometry + materials are memoized; nothing is allocated per frame. When the
 * scene is inactive (off-screen or prefers-reduced-motion) every `useFrame`
 * body early-returns, but the rig is still posed once so it never renders blank.
 */

const HEX = { pink: "#FF3D81", violet: "#B026FF", volt: "#D8FF3D" } as const;
const PINK = new THREE.Color(HEX.pink);
const VIOLET = new THREE.Color(HEX.violet);
const SCRATCH = new THREE.Color();

const SHARD_COUNT = 54;

/** Deterministic PRNG so the layout is stable across mounts. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Shard {
  radius: number;
  y: number;
  phase: number;
  speed: number;
  spin: number;
  scale: number;
  bob: number;
  mix: number;
}

/** Instanced neon octahedra orbiting the core on staggered rings. */
function Shards({ active }: { active: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const invalidate = useThree((s) => s.invalidate);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.17, 0), []);
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ toneMapped: false }),
    [],
  );

  const items = useMemo<Shard[]>(() => {
    const rand = mulberry32(0x5eed17);
    return Array.from({ length: SHARD_COUNT }, () => ({
      radius: 1.25 + rand() * 2.0,
      y: (rand() - 0.5) * 3.0,
      phase: rand() * Math.PI * 2,
      speed: (0.55 + rand() * 0.95) * (rand() > 0.5 ? 1 : -1),
      spin: 0.8 + rand() * 2.2,
      scale: 0.45 + rand() * 1.15,
      bob: 0.9 + rand() * 1.6,
      mix: rand(),
    }));
  }, []);

  const pose = (t: number) => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const a = it.phase + t * it.speed;
      dummy.position.set(
        Math.cos(a) * it.radius,
        it.y + Math.sin(t * it.bob + it.phase) * 0.32,
        Math.sin(a) * it.radius,
      );
      dummy.rotation.set(t * it.spin, t * it.spin * 0.7 + it.phase, it.phase);
      dummy.scale.setScalar(it.scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < items.length; i++) {
      SCRATCH.copy(PINK).lerp(VIOLET, items[i].mix);
      m.setColorAt(i, SCRATCH);
    }
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    pose(0);
    invalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useFrame((state) => {
    if (!active) return;
    pose(state.clock.elapsedTime);
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, SHARD_COUNT]}
      frustumCulled={false}
    />
  );
}

/** A single emissive torus-knot on its own orbit. */
function OrbitKnot({
  active,
  geometry,
  radius,
  y,
  speed,
  phase,
  color,
}: {
  active: boolean;
  geometry: THREE.BufferGeometry;
  radius: number;
  y: number;
  speed: number;
  phase: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const invalidate = useThree((s) => s.invalidate);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color).multiplyScalar(0.14),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.95,
        metalness: 0.45,
        roughness: 0.3,
        toneMapped: false,
      }),
    [color],
  );

  const pose = (t: number) => {
    const m = ref.current;
    if (!m) return;
    const a = phase + t * speed;
    m.position.set(
      Math.cos(a) * radius,
      y + Math.sin(t * 0.8 + phase) * 0.35,
      Math.sin(a) * radius,
    );
    m.rotation.set(t * speed * 1.4, t * speed, phase);
  };

  useLayoutEffect(() => {
    pose(0);
    invalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    if (!active) return;
    pose(state.clock.elapsedTime);
  });

  return <mesh ref={ref} geometry={geometry} material={material} scale={0.52} />;
}

function Knots({ active }: { active: boolean }) {
  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(0.5, 0.16, 140, 18, 2, 3),
    [],
  );
  return (
    <>
      <OrbitKnot active={active} geometry={geometry} radius={2.5} y={0.5} speed={0.62} phase={0} color={HEX.pink} />
      <OrbitKnot active={active} geometry={geometry} radius={2.95} y={-0.9} speed={-0.46} phase={2.2} color={HEX.violet} />
      <OrbitKnot active={active} geometry={geometry} radius={2.05} y={1.5} speed={0.52} phase={4.1} color={HEX.volt} />
    </>
  );
}

/** Spinning turntable halo under the drop. */
function Podium({ active }: { active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const ringA = useMemo(() => new THREE.TorusGeometry(2.15, 0.045, 16, 128), []);
  const ringB = useMemo(() => new THREE.TorusGeometry(2.65, 0.03, 16, 128), []);
  const matA = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a0a2e",
        emissive: HEX.pink,
        emissiveIntensity: 1.15,
        metalness: 0.6,
        roughness: 0.4,
        toneMapped: false,
      }),
    [],
  );
  const matB = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a0a2e",
        emissive: HEX.violet,
        emissiveIntensity: 1.0,
        metalness: 0.6,
        roughness: 0.4,
        toneMapped: false,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!active) return;
    const g = ref.current;
    if (!g) return;
    g.rotation.z += delta * 0.45;
  });

  return (
    <group ref={ref} position={[0, -1.7, 0]} rotation={[Math.PI / 2.1, 0, 0]}>
      <mesh geometry={ringA} material={matA} />
      <mesh geometry={ringB} material={matB} rotation={[0, 0, 0.4]} />
    </group>
  );
}

/** Additive core bloom behind the product. */
function CoreGlow({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.75, 1), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: HEX.pink,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useFrame((state) => {
    if (!active) return;
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.scale.setScalar(1 + Math.sin(t * 2.2) * 0.09);
    m.rotation.y = t * 0.4;
  });

  return (
    <mesh ref={ref} geometry={geometry} material={material} position={[0, 0.2, -0.6]} />
  );
}

/** Additive glow particle field drifting around the rig. */
function GlowField({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const n = 260;
    const positions = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const rand = mulberry32(0xc0ffee);
    for (let i = 0; i < n; i++) {
      const r = 2.1 + rand() * 3.1;
      const theta = rand() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = (rand() - 0.5) * 5.2;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      SCRATCH.copy(PINK).lerp(VIOLET, rand());
      colors[i * 3] = SCRATCH.r;
      colors[i * 3 + 1] = SCRATCH.g;
      colors[i * 3 + 2] = SCRATCH.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.09,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!active) return;
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * 0.28;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

function Rig({ active }: { active: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useLayoutEffect(() => {
    invalidate();
  }, [invalidate, active]);

  useFrame(() => {
    if (!active) return;
    const g = tilt.current;
    if (!g) return;
    const tx = pointer.current.y * 0.22;
    const ty = pointer.current.x * 0.5;
    g.rotation.x += (tx - g.rotation.x) * 0.06;
    g.rotation.y += (ty - g.rotation.y) * 0.06;
  });

  return (
    <group ref={tilt}>
      <CoreGlow active={active} />
      <Shards active={active} />
      <Knots active={active} />
      <Podium active={active} />
      <GlowField active={active} />
    </group>
  );
}

export default function KineticStage({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.4, 6.2], fov: 42 }}
      frameloop={active ? "always" : "demand"}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 5]} intensity={26} color={HEX.pink} decay={2} />
      <pointLight position={[-4, -2, 4]} intensity={22} color={HEX.violet} decay={2} />
      <Rig active={active} />
    </Canvas>
  );
}
