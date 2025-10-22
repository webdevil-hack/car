import React from 'react';
import { 
  Squares2X2Icon, 
  ListBulletIcon 
} from '@heroicons/react/24/outline';

interface ViewToggleProps {
  mode: 'grid' | 'list';
  onChange: (mode: 'grid' | 'list') => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  mode, 
  onChange, 
  className = ""
}) => {
  return (
    <div className={`flex bg-dark-700 rounded-lg p-1 ${className}`}>
      <button
        onClick={() => onChange('grid')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          mode === 'grid'
            ? 'bg-accent-primary text-dark-900'
            : 'text-gray-400 hover:text-white hover:bg-dark-600'
        }`}
      >
        <Squares2X2Icon className="w-4 h-4" />
        <span>Grid</span>
      </button>
      
      <button
        onClick={() => onChange('list')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          mode === 'list'
            ? 'bg-accent-primary text-dark-900'
            : 'text-gray-400 hover:text-white hover:bg-dark-600'
        }`}
      >
        <ListBulletIcon className="w-4 h-4" />
        <span>List</span>
      </button>
    </div>
  );
};

export default ViewToggle;