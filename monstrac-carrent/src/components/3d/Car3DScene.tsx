import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Simple 3D Car Model using primitive shapes
function CarModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 1]} />
        <meshStandardMaterial
          color="#00d4ff"
          metalness={0.9}
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Car Cabin */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1.2, 0.5, 0.9]} />
        <meshStandardMaterial
          color="#0088aa"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Wheels */}
      {[
        [-0.7, 0, 0.5],
        [0.7, 0, 0.5],
        [-0.7, 0, -0.5],
        [0.7, 0, -0.5],
      ].map((position, i) => (
        <group key={i} position={position as [number, number, number]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
            <meshStandardMaterial
              color="#b537ff"
              metalness={1}
              roughness={0}
              emissive="#b537ff"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      <mesh position={[1.05, 0.5, 0.3]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffff00"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[1.05, 0.5, -0.3]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffff00"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Taillights */}
      <mesh position={[-1.05, 0.5, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-1.05, 0.5, -0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Car3DScene() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b537ff" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />

        <Suspense fallback={null}>
          <CarModel />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default Car3DScene;
