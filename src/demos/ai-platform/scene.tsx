"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Cortexa neural orb — the flagship real-time 3D moment.
 *
 * A central organically-distorting sphere (drei MeshDistortMaterial, deep
 * violet emissive glow) breathes at the core of an orbiting field of instanced
 * "synapse" nodes wired together with faint additive connection lines, wrapped
 * in a slowly drifting particle cloud. Nodes drift toward the pointer and the
 * core intensifies as the cursor approaches. Everything is precomputed
 * deterministically (seeded in a client-only useMemo) with zero per-frame
 * allocation. When motion is disallowed the scene renders a single composed
 * still frame instead of animating — never blank.
 *
 * Decorative only: mounted inside an aria-hidden wrapper via next/dynamic.
 */

const ACCENT = "#A78BFA";
const ACCENT_BRIGHT = "#C4B5FD";
const CORE_BASE = "#2A0E52";

const NODE_COUNT = 46;
const PARTICLE_COUNT = 880;
const NEIGHBORS = 2; // connections per node
const SHELL = 2.45; // node shell radius
const NODE_GEO_R = 0.05;

/** Deterministic PRNG so node/particle layout is stable across renders. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** drei's MeshDistortMaterial instance: a standard material plus a distortion. */
type DistortImpl = THREE.MeshStandardMaterial & { distort: number };

