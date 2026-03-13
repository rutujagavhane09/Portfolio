import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const WobbleShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Icosahedron args={[1, 15]} scale={1.5}>
        <MeshWobbleMaterial
          color="#3b82f6"
          factor={0.6}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </Icosahedron>
    </Float>
  );
};

export const Skill3D: React.FC = () => {
  return (
    <div className="w-full h-[300px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <WobbleShape />
      </Canvas>
    </div>
  );
};

export default Skill3D;
