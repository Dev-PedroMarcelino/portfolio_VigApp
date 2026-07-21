"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  Sparkles,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { useSceneActive } from "@/components/three/use-scene-active";

/* ------------------------------------------------------------------ */
/* Card model — obsidian → emerald holographic metal, drifting + tilt   */
/* ------------------------------------------------------------------ */

// Resting pose so the still (reduced-motion / off-screen) frame already
// reads as a floating product shot instead of a flat card.
const BASE_ROT_X = -0.16;
const BASE_ROT_Y = -0.34;

function Card({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);

  // Materials are created once; nothing is allocated inside useFrame.
  const cardMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#05070C",
        metalness: 1,
        roughness: 0.26,
        clearcoat: 1,
        clearcoatRoughness: 0.32,
        emissive: "#06392a",
        emissiveIntensity: 0.55,
        envMapIntensity: 1.6,
      }),
    [],
  );

  const chipMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D9C57A",
        metalness: 1,
        roughness: 0.34,
        emissive: "#7a6a2e",
        emissiveIntensity: 0.25,
      }),
    [],
  );

  const engraveMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A1016",
        metalness: 0.9,
        roughness: 0.5,
      }),
    [],
  );

  const logoMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#10B981",
        metalness: 0.6,
        roughness: 0.3,
        emissive: "#10B981",
        emissiveIntensity: 1.1,
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!active || !group.current) return;
    // Pointer parallax, damped for a frame-rate independent, buttery lerp.
    const targetY = BASE_ROT_Y + state.pointer.x * 0.42;
    const targetX = BASE_ROT_X - state.pointer.y * 0.3;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, delta);
  });

  return (
    <group ref={group} rotation={[BASE_ROT_X, BASE_ROT_Y, 0.04]}>
      {/* Card body */}
      <RoundedBox args={[3.4, 2.14, 0.09]} radius={0.16} smoothness={6}>
        <primitive object={cardMat} attach="material" />
      </RoundedBox>

      {/* Raised EMV chip, top-left */}
      <RoundedBox
        args={[0.46, 0.36, 0.05]}
        radius={0.06}
        smoothness={4}
        position={[-1.02, 0.34, 0.06]}
      >
        <primitive object={chipMat} attach="material" />
      </RoundedBox>

      {/* Emerald signature bar, top-right */}
      <mesh position={[1.02, 0.6, 0.055]}>
        <boxGeometry args={[0.62, 0.11, 0.02]} />
        <primitive object={logoMat} attach="material" />
      </mesh>

      {/* Engraved lines — card number + holder row */}
      <mesh position={[-0.18, -0.2, 0.044]}>
        <boxGeometry args={[2.5, 0.12, 0.02]} />
        <primitive object={engraveMat} attach="material" />
      </mesh>
      <mesh position={[-0.7, -0.68, 0.044]}>
        <boxGeometry args={[1.5, 0.09, 0.02]} />
        <primitive object={engraveMat} attach="material" />
      </mesh>
      <mesh position={[1.16, -0.68, 0.044]}>
        <boxGeometry args={[0.5, 0.09, 0.02]} />
        <primitive object={engraveMat} attach="material" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene contents                                                       */
/* ------------------------------------------------------------------ */

function SceneContent({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      {/* Soft emerald rim light raking across the metal */}
      <pointLight position={[-4, 2, 3]} intensity={45} color="#10B981" distance={16} decay={2} />
      <pointLight position={[4, -1, 4]} intensity={22} color="#34D399" distance={16} decay={2} />
      <spotLight
        position={[2, 5, 4]}
        angle={0.5}
        penumbra={1}
        intensity={38}
        color="#E9F2EE"
        distance={20}
        decay={2}
      />

      <Float
        speed={active ? 1.3 : 0}
        rotationIntensity={0.35}
        floatIntensity={0.7}
        floatingRange={[-0.06, 0.06]}
      >
        <Card active={active} />
      </Float>

      {/* Drifting emerald motes behind the card on the obsidian void */}
      <Sparkles
        count={38}
        scale={[7, 4.5, 2]}
        position={[0, 0, -1.6]}
        size={2.4}
        speed={active ? 0.4 : 0}
        opacity={0.6}
        color="#34D399"
      />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.55}
        scale={9}
        blur={2.8}
        far={4}
        color="#000000"
      />

      {/* Baked reflections for the holographic sheen — inline lightformers only,
          no HDR presets or fetched files. */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#10B981"
          position={[-3, 1.5, 3]}
          scale={[5, 5, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color="#E9F2EE"
          position={[3.5, 3, 2]}
          scale={[4, 4, 1]}
        />
        <Lightformer
          form="circle"
          intensity={1.6}
          color="#34D399"
          position={[0, -2.5, 2.5]}
          scale={[3, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#22D3EE"
          position={[2, -1, -3]}
          scale={[4, 2, 1]}
        />
      </Environment>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas — transparent over the obsidian surface, demand-parked idle   */
/* ------------------------------------------------------------------ */

export default function Scene() {
  const { ref, active } = useSceneActive<HTMLDivElement>();

  return (
    <div ref={ref} aria-hidden className="h-full w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.1, 5.6], fov: 32 }}
        frameloop={active ? "always" : "demand"}
      >
        <SceneContent active={active} />
      </Canvas>
    </div>
  );
}
