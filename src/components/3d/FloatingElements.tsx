import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingElementProps {
  position: [number, number, number];
  color: string;
  shape: 'box' | 'sphere' | 'torus' | 'octahedron';
  speed?: number;
  size?: number;
  opacity?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  position,
  color,
  shape,
  speed = 1,
  size = 0.5,
  opacity = 0.6
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      
      // Rotation animation
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.rotation.z += 0.005 * speed;
      
      // Scale pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const renderShape = () => {
    const commonProps = {
      ref: meshRef,
      position,
    };

    switch (shape) {
      case 'box':
        return <Box args={[size, size, size]} {...commonProps} />;
      case 'sphere':
        return <Sphere args={[size]} {...commonProps} />;
      case 'torus':
        return <Torus args={[size, size * 0.3, 8, 16]} {...commonProps} />;
      case 'octahedron':
        return <Octahedron args={[size]} {...commonProps} />;
      default:
        return <Box args={[size, size, size]} {...commonProps} />;
    }
  };

  return (
    <mesh>
      {renderShape()}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
  shapes?: Array<'box' | 'sphere' | 'torus' | 'octahedron'>;
  area?: { x: [number, number]; y: [number, number]; z: [number, number] };
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 20,
  colors = ['#00D4FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'],
  shapes = ['box', 'sphere', 'torus', 'octahedron'],
  area = { x: [-10, 10], y: [0, 10], z: [-10, 10] }
}) => {
  const elements = Array.from({ length: count }, (_, i) => {
    const position: [number, number, number] = [
      Math.random() * (area.x[1] - area.x[0]) + area.x[0],
      Math.random() * (area.y[1] - area.y[0]) + area.y[0],
      Math.random() * (area.z[1] - area.z[0]) + area.z[0]
    ];

    return {
      id: i,
      position,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)] as 'box' | 'sphere' | 'torus' | 'octahedron',
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 0.8 + 0.2,
      opacity: Math.random() * 0.4 + 0.3
    };
  });

  return (
    <>
      {elements.map((element) => (
        <FloatingElement
          key={element.id}
          position={element.position}
          color={element.color}
          shape={element.shape}
          speed={element.speed}
          size={element.size}
          opacity={element.opacity}
        />
      ))}
    </>
  );
};

export default FloatingElements;