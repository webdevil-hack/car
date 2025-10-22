import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  animated?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  lines = 1,
  animated = true
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-dark-700/50 rounded"
          initial={animated ? { opacity: 0.5 } : {}}
          animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`bg-dark-800/60 rounded-2xl border border-dark-700/50 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <motion.div
          className="w-12 h-12 bg-dark-700/50 rounded-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="flex-1">
          <LoadingSkeleton lines={2} />
        </div>
      </div>
      <LoadingSkeleton lines={3} />
    </motion.div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  className = ''
}) => {
  return (
    <motion.div
      className={`bg-dark-800/60 rounded-2xl border border-dark-700/50 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-dark-600/50">
        <div className="flex justify-between items-center">
          <LoadingSkeleton className="w-48" lines={1} />
          <LoadingSkeleton className="w-32" lines={1} />
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <motion.div
                key={colIndex}
                className="flex-1 h-4 bg-dark-700/50 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: (rowIndex * columns + colIndex) * 0.05,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;