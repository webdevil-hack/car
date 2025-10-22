import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Loading3DProps {
  className?: string;
  size?: number;
  color?: string;
}

const LoadingSphere: React.FC<{ color: string; size: number }> = ({ color, size }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[size]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
};

const LoadingBox: React.FC<{ color: string; size: number }> = ({ color, size }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
    <Box ref={meshRef} args={[size, size, size]} position={[2, 0, 0]}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Box>
  );
};

const LoadingTorus: React.FC<{ color: string; size: number }> = ({ color, size }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.015;
      meshRef.current.rotation.y += 0.015;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.4;
    }
  });

  return (
    <Torus ref={meshRef} args={[size, size * 0.3, 8, 16]} position={[-2, 0, 0]}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Torus>
  );
};

const Loading3D: React.FC<Loading3DProps> = ({
  className = '',
  size = 1,
  color = '#00D4FF'
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
          
          {/* Loading Elements */}
          <LoadingSphere color={color} size={size} />
          <LoadingBox color="#8B5CF6" size={size * 0.8} />
          <LoadingTorus color="#EC4899" size={size * 0.6} />
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Loading3D;