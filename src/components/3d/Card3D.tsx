import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Card3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
  animated?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

const Card3D: React.FC<Card3DProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = '#1a1a1a',
  hoverColor = '#00D4FF',
  children,
  animated = true,
  glow = false,
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (animated && meshRef.current) {
      // Hover animation
      if (hovered) {
        meshRef.current.scale.setScalar(1.05);
        meshRef.current.position.y = position[1] + 0.1;
      } else {
        meshRef.current.scale.setScalar(1);
        meshRef.current.position.y = position[1];
      }
      
      // Click animation
      if (clicked) {
        meshRef.current.scale.setScalar(0.95);
      }
      
      // Subtle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
    onClick?.();
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <Box args={[4, 2, 0.2]}>
        <meshStandardMaterial
          color={hovered ? hoverColor : color}
          metalness={0.8}
          roughness={0.2}
          emissive={glow ? (hovered ? hoverColor : color) : '#000000'}
          emissiveIntensity={glow ? 0.1 : 0}
        />
      </Box>
      
      {/* Glow effect */}
      {glow && (
        <Box args={[4.2, 2.2, 0.1]} position={[0, 0, -0.1]}>
          <meshStandardMaterial
            color={hovered ? hoverColor : color}
            transparent
            opacity={0.3}
            emissive={hovered ? hoverColor : color}
            emissiveIntensity={0.5}
          />
        </Box>
      )}
      
      {children}
    </mesh>
  );
};

export default Card3D;