/** A point on the unit sphere via the Fibonacci lattice. */
function fibonacciPoint(i: number, count: number, out: THREE.Vector3) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (i / (count - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * i;
  return out.set(Math.cos(theta) * r, y, Math.sin(theta) * r);
}

function OrbScene({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  const pointer = useThree((s) => s.pointer);

  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const getCoreMat = useCallback(
    () => coreRef.current?.material as unknown as DistortImpl | undefined,
    [],
  );

  // --- Deterministic layout (client-only, so seeded randomness is safe) ----
  const { base, curr, edges, weight, nodeMesh, lineGeo, lineMat, particles } =
    useMemo(() => {
      const rand = mulberry32(0x9e3779b9);

      // Node base positions: jittered points on a sphere shell.
      const base: THREE.Vector3[] = [];
      const curr: THREE.Vector3[] = [];
      const tmp = new THREE.Vector3();
      for (let i = 0; i < NODE_COUNT; i++) {
        fibonacciPoint(i, NODE_COUNT, tmp);
        const r = SHELL * (0.82 + rand() * 0.24);
        const v = tmp.clone().multiplyScalar(r);
        base.push(v);
        curr.push(v.clone());
      }

      // Per-node pointer-pull weight — only a subset reacts strongly, so the
      // field feels alive rather than uniformly magnetised.
      const weight = base.map(() => 0.35 + rand() * 0.65);

      // Edges: connect each node to its nearest neighbours (dedup i<j).
      const edgeSet = new Set<string>();
      const edges: [number, number][] = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        const dists: { j: number; d: number }[] = [];
        for (let j = 0; j < NODE_COUNT; j++) {
          if (j === i) continue;
          dists.push({ j, d: base[i].distanceToSquared(base[j]) });
        }
        dists.sort((a, b) => a.d - b.d);
        for (let k = 0; k < NEIGHBORS; k++) {
          const j = dists[k].j;
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (edgeSet.has(key)) continue;
          edgeSet.add(key);
          edges.push([Math.min(i, j), Math.max(i, j)]);
        }
      }

      // Instanced synapse nodes — one draw call, additive glow.
      const nodeGeo = new THREE.SphereGeometry(NODE_GEO_R, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(ACCENT_BRIGHT),
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const nodeMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
      nodeMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      nodeMesh.frustumCulled = false;

      // Connection lines — single LineSegments, positions rewritten per frame.
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(edges.length * 2 * 3), 3),
      );
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(ACCENT),
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      // Ambient particle dust in a wider shell.
      const particles = new Float32Array(PARTICLE_COUNT * 3);
      const pv = new THREE.Vector3();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        fibonacciPoint(i, PARTICLE_COUNT, pv);
        const r = 2.9 + rand() * 2.6;
        particles[i * 3] = pv.x * r + (rand() - 0.5) * 0.4;
        particles[i * 3 + 1] = pv.y * r + (rand() - 0.5) * 0.4;
        particles[i * 3 + 2] = pv.z * r + (rand() - 0.5) * 0.4;
      }

      return { base, curr, edges, weight, nodeMesh, lineGeo, lineMat, particles };
    }, []);

  // Reusable scratch objects — never allocate inside the frame loop.
  const scratch = useMemo(
    () => ({ obj: new THREE.Object3D(), target: new THREE.Vector3() }),
    [],
  );
  const pointerVec = useRef(new THREE.Vector3(0, 0, 1.4));

  /** Compose one frame of the field into the instanced mesh + line buffer. */
  const writeField = useCallback(
    (t: number, pull: number) => {
      const { obj } = scratch;
      const linePos = lineGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < NODE_COUNT; i++) {
        const b = base[i];
        // Gentle organic drift.
        obj.position.set(
          b.x + Math.sin(t * 0.4 + i) * 0.07,
          b.y + Math.cos(t * 0.33 + i * 1.3) * 0.07,
          b.z + Math.sin(t * 0.28 + i * 0.7) * 0.07,
        );
        // Drift toward the pointer, weighted per node.
        obj.position.lerp(pointerVec.current, pull * weight[i]);
        curr[i].copy(obj.position);

        const s = 0.7 + Math.sin(t * 1.1 + i * 2.0) * 0.18 + pull * weight[i] * 1.2;
        obj.scale.setScalar(Math.max(0.35, s));
        obj.updateMatrix();
        nodeMesh.setMatrixAt(i, obj.matrix);
      }
      nodeMesh.instanceMatrix.needsUpdate = true;

      for (let e = 0; e < edges.length; e++) {
        const [a, c] = edges[e];
        const o = e * 6;
        linePos[o] = curr[a].x;
        linePos[o + 1] = curr[a].y;
        linePos[o + 2] = curr[a].z;
        linePos[o + 3] = curr[c].x;
        linePos[o + 4] = curr[c].y;
        linePos[o + 5] = curr[c].z;
      }
      lineGeo.attributes.position.needsUpdate = true;
    },
    [base, curr, edges, weight, nodeMesh, lineGeo, scratch],
  );

  // Compose the initial still frame before the first paint so a demand-mode
  // render (reduced motion / off-screen) is never blank.
  useLayoutEffect(() => {
    if (group.current) group.current.rotation.y = 0.35;
    writeField(0, 0);
    const mat = getCoreMat();
    if (mat) {
      mat.distort = 0.36;
      mat.emissiveIntensity = 0.62;
    }
    invalidate();
  }, [writeField, invalidate, getCoreMat]);

  // When motion stops (reduced motion or scrolled away), settle to a still pose.
  useEffect(() => {
    if (active) return;
    writeField(0, 0);
    invalidate();
  }, [active, writeField, invalidate]);

  useFrame((state) => {
    if (!active) return; // parked under reduced motion / off-screen
    const t = state.clock.elapsedTime;

    // Lerp a world-space pointer target; pull grows as the cursor leaves centre.
    scratch.target.set(pointer.x * 2.6, pointer.y * 2.6, 1.4);
    pointerVec.current.lerp(scratch.target, 0.06);
    const pull = Math.min(1, Math.hypot(pointer.x, pointer.y)) * 0.13;

    writeField(t, pull);

    if (group.current) {
      group.current.rotation.y = t * 0.05;
      group.current.rotation.x = Math.sin(t * 0.18) * 0.08;
      const breathe = 1 + Math.sin(t * 0.6) * 0.02;
      group.current.scale.setScalar(breathe);
    }

    const mat = getCoreMat();
    if (mat) {
      mat.distort = 0.34 + Math.sin(t * 0.8) * 0.05 + pull * 0.8;
      mat.emissiveIntensity = 0.5 + Math.sin(t * 1.3) * 0.06 + pull * 3.2;
    }
  });

  // Free GPU resources on unmount.
  useEffect(() => {
    return () => {
      nodeMesh.geometry.dispose();
      (nodeMesh.material as THREE.Material).dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, [nodeMesh, lineGeo, lineMat]);

  return (
    <group ref={group}>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 4]} intensity={2.4} color={ACCENT_BRIGHT} />
      <pointLight position={[-4, -2, -3]} intensity={1.1} color={ACCENT} />

      {/* Distorting neural core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <MeshDistortMaterial
          color={CORE_BASE}
          emissive={ACCENT}
          emissiveIntensity={0.62}
          roughness={0.26}
          metalness={0.16}
          distort={0.36}
          speed={active ? 1.5 : 0}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* Fake bloom halo — inverted additive shell, no postprocessing */}
      <mesh scale={1.75}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Synapse nodes + connection lines */}
      <primitive object={nodeMesh} />
      <lineSegments geometry={lineGeo} material={lineMat} frustumCulled={false} />

      {/* Ambient particle dust */}
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={ACCENT}
          size={0.028}
          sizeAttenuation
          depthWrite={false}
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Scene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      frameloop={active ? "always" : "demand"}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <OrbScene active={active} />
    </Canvas>
  );
}
