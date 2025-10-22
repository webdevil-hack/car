import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Car3DScene from '../3d/Car3DScene';

const HeroSection = () => {
  const trustBadges = [
    { icon: Shield, text: 'Insured Vehicles' },
    { icon: Clock, text: '24/7 Support' },
    { icon: CheckCircle, text: 'Verified Cars' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">Drive Your</span>
              <br />
              <span className="glow-text">Dream Car</span>
              <br />
              <span className="text-white">Today</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Premium car rentals with flexible pricing, verified drivers, and unmatched service. Your journey starts here.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/cars" className="btn-primary inline-flex items-center space-x-2">
                <span>Browse Cars</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#booking" className="btn-secondary inline-flex items-center space-x-2">
                <span>Quick Book</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-6 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300">
                  <badge.icon className="w-5 h-5 text-accent-primary" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Car Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <Car3DScene />
            
            {/* Floating Stats */}
            <motion.div
              className="absolute top-10 right-10 bg-dark-card/80 backdrop-blur-md border border-accent-primary/30 rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-3xl font-bold glow-text">500+</div>
              <div className="text-sm text-gray-400">Premium Cars</div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 bg-dark-card/80 backdrop-blur-md border border-neon-purple/30 rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="text-3xl font-bold glow-text">50k+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-accent-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent-primary rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
