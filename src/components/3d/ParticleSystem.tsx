import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  area?: { x: [number, number]; y: [number, number]; z: [number, number] };
  animated?: boolean;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  color = '#00D4FF',
  size = 0.02,
  speed = 1,
  area = { x: [-50, 50], y: [-50, 50], z: [-50, 50] },
  animated = true
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.random() * (area.x[1] - area.x[0]) + area.x[0];
      positions[i * 3 + 1] = Math.random() * (area.y[1] - area.y[0]) + area.y[0];
      positions[i * 3 + 2] = Math.random() * (area.z[1] - area.z[0]) + area.z[0];
    }
    
    return positions;
  }, [count, area]);

  useFrame((state) => {
    if (animated && pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        // Move particles
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * speed + i) * 0.01;
        
        // Reset position if out of bounds
        if (positions[i * 3 + 1] > area.y[1]) {
          positions[i * 3 + 1] = area.y[0];
        }
        if (positions[i * 3 + 1] < area.y[0]) {
          positions[i * 3 + 1] = area.y[1];
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

export default ParticleSystem;