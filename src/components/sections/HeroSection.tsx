import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CheckBadgeIcon 
} from '@heroicons/react/24/outline';
import Hero3DBackground from '../3d/Hero3DBackground';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-dark"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">Premium</span>
                <br />
                <span className="text-white">Car Rental</span>
                <br />
                <span className="text-4xl lg:text-5xl text-gray-300">Experience</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                Discover the perfect vehicle for your journey with our premium fleet. 
                From luxury sedans to eco-friendly electric cars, we have everything you need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/cars"
                className="px-8 py-4 bg-gradient-neon text-dark-900 font-bold rounded-xl hover:shadow-neon-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                Search Cars
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-accent-primary text-accent-primary font-semibold rounded-xl hover:bg-accent-primary hover:text-dark-900 transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <ShieldCheckIcon className="w-5 h-5 text-neon-green" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <ClockIcon className="w-5 h-5 text-neon-blue" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <CheckBadgeIcon className="w-5 h-5 text-neon-purple" />
                <span>Verified Cars</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Car */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 lg:h-[500px]"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Hero3DBackground height="100%" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-blue rounded-full animate-bounce-subtle"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-purple rounded-full animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-neon-green rounded-full animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-accent-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;