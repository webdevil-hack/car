import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedChartProps {
  data: { label: string; value: number; color?: string }[];
  type?: 'bar' | 'line' | 'pie';
  height?: number;
  animated?: boolean;
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({
  data,
  type = 'bar',
  height = 200,
  animated = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className="w-full" style={{ height }}>
        <div className="flex items-end justify-between h-full space-x-2">
          {data.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex-1 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="w-full rounded-t-lg relative overflow-hidden"
                style={{
                  height: animated ? 0 : (item.value / maxValue) * (height - 40),
                  backgroundColor: item.color || '#00D4FF'
                }}
                animate={{
                  height: (item.value / maxValue) * (height - 40)
                }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                />
              </motion.div>
              <motion.p
                className="text-xs text-gray-400 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item.label}
              </motion.p>
              <motion.p
                className="text-xs text-white font-semibold mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item.value}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'line') {
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 100,
      y: 100 - (item.value / maxValue) * 100
    }));

    const pathData = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    return (
      <div className="w-full relative" style={{ height }}>
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d={pathData}
            fill="none"
            stroke={data[0]?.color || '#00D4FF'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill={data[index]?.color || '#00D4FF'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            />
          ))}
        </svg>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
          {data.map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item.label}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default AnimatedChart;