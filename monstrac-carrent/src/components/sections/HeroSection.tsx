import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// 3D Car Model Component
const Car3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Simplified car shape - in production, load a proper 3D model */}
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#00d9ff" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Wheels */}
      <mesh position={[-1.5, -0.75, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[1.5, -0.75, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-1.5, -0.75, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[1.5, -0.75, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-30" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 gradient-mesh-bg" />

      {/* Content */}
      <div className="container-max section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6"
            >
              Drive Your
              <span className="block mt-2 glow-text text-shadow-glow">
                Dream Car Today
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-md mx-auto lg:mx-0"
            >
              Premium cars, transparent pricing, and world-class service. 
              Experience the future of car rentals.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/cars')}
                className="btn-primary px-8 py-4 text-lg font-semibold shadow-lg shadow-accent-primary/25"
              >
                Search Cars
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="btn-secondary px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm"
            >
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Full Insurance</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified Cars</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Car */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-radial-dark" />
            <Canvas className="w-full h-full">
              <PerspectiveCamera makeDefault position={[0, 2, 8]} />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
              <Environment preset="city" />
              <Car3D />
            </Canvas>
            
            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-primary/20 blur-3xl animate-pulse-slow" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;