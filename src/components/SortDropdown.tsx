import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ 
  value, 
  onChange, 
  className = ""
}) => {
  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full px-4 py-3 pr-10 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 cursor-pointer"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SortDropdown;