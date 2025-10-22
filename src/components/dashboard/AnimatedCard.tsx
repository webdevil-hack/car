import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
  gradient?: boolean;
  glow?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
  hover = true,
  onClick,
  gradient = false,
  glow = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-2xl border border-dark-700/50
        ${gradient ? 'bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-sm' : 'bg-dark-800/60'}
        ${glow ? 'shadow-2xl shadow-neon-blue/10' : 'shadow-xl shadow-black/20'}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      />
      
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, delay: delay + 0.5 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;