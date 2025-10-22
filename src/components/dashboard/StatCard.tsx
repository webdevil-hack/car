import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'pink' | 'orange' | 'red';
  delay?: number;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
  delay = 0,
  onClick
}) => {
  const colorClasses = {
    blue: 'from-neon-blue to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-neon-purple to-purple-600',
    pink: 'from-neon-pink to-pink-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600'
  };

  const changeColors = {
    increase: 'text-green-400',
    decrease: 'text-red-400',
    neutral: 'text-gray-400'
  };

  const changeIcons = {
    increase: '↗',
    decrease: '↘',
    neutral: '→'
  };

  return (
    <AnimatedCard
      delay={delay}
      onClick={onClick}
      className="p-6 hover:border-neon-blue/30 transition-all duration-300"
      glow
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-white text-xl">
            {icon}
          </div>
        </motion.div>
        
        {change && (
          <motion.div
            className={`flex items-center space-x-1 text-sm font-medium ${changeColors[change.type]}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            <span>{changeIcons[change.type]}</span>
            <span>{Math.abs(change.value)}%</span>
          </motion.div>
        )}
      </div>

      <motion.h3
        className="text-3xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.1 }}
      >
        {value}
      </motion.h3>

      <motion.p
        className="text-gray-400 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2 }}
      >
        {title}
      </motion.p>

      {/* Animated progress bar */}
      {change && (
        <motion.div
          className="mt-4 w-full bg-dark-700 rounded-full h-1 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Math.abs(change.value), 100)}%` }}
            transition={{ duration: 1, delay: delay + 0.6 }}
          />
        </motion.div>
      )}
    </AnimatedCard>
  );
};

export default StatCard;