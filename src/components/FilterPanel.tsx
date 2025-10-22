import React from 'react';
import { motion } from 'framer-motion';
import { 
  FunnelIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface FilterPanelProps {
  filters: {
    search: string;
    category: string;
    priceRange: [number, number];
    transmission: string;
    fuel: string;
    seats: string;
    features: string[];
    rating: number;
  };
  onChange: (filters: Partial<FilterPanelProps['filters']>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'hatchback', name: 'Hatchback' },
    { id: 'sedan', name: 'Sedan' },
    { id: 'suv', name: 'SUV' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'electric', name: 'Electric' },
    { id: 'vans', name: 'Vans' }
  ];

  const transmissions = [
    { id: '', name: 'Any Transmission' },
    { id: 'automatic', name: 'Automatic' },
    { id: 'manual', name: 'Manual' }
  ];

  const fuelTypes = [
    { id: '', name: 'Any Fuel' },
    { id: 'petrol', name: 'Petrol' },
    { id: 'diesel', name: 'Diesel' },
    { id: 'electric', name: 'Electric' },
    { id: 'hybrid', name: 'Hybrid' }
  ];

  const seatOptions = [
    { id: '', name: 'Any Seats' },
    { id: '2', name: '2+ Seats' },
    { id: '4', name: '4+ Seats' },
    { id: '5', name: '5+ Seats' },
    { id: '7', name: '7+ Seats' }
  ];

  const features = [
    { id: 'gps', name: 'GPS Navigation' },
    { id: 'bluetooth', name: 'Bluetooth' },
    { id: 'sunroof', name: 'Sunroof' },
    { id: 'leather', name: 'Leather Seats' },
    { id: 'heated', name: 'Heated Seats' },
    { id: 'cooled', name: 'Cooled Seats' },
    { id: 'premium', name: 'Premium Audio' },
    { id: 'backup', name: 'Backup Camera' }
  ];

  const ratings = [
    { value: 0, label: 'Any Rating' },
    { value: 3, label: '3+ Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 4.5, label: '4.5+ Stars' }
  ];

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = filters.features.includes(featureId)
      ? filters.features.filter(f => f !== featureId)
      : [...filters.features, featureId];
    onChange({ features: newFeatures });
  };

  const clearAllFilters = () => {
    onChange({
      search: '',
      category: '',
      priceRange: [0, 500],
      transmission: '',
      fuel: '',
      seats: '',
      features: [],
      rating: 0
    });
  };

  const hasActiveFilters = 
    filters.category || 
    filters.transmission || 
    filters.fuel || 
    filters.seats || 
    filters.features.length > 0 || 
    filters.rating > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500;

  return (
    <div className="bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-dark-700/50 sticky top-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="w-5 h-5 text-accent-primary" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-accent-primary hover:text-accent-secondary transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[0]}
              onChange={(e) => onChange({ 
                priceRange: [parseInt(e.target.value), filters.priceRange[1]] 
              })}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) => onChange({ 
                priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
              })}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Transmission
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => onChange({ transmission: e.target.value })}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
          >
            {transmissions.map(transmission => (
              <option key={transmission.id} value={transmission.id}>
                {transmission.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Fuel Type
          </label>
          <select
            value={filters.fuel}
            onChange={(e) => onChange({ fuel: e.target.value })}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
          >
            {fuelTypes.map(fuel => (
              <option key={fuel.id} value={fuel.id}>
                {fuel.name}
              </option>
            ))}
          </select>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Seats
          </label>
          <select
            value={filters.seats}
            onChange={(e) => onChange({ seats: e.target.value })}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
          >
            {seatOptions.map(seat => (
              <option key={seat.id} value={seat.id}>
                {seat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Minimum Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => onChange({ rating: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
          >
            {ratings.map(rating => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Features
          </label>
          <div className="space-y-2">
            {features.map(feature => (
              <label
                key={feature.id}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    filters.features.includes(feature.id)
                      ? 'bg-accent-primary border-accent-primary'
                      : 'border-dark-600 group-hover:border-accent-primary/50'
                  }`}>
                    {filters.features.includes(feature.id) && (
                      <CheckIcon className="w-3 h-3 text-dark-900" />
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                  {feature.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 pt-6 border-t border-dark-700"
        >
          <h4 className="text-sm font-medium text-gray-300 mb-3">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                {categories.find(c => c.id === filters.category)?.name}
              </span>
            )}
            {filters.transmission && (
              <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                {transmissions.find(t => t.id === filters.transmission)?.name}
              </span>
            )}
            {filters.fuel && (
              <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                {fuelTypes.find(f => f.id === filters.fuel)?.name}
              </span>
            )}
            {filters.rating > 0 && (
              <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                {ratings.find(r => r.value === filters.rating)?.label}
              </span>
            )}
            {filters.features.map(featureId => (
              <span key={featureId} className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                {features.find(f => f.id === featureId)?.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FilterPanel;