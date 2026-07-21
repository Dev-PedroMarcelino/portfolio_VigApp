"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * Apex Motors — signature 3D moment.
 *
 * A forged alloy wheel built entirely from primitives (torus tyre, cylinder
 * rim barrel, radial spoke boxes, brake disc + caliper) lit like a studio turn-
 * table. The brake caliper + centre-cap accent read the paint colour chosen in
 * the configurator, so picking "Rosso Apex" glows the caliper red in real time.
 *
 * No external assets: metallic reflections come from an <Environment> whose only
 * children are inline <Lightformer> rectangles, plus manual lights. Idle spin +
 * pointer-lerp when active; a posed still frame under reduced motion (colour
 * changes still apply because they are render-driven, not frame-driven).
 */

const CARBON = "#0C0C0F";
const RIM_METAL = "#C7CAD1";
const RIM_METAL_DARK = "#5C5E66";
const TYRE = "#0A0A0C";
const DISC = "#1B1B20";

type WheelProps = {
  accentColor: string;
  /**
   * True only when on-screen AND motion is allowed. When false the canvas runs
   * frameloop="demand": it paints one posed frame (never blank) and re-renders
   * on colour change, so reduced-motion users still get the correct paint.
   */
  active: boolean;
};

const SPOKE_COUNT = 10;
const LUG_COUNT = 5;
const POSED_TILT_X = -0.32;
const POSED_TILT_Y = 0.5;

