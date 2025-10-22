import React from 'react';
import Loading3D from './3d/Loading3D';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  use3D?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  text = 'Loading...',
  use3D = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const size3D = {
    sm: 0.5,
    md: 1,
    lg: 1.5,
    xl: 2
  };

  if (use3D) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className="w-32 h-32">
          <Loading3D size={size3D[size]} />
        </div>
        {text && <p className="text-gray-400 text-sm">{text}</p>}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-gray-300 border-t-neon-blue rounded-full animate-spin`}></div>
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;