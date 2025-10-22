import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingActionButton3DProps {
  position?: [number, number, number];
  color?: string;
  hoverColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  animated?: boolean;
  glow?: boolean;
}

const FloatingActionButton3D: React.FC<FloatingActionButton3DProps> = ({
  position = [0, 0, 0],
  color = '#00D4FF',
  hoverColor = '#8B5CF6',
  icon,
  onClick,
  animated = true,
  glow = false
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (animated && meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      
      // Hover animation
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
      
      // Rotation
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <Sphere args={[0.5]}>
        <meshStandardMaterial
          color={hovered ? hoverColor : color}
          metalness={0.8}
          roughness={0.2}
          emissive={glow ? (hovered ? hoverColor : color) : '#000000'}
          emissiveIntensity={glow ? 0.3 : 0}
        />
      </Sphere>
      
      {/* Glow effect */}
      {glow && (
        <Sphere args={[0.6]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={hovered ? hoverColor : color}
            transparent
            opacity={0.3}
            emissive={hovered ? hoverColor : color}
            emissiveIntensity={0.5}
          />
        </Sphere>
      )}
      
      {/* Icon */}
      {icon && (
        <Box args={[0.2, 0.2, 0.2]} position={[0, 0, 0.6]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Box>
      )}
    </mesh>
  );
};

export default FloatingActionButton3D;