import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Using a standard font URL from a CDN
const FONT_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json";

const AnimatedLogo = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
  });

  return (
    <Center>
      <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text3D
          font={FONT_URL}
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          RG.
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Float>
    </Center>
  );
};

export const Logo3D: React.FC = () => {
  return (
    <div className="w-full h-[200px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#3b82f6" />
        <spotLight position={[0, 5, 10]} angle={0.15} penumbra={1} intensity={2} />
        <AnimatedLogo />
      </Canvas>
    </div>
  );
};

export default Logo3D;
