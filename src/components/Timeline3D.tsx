import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

const ScrollShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    
    meshRef.current.rotation.z = t * 0.1 + scrollY * 0.001;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 2;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <TorusKnot args={[3, 0.8, 128, 32]} ref={meshRef}>
        <MeshDistortMaterial
          color="#3b82f6"
          speed={3}
          distort={0.4}
          radius={1}
          wireframe
          transparent
          opacity={0.15}
        />
      </TorusKnot>
    </Float>
  );
};

export const Timeline3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#8b5cf6" />
        <ScrollShape />
      </Canvas>
    </div>
  );
};

export default Timeline3D;
