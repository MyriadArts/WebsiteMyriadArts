"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function SpotlightScene() {
  const curtainRef = useRef(null);

  useFrame(({ clock }) => {
    if (curtainRef.current) {
      curtainRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <>
      <spotLight
        position={[0, 10, 10]}
        angle={Math.PI / 6}
        penumbra={0.5}
        color={0xffffff}
        intensity={1.5}
      />
      <mesh ref={curtainRef} position={[0, 0, -5]}>
        <planeGeometry args={[20, 10, 32, 32]} />
        <meshPhongMaterial
          color={0xe50914}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.1}
        />
      </mesh>
    </>
  );
}

export default function SpotlightCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <SpotlightScene />
      </Canvas>
    </div>
  );
}
