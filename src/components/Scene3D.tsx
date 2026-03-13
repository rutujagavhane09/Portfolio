import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.1);
    
    // Subtle group movement
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-8, 4, -15]} rotation={[1.2, 0.5, 0]}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#4f46e5" wireframe />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[8, -4, -12]} rotation={[0.5, 1.2, 0.5]}>
          <torusGeometry args={[1.2, 0.3, 16, 100]} />
          <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-2, -6, -20]} rotation={[0, 0, 0]}>
          <icosahedronGeometry args={[3, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>

      <Float speed={4} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[10, 8, -25]}>
          <dodecahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      </Float>
    </group>
  );
};

const ParticleField = ({ count = 3000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0003;
    pointsRef.current.rotation.x += 0.0001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const targetZ = 15 + scrollY.current * 0.005;
    const targetY = -scrollY.current * 0.002;
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, targetY, 0);
  });

  return null;
};

const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 2);
  });

  return <pointLight ref={lightRef} intensity={3} color="#3b82f6" distance={20} />;
};

import { useEffect } from 'react';

export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#050505]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <CameraController />
        <ambientLight intensity={0.1} />
        <pointLight position={[20, 20, 20]} intensity={0.5} />
        
        <MouseLight />
        <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />
        <FloatingShapes />
        <ParticleField count={4000} />
        
        <fog attach="fog" args={['#050505', 10, 40]} />
      </Canvas>
    </div>
  );
};
