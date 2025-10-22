import React from 'react';
import { motion } from 'framer-motion';

interface CarImageProps {
  carName: string;
  brand: string;
  price: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

const CarImage: React.FC<CarImageProps> = ({
  carName,
  brand,
  price,
  className = '',
  size = 'md',
  animated = true,
  glow = false,
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-16 h-12 text-2xl',
    md: 'w-32 h-24 text-4xl',
    lg: 'w-48 h-36 text-6xl',
    xl: 'w-64 h-48 text-8xl'
  };

  const getCarEmoji = (brand: string) => {
    const brandEmojis: { [key: string]: string } = {
      'BMW': '🚗',
      'Tesla': '🚙',
      'Mercedes': '🚘',
      'Audi': '🚔',
      'Porsche': '🚕',
      'Lamborghini': '🚓',
      'Ferrari': '🚑',
      'Range Rover': '🚐',
      'Toyota': '🚙',
      'Honda': '🚗',
      'Ford': '🚘',
      'Chevrolet': '🚔',
      'Nissan': '🚕',
      'Hyundai': '🚓',
      'Kia': '🚑',
      'Mazda': '🚐',
      'Subaru': '🚙',
      'Volkswagen': '🚗',
      'Volvo': '🚘',
      'Jaguar': '🚔',
      'Lexus': '🚕',
      'Infiniti': '🚓',
      'Acura': '🚑',
      'Genesis': '🚐',
      'Lincoln': '🚙',
      'Cadillac': '🚗',
      'Buick': '🚘',
      'Chrysler': '🚔',
      'Dodge': '🚕',
      'Jeep': '🚓'
    };
    return brandEmojis[brand] || '🚗';
  };

  const getGradientColor = (brand: string) => {
    const brandColors: { [key: string]: string } = {
      'BMW': 'from-blue-500 to-blue-700',
      'Tesla': 'from-gray-500 to-gray-700',
      'Mercedes': 'from-silver-500 to-silver-700',
      'Audi': 'from-red-500 to-red-700',
      'Porsche': 'from-orange-500 to-orange-700',
      'Lamborghini': 'from-yellow-500 to-yellow-700',
      'Ferrari': 'from-red-600 to-red-800',
      'Range Rover': 'from-green-500 to-green-700',
      'Toyota': 'from-red-500 to-red-700',
      'Honda': 'from-blue-600 to-blue-800',
      'Ford': 'from-blue-500 to-blue-700',
      'Chevrolet': 'from-yellow-500 to-yellow-700',
      'Nissan': 'from-red-500 to-red-700',
      'Hyundai': 'from-silver-500 to-silver-700',
      'Kia': 'from-red-500 to-red-700',
      'Mazda': 'from-red-600 to-red-800',
      'Subaru': 'from-blue-500 to-blue-700',
      'Volkswagen': 'from-blue-600 to-blue-800',
      'Volvo': 'from-blue-500 to-blue-700',
      'Jaguar': 'from-green-500 to-green-700',
      'Lexus': 'from-silver-500 to-silver-700',
      'Infiniti': 'from-blue-500 to-blue-700',
      'Acura': 'from-red-500 to-red-700',
      'Genesis': 'from-silver-500 to-silver-700',
      'Lincoln': 'from-blue-500 to-blue-700',
      'Cadillac': 'from-silver-500 to-silver-700',
      'Buick': 'from-blue-500 to-blue-700',
      'Chrysler': 'from-red-500 to-red-700',
      'Dodge': 'from-red-600 to-red-800',
      'Jeep': 'from-green-500 to-green-700'
    };
    return brandColors[brand] || 'from-gray-500 to-gray-700';
  };

  const CarImageContent = () => (
    <div
      className={`
        relative overflow-hidden rounded-xl border-2 border-dark-600/50
        bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-sm
        ${sizeClasses[size]}
        ${glow ? 'shadow-2xl shadow-neon-blue/20' : 'shadow-xl shadow-black/20'}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(brand)} opacity-20`} />
      
      {/* Glow effect */}
      {glow && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-sm" />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-2">
        <motion.div
          className="mb-2"
          animate={animated ? {
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getCarEmoji(brand)}
        </motion.div>
        
        <motion.div
          className="text-white font-bold text-xs truncate w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {carName}
        </motion.div>
        
        <motion.div
          className="text-neon-blue text-xs font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ${price}/day
        </motion.div>
      </div>
      
      {/* Animated border */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-neon-blue/50"
          animate={{
            borderColor: ['rgba(0, 212, 255, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(0, 212, 255, 0.5)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.05, 
          y: -5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CarImageContent />
      </motion.div>
    );
  }

  return <CarImageContent />;
};

export default CarImage;