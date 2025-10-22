'use client'

import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PresentationControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Fallback 3D Car Component (procedural)
function FallbackCar() {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3, 0.8, 1.8]} />
        <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Windshield */}
      <mesh position={[1.2, 1.2, 0]}>
        <boxGeometry args={[0.1, 0.6, 1.6]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
      </mesh>
      
      {/* Wheels */}
      {[
        [-1.5, 0, 1.2] as [number, number, number],
        [1.5, 0, 1.2] as [number, number, number],
        [-1.5, 0, -1.2] as [number, number, number],
        [1.5, 0, -1.2] as [number, number, number],
      ].map((position, index) => (
        <group key={index} position={position}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05]} />
            <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      
      {/* Headlights */}
      <mesh position={[2.1, 0.7, 0.6]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[2.1, 0.7, -0.6]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Taillights */}
      <mesh position={[-2.1, 0.7, 0.6]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-2.1, 0.7, -0.6]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

// Animated Car Component
function AnimatedCar({ color = '#1e40af' }: { color?: string }) {
  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={0.5}
      floatingRange={[0, 0.2]}
    >
      <PresentationControls
        global
        cursor={true}
        snap={true}
        speed={1}
        zoom={0.8}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <FallbackCar />
      </PresentationControls>
    </Float>
  )
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

interface CarSceneProps {
  className?: string
  interactive?: boolean
  autoRotate?: boolean
}

export function CarScene({ className = '', interactive = true, autoRotate = false }: CarSceneProps) {
  const [loading, setLoading] = useState(true)

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <LoadingSpinner />
        </div>
      )}
      
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        onCreated={() => setLoading(false)}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#0ea5e9" />
          <pointLight position={[0, -5, 0]} intensity={0.3} color="#d946ef" />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Car */}
          <AnimatedCar />
          
          {/* Controls */}
          {interactive && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}