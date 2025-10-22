import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Cloud, Text3D, Center } from '@react-three/drei';
import Car3D from './Car3D';
import FloatingElements from './FloatingElements';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Hero3DBackgroundProps {
  className?: string;
  height?: string;
}

const AnimatedText: React.FC<{ children: string; position: [number, number, number] }> = ({ 
  children, 
  position 
}) => {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Center position={position}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {children}
        <meshStandardMaterial color="#00D4FF" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  );
};

const Hero3DBackground: React.FC<Hero3DBackgroundProps> = ({
  className = '',
  height = '100vh'
}) => {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00D4FF" />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#EC4899" />
          
          {/* Environment */}
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />
          <Cloud position={[0, 15, 0]} speed={0.4} opacity={0.2} />
          
          {/* Main Cars */}
          <Car3D position={[0, 0, 0]} color="#00D4FF" speed={1} />
          <Car3D position={[4, 0, 2]} color="#8B5CF6" speed={0.8} />
          <Car3D position={[-4, 0, -2]} color="#EC4899" speed={1.2} />
          <Car3D position={[2, 0, -3]} color="#10B981" speed={0.9} />
          <Car3D position={[-2, 0, 3]} color="#F59E0B" speed={1.1} />
          
          {/* Floating Elements */}
          <FloatingElements 
            count={30} 
            colors={['#00D4FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444']}
            area={{ x: [-15, 15], y: [0, 15], z: [-15, 15] }}
          />
          
          {/* 3D Text */}
          <AnimatedText position={[0, 8, 0]}>MONSTRAC</AnimatedText>
          <AnimatedText position={[0, 7, 0]}>CAR RENT</AnimatedText>
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              metalness={0.1} 
              roughness={0.9}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minDistance={8}
            maxDistance={25}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/20 to-dark-900/60 pointer-events-none" />
    </div>
  );
};

export default Hero3DBackground;