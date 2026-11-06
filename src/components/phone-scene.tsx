"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
export type SceneProps = {
  selected: string;
  onSelect: (id: string) => void;
  exploded: boolean;
  reset: number;
  rotation: number;
  zoom: number;
};
const parts: [
  string,
  [number, number, number],
  [number, number, number],
  string,
  number,
][] = [
  ["tampa", [0, 0, -0.19], [2.26, 4.56, 0.12], "#17283e", -0.95],
  ["estrutura", [0, 0, -0.07], [2.35, 4.65, 0.18], "#8495ac", -0.45],
  ["bateria", [0, -0.36, 0.11], [1.52, 2.5, 0.16], "#27323e", 0.15],
  ["placa", [0, 1.48, 0.13], [1.8, 0.79, 0.13], "#174c43", 0.32],
  ["camera", [-0.69, 1.63, 0.28], [0.48, 0.58, 0.25], "#0b111d", 0.62],
  ["som", [0.32, -1.91, 0.14], [0.9, 0.28, 0.12], "#26374b", 0.4],
  ["conector", [0, -2.17, 0.16], [0.43, 0.14, 0.18], "#c3bd9f", 0.58],
  ["tela", [0, 0, 0.38], [2.2, 4.5, 0.08], "#101d34", 1.18],
];
function Part({
  part,
  selected,
  onSelect,
  exploded,
}: {
  part: (typeof parts)[number];
  selected: string;
  onSelect: (id: string) => void;
  exploded: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const [id, pos, size, color, offset] = part;
  const active = selected === id;
  useFrame((_, delta) => {
    if (ref.current) {
      const target = pos[2] + (exploded ? offset : 0);
      ref.current.position.z = THREE.MathUtils.damp(
        ref.current.position.z,
        target,
        7,
        delta,
      );
    }
  });
  return (
    <group ref={ref} position={pos}>
      <RoundedBox
        args={size}
        radius={Math.min(0.12, size[2] / 3)}
        smoothness={3}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <meshStandardMaterial
          color={active ? "#2563eb" : color}
          metalness={0.65}
          roughness={0.3}
          transparent={id === "tela"}
          opacity={id === "tela" ? (exploded ? 0.42 : 0.76) : 1}
          emissive={active ? "#1d4ed8" : "#000000"}
          emissiveIntensity={active ? 0.6 : 0}
        />
      </RoundedBox>
      {id === "camera" && (
        <mesh
          position={[0, 0, size[2] / 2 + 0.015]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.16, 0.16, 0.035, 28]} />
          <meshStandardMaterial
            color="#090b12"
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
      )}
      {id === "bateria" && (
        <group position={[0, 0, 0.085]}>
          <mesh>
            <planeGeometry args={[1.3, 2.25]} />
            <meshStandardMaterial
              color={active ? "#448aff" : "#131b26"}
              roughness={0.8}
            />
          </mesh>
          <mesh position={[0, 0.65, 0.005]}>
            <planeGeometry args={[0.45, 0.025]} />
            <meshBasicMaterial color="#64748b" />
          </mesh>
          <mesh position={[0, 0.55, 0.005]}>
            <planeGeometry args={[0.7, 0.025]} />
            <meshBasicMaterial color="#64748b" />
          </mesh>
        </group>
      )}
      {id === "placa" &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[-0.65 + i * 0.25, 0, 0.08]}>
            <boxGeometry args={[0.15, 0.4, 0.04]} />
            <meshStandardMaterial
              color={i % 2 ? "#b6a476" : "#121a25"}
              metalness={0.7}
              roughness={0.4}
            />
          </mesh>
        ))}
    </group>
  );
}
function Phone(props: SceneProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current)
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        props.exploded ? -0.5 : -0.23,
        5,
        delta,
      );
  });
  return (
    <group ref={group} rotation={[0.12, -0.23, 0.06]}>
      {parts.map((part) => (
        <Part
          key={part[0]}
          part={part}
          selected={props.selected}
          onSelect={props.onSelect}
          exploded={props.exploded}
        />
      ))}
    </group>
  );
}
function Controls({
  reset,
  rotation,
  zoom,
}: Pick<SceneProps, "reset" | "rotation" | "zoom">) {
  const controls = useRef<OrbitControlsType>(null);
  useEffect(() => {
    controls.current?.reset();
  }, [reset]);
  useEffect(() => {
    const c = controls.current;
    if (c) {
      c.setAzimuthalAngle(rotation);
      c.update();
    }
  }, [rotation]);
  useEffect(() => {
    const c = controls.current;
    if (c) {
      c.object.position.setLength(zoom);
      c.update();
    }
  }, [zoom]);
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableZoom={false}
      minDistance={5.8}
      maxDistance={10}
      minPolarAngle={Math.PI * 0.27}
      maxPolarAngle={Math.PI * 0.7}
      minAzimuthAngle={-Math.PI * 0.65}
      maxAzimuthAngle={Math.PI * 0.65}
      enableDamping
    />
  );
}
export default function PhoneScene(props: SceneProps) {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setSupported(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
  }, []);
  if (supported === null)
    return <div className="scene-fallback">Preparando visualização 3D…</div>;
  if (!supported)
    return (
      <div className="scene-fallback">
        <img
          src="/images/hero.svg"
          width={800}
          height={650}
          alt="Representação ilustrativa de smartphone"
        />
        <p>
          WebGL indisponível. Explore todos os componentes pela lista ao lado.
        </p>
      </div>
    );
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.domElement.setAttribute(
          "aria-label",
          "Smartphone 3D. Arraste para girar; controles alternativos disponíveis abaixo.",
        );
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={4} />
      <pointLight position={[-4, 2, 3]} color="#3b82f6" intensity={30} />
      <pointLight position={[2, -3, 4]} color="#38bdf8" intensity={15} />
      <Suspense fallback={null}>
        <Phone {...props} />
      </Suspense>
      <Controls {...props} />
    </Canvas>
  );
}