function Wheel({ accentColor, active }: WheelProps) {
  // Outer group handles pointer tilt; inner group carries the idle spin so the
  // two never fight each other.
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  const geo = useMemo(() => {
    const spoke = new THREE.BoxGeometry(0.19, 1.0, 0.16);
    // Taper the spoke towards the rim for a forged look.
    const pos = spoke.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i += 1) {
      const y = pos.getY(i);
      const shrink = y > 0 ? 0.55 : 1;
      pos.setX(i, pos.getX(i) * shrink);
      pos.setZ(i, pos.getZ(i) * shrink);
    }
    spoke.computeVertexNormals();
    return {
      tyre: new THREE.TorusGeometry(1.15, 0.34, 24, 96),
      rimLip: new THREE.TorusGeometry(1.12, 0.07, 16, 96),
      barrel: new THREE.CylinderGeometry(1.13, 1.05, 0.62, 96, 1, true),
      disc: new THREE.CylinderGeometry(0.86, 0.86, 0.1, 64),
      spoke,
      hub: new THREE.CylinderGeometry(0.3, 0.34, 0.24, 48),
      cap: new THREE.CylinderGeometry(0.16, 0.16, 0.08, 32),
      accentRing: new THREE.TorusGeometry(0.2, 0.026, 12, 48),
      lug: new THREE.CylinderGeometry(0.045, 0.045, 0.14, 12),
      caliper: new THREE.BoxGeometry(0.34, 0.5, 0.2),
    };
  }, []);

  const spokeAngles = useMemo(
    () => Array.from({ length: SPOKE_COUNT }, (_, i) => (i / SPOKE_COUNT) * Math.PI * 2),
    [],
  );
  const lugAngles = useMemo(
    () => Array.from({ length: LUG_COUNT }, (_, i) => (i / LUG_COUNT) * Math.PI * 2),
    [],
  );

  // The flattering three-quarter pose is set declaratively on the group below,
  // so the demand-rendered reduced-motion frame is never blank or dead-on.
  useFrame((state, delta) => {
    if (!active) return;
    const dt = Math.min(delta, 0.05);
    // Idle spin around the axle.
    if (spinRef.current) spinRef.current.rotation.z += dt * 0.55;
    // Lerp the tilt toward the pointer for a hand-on-the-turntable feel.
    if (tiltRef.current) {
      const targetY = POSED_TILT_Y + state.pointer.x * 0.5;
      const targetX = POSED_TILT_X - state.pointer.y * 0.35;
      const k = 1 - Math.pow(0.0015, dt);
      tiltRef.current.rotation.y += (targetY - tiltRef.current.rotation.y) * k;
      tiltRef.current.rotation.x += (targetX - tiltRef.current.rotation.x) * k;
    }
  });

  const metalProps: ThreeElements["meshStandardMaterial"] = {
    color: RIM_METAL,
    metalness: 1,
    roughness: 0.28,
    envMapIntensity: 1.15,
  };

  return (
    <group ref={tiltRef} rotation={[POSED_TILT_X, POSED_TILT_Y, 0]}>
      <group ref={spinRef}>
        {/* Tyre */}
        <mesh geometry={geo.tyre} castShadow receiveShadow>
          <meshStandardMaterial color={TYRE} metalness={0.15} roughness={0.85} />
        </mesh>

        {/* Rim barrel (recessed) */}
        <mesh geometry={geo.barrel} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.28]}>
          <meshStandardMaterial
            color={RIM_METAL_DARK}
            metalness={1}
            roughness={0.4}
            side={THREE.DoubleSide}
            envMapIntensity={0.8}
          />
        </mesh>

        {/* Brake disc + drilled look (spins with the hub) */}
        <mesh geometry={geo.disc} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.22]}>
          <meshStandardMaterial color={DISC} metalness={0.85} roughness={0.55} />
        </mesh>

        {/* Shiny outer rim lip */}
        <mesh geometry={geo.rimLip} position={[0, 0, 0.02]}>
          <meshStandardMaterial {...metalProps} roughness={0.16} />
        </mesh>

        {/* Spokes */}
        {spokeAngles.map((a, i) => (
          <group key={i} rotation={[0, 0, a]}>
            <mesh geometry={geo.spoke} position={[0, 0.62, 0.04]} castShadow>
              <meshStandardMaterial {...metalProps} />
            </mesh>
          </group>
        ))}

        {/* Hub */}
        <mesh geometry={geo.hub} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]} castShadow>
          <meshStandardMaterial {...metalProps} roughness={0.34} />
        </mesh>

        {/* Lug bolts */}
        {lugAngles.map((a, i) => (
          <mesh
            key={i}
            geometry={geo.lug}
            rotation={[Math.PI / 2, 0, 0]}
            position={[Math.cos(a) * 0.22, Math.sin(a) * 0.22, 0.2]}
          >
            <meshStandardMaterial color={RIM_METAL_DARK} metalness={1} roughness={0.5} />
          </mesh>
        ))}

        {/* Centre cap + accent ring */}
        <mesh geometry={geo.cap} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.24]}>
          <meshStandardMaterial color="#17171B" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh geometry={geo.accentRing} position={[0, 0, 0.29]}>
          <meshStandardMaterial
            color={accentColor}
            metalness={0.4}
            roughness={0.3}
            emissive={accentColor}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Brake caliper — fixed to the strut (does not spin) and reads the
          configurator paint colour in real time */}
      <mesh
        geometry={geo.caliper}
        position={[Math.cos(-0.6) * 0.72, Math.sin(-0.6) * 0.72, -0.18]}
        rotation={[0, 0, -0.6 + Math.PI / 2]}
        castShadow
      >
        <meshStandardMaterial
          color={accentColor}
          metalness={0.35}
          roughness={0.32}
          emissive={accentColor}
          emissiveIntensity={0.28}
        />
      </mesh>
    </group>
  );
}

export default function WheelScene({ accentColor, active }: WheelProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0.1, 0.35, 5.9], fov: 32 }}
      frameloop={active ? "always" : "demand"}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={[CARBON]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-5, 2, 2]} intensity={0.7} color="#8892a6" />
      {/* Racing-red rim kiss */}
      <pointLight position={[-3, -1.5, 3]} intensity={12} distance={12} color="#C8102E" />

      <Wheel accentColor={accentColor} active={active} />

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.55}
        scale={9}
        blur={2.6}
        far={4}
        resolution={512}
        color="#000000"
      />

      {/* Studio reflections — inline lightformers only, no HDR/preset/files */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          color="#ffffff"
          position={[0, 4, -3]}
          scale={[8, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          color="#c9d2e0"
          rotation-y={Math.PI / 2}
          position={[-4, 1, 0]}
          scale={[5, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#ffffff"
          rotation-y={-Math.PI / 2}
          position={[4, 1, 0]}
          scale={[5, 4, 1]}
        />
        <Lightformer
          form="ring"
          intensity={2.2}
          color="#C8102E"
          position={[-2, -1, 2]}
          scale={[3, 3, 1]}
        />
      </Environment>
    </Canvas>
  );
}
