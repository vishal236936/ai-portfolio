"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Earth() {
  return (
    <>
      {/* Core Earth */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* Glow layer */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}

export default function Globe3D() {
  return (
    <div className="h-[500px] w-full">
      <Canvas>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} />

        <Earth />

        <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={false} />
      </Canvas>
    </div>
  );
}