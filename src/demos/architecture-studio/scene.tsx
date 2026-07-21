"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/**
 * A real-time architectural "massing" maquette: an abstract composition of
 * bone-white and concrete extruded volumes on a neutral base, lit like a design
 * museum. It turns slowly and parallaxes toward the pointer. Palette is locked
 * to the demo neutrals — no saturated colour, one restrained ink accent.
 *
 * Decorative only: the wrapper is aria-hidden. The loop is gated by `active`
 * (in-view AND motion allowed); when inactive the scene renders a single
 * composed still frame via frameloop="demand" rather than going blank.
 */

// Bone → warm concrete → pale → cool concrete → ink accent.
const TONES = ["#E9E5DC", "#DED8CC", "#F1EDE4", "#CDC7BA", "#1A1A1A"] as const;

type Volume = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  t: number;
};

// An abstract maquette — a small skyline of masses around a central slab.
const VOLUMES: Volume[] = [
  { x: 0, z: 0, w: 1.1, d: 1.1, h: 3.3, t: 0 },
  { x: 1.35, z: 0.25, w: 1.0, d: 1.5, h: 1.5, t: 1 },
  { x: -1.55, z: -0.35, w: 1.35, d: 1.05, h: 2.2, t: 2 },
  { x: 0.15, z: 1.7, w: 1.7, d: 0.95, h: 1.0, t: 3 },
  { x: -1.5, z: 1.45, w: 0.95, d: 0.95, h: 1.35, t: 0 },
  { x: 1.7, z: -1.45, w: 0.95, d: 0.95, h: 0.8, t: 1 },
  { x: -0.35, z: -1.8, w: 1.25, d: 0.85, h: 1.95, t: 2 },
  { x: 2.35, z: 1.35, w: 0.7, d: 0.7, h: 0.55, t: 3 },
  { x: -2.4, z: -0.05, w: 0.28, d: 1.05, h: 2.75, t: 4 },
  { x: 0.85, z: -0.7, w: 0.6, d: 0.6, h: 0.45, t: 0 },
];

const GROUND_Y = -0.15;

function Massing({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const materials = useMemo(
    () =>
      TONES.map(
        (c, i) =>
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(c),
            roughness: i === 4 ? 0.5 : 0.92,
            metalness: 0,
          }),
      ),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geometry, materials],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!active || !g) return;
    const d = Math.min(delta, 0.05);
    spin.current += d * 0.085;
    const targetY = spin.current + state.pointer.x * 0.4;
    const targetX = -state.pointer.y * 0.13;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.07);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05);
  });

  return (
    <>
      <group ref={group} rotation={[0, -0.5, 0]} position={[0, GROUND_Y, 0]}>
        {VOLUMES.map((v, i) => (
          <mesh
            key={i}
            geometry={geometry}
            material={materials[v.t]}
            position={[v.x, v.h / 2, v.z]}
            scale={[v.w, v.h, v.d]}
            castShadow
            receiveShadow
          />
        ))}
      </group>

      <ContactShadows
        position={[0, GROUND_Y + 0.01, 0]}
        scale={16}
        blur={2.6}
        far={6}
        opacity={0.32}
        color="#1A1A1A"
        resolution={512}
      />
    </>
  );
}

export default function MassingScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 18, position: [14, 10.5, 16], near: 0.1, far: 100 }}
      frameloop={active ? "always" : "demand"}
      onCreated={({ camera }) => camera.lookAt(0, 0.7, 0)}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#FBF8F1", "#B4AEA1", 0.5]} />
      <directionalLight
        position={[7, 12, 6]}
        intensity={1.55}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={1}
        shadow-camera-far={44}
      />
      <directionalLight position={[-8, 5, -6]} intensity={0.32} />
      <Massing active={active} />
    </Canvas>
  );
}
