import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Car3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  animated?: boolean;
  speed?: number;
}

const Car3D: React.FC<Car3DProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = '#00D4FF',
  animated = true,
  speed = 1
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (animated && meshRef.current) {
      // Rotate the car
      meshRef.current.rotation.y += 0.01 * speed;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Scale animation on hover
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Car Body */}
      <Box args={[4, 1.2, 2]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Car Roof */}
      <Box args={[3, 0.8, 1.6]} position={[0, 1.4, 0]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Front Windshield */}
      <Box args={[0.1, 0.8, 1.6]} position={[1.5, 1.4, 0]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </Box>
      
      {/* Rear Windshield */}
      <Box args={[0.1, 0.8, 1.6]} position={[-1.5, 1.4, 0]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </Box>
      
      {/* Wheels */}
      <Cylinder args={[0.4, 0.4, 0.3]} position={[1.3, 0.2, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      <Cylinder args={[0.4, 0.4, 0.3]} position={[-1.3, 0.2, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      <Cylinder args={[0.4, 0.4, 0.3]} position={[1.3, 0.2, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      <Cylinder args={[0.4, 0.4, 0.3]} position={[-1.3, 0.2, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      
      {/* Headlights */}
      <Sphere args={[0.2]} position={[2, 0.8, 0.6]}>
        <meshStandardMaterial color="#FFFF99" emissive="#FFFF99" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.2]} position={[2, 0.8, -0.6]}>
        <meshStandardMaterial color="#FFFF99" emissive="#FFFF99" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Taillights */}
      <Sphere args={[0.15]} position={[-2, 0.8, 0.6]}>
        <meshStandardMaterial color="#FF4444" emissive="#FF4444" emissiveIntensity={0.3} />
      </Sphere>
      <Sphere args={[0.15]} position={[-2, 0.8, -0.6]}>
        <meshStandardMaterial color="#FF4444" emissive="#FF4444" emissiveIntensity={0.3} />
      </Sphere>
    </group>
  );
};

export default Car3D;