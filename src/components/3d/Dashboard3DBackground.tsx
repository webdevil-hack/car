import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Cloud } from '@react-three/drei';
import Car3D from './Car3D';
import FloatingElements from './FloatingElements';
import Card3D from './Card3D';
import ParticleSystem from './ParticleSystem';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Dashboard3DBackgroundProps {
  className?: string;
  height?: string;
  showCars?: boolean;
  showFloatingElements?: boolean;
  showCards?: boolean;
}

const RotatingCars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <Car3D position={[0, 0, 0]} color="#00D4FF" speed={0.5} />
      <Car3D position={[3, 0, 2]} color="#8B5CF6" speed={0.3} />
      <Car3D position={[-3, 0, -2]} color="#EC4899" speed={0.7} />
    </group>
  );
};

const FloatingCards: React.FC = () => {
  const cards = [
    { position: [0, 2, -5] as [number, number, number], color: '#00D4FF' },
    { position: [2, 1, -4] as [number, number, number], color: '#8B5CF6' },
    { position: [-2, 1.5, -3] as [number, number, number], color: '#EC4899' },
    { position: [1, 0.5, -6] as [number, number, number], color: '#10B981' },
    { position: [-1, 0.8, -7] as [number, number, number], color: '#F59E0B' }
  ];

  return (
    <>
      {cards.map((card, index) => (
        <Card3D
          key={index}
          position={card.position}
          color={card.color}
          glow={true}
          animated={true}
        />
      ))}
    </>
  );
};

const Dashboard3DBackground: React.FC<Dashboard3DBackgroundProps> = ({
  className = '',
  height = '100vh',
  showCars = true,
  showFloatingElements = true,
  showCards = true
}) => {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00D4FF" />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#8B5CF6" />
          <pointLight position={[0, 10, 0]} intensity={0.4} color="#EC4899" />
          
          {/* Environment */}
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
          <Cloud position={[0, 20, 0]} speed={0.2} opacity={0.1} />
          
          {/* 3D Elements */}
          {showCars && <RotatingCars />}
          {showFloatingElements && (
            <FloatingElements 
              count={15} 
              colors={['#00D4FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']}
              area={{ x: [-20, 20], y: [0, 20], z: [-20, 20] }}
            />
          )}
          {showCards && <FloatingCards />}
          
          {/* Particle System */}
          <ParticleSystem 
            count={500} 
            color="#00D4FF" 
            size={0.02} 
            speed={0.5}
            area={{ x: [-30, 30], y: [-30, 30], z: [-30, 30] }}
          />
          <ParticleSystem 
            count={300} 
            color="#8B5CF6" 
            size={0.015} 
            speed={0.3}
            area={{ x: [-25, 25], y: [-25, 25], z: [-25, 25] }}
          />
          <ParticleSystem 
            count={200} 
            color="#EC4899" 
            size={0.01} 
            speed={0.7}
            area={{ x: [-20, 20], y: [-20, 20], z: [-20, 20] }}
          />
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              metalness={0.1} 
              roughness={0.9}
              transparent
              opacity={0.6}
            />
          </mesh>
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
            minDistance={5}
            maxDistance={30}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/10 to-dark-900/40 pointer-events-none" />
    </div>
  );
};

export default Dashboard3DBackground;