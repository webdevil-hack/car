import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Cloud } from '@react-three/drei';
import Car3D from './Car3D';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface Scene3DProps {
  cars?: Array<{
    id: string;
    position: [number, number, number];
    color: string;
    speed?: number;
  }>;
  showEnvironment?: boolean;
  showStars?: boolean;
  showClouds?: boolean;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

const RotatingEnvironment: React.FC<{ speed?: number }> = ({ speed = 0.5 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001 * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <Environment preset="night" />
    </group>
  );
};

const Scene3D: React.FC<Scene3DProps> = ({
  cars = [
    { id: '1', position: [0, 0, 0], color: '#00D4FF', speed: 1 },
    { id: '2', position: [3, 0, 2], color: '#8B5CF6', speed: 0.8 },
    { id: '3', position: [-3, 0, -2], color: '#EC4899', speed: 1.2 }
  ],
  showEnvironment = true,
  showStars = true,
  showClouds = true,
  cameraPosition = [5, 5, 5],
  autoRotate = true,
  autoRotateSpeed = 1
}) => {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8B5CF6" />
        
        {/* Environment */}
        {showEnvironment && <RotatingEnvironment speed={0.3} />}
        {showStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
        {showClouds && <Cloud position={[0, 10, 0]} speed={0.4} opacity={0.3} />}
        
        {/* Cars */}
        {cars.map((car) => (
          <Car3D
            key={car.id}
            position={car.position}
            color={car.color}
            speed={car.speed}
            animated={true}
          />
        ))}
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.8} />
        </mesh>
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          minDistance={3}
          maxDistance={20}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;