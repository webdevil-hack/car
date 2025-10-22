import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  StarIcon,
  HeartIcon,
  EyeIcon,
  BoltIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import CarImage from './CarImage';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  transmission: string;
  fuel: string;
  seats: number;
  mileage: string;
  isAvailable: boolean;
  badge?: string;
  badgeColor?: string;
}

interface CarCardProps {
  car: Car;
  viewMode: 'grid' | 'list';
}

const CarCard: React.FC<CarCardProps> = ({ car, viewMode }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <Link to={`/cars/${car.id}`}>
          <div className="bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 hover:border-accent-primary/50 transition-all duration-300 group-hover:shadow-neon overflow-hidden">
            <div className="flex">
              {/* Image */}
              <div className="w-64 h-48 bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center relative p-4">
                <CarImage
                  carName={car.name}
                  brand={car.brand}
                  price={car.price}
                  size="lg"
                  animated={true}
                  glow={true}
                />
                
                {/* Badge */}
                {car.badge && (
                  <div className={`absolute top-4 left-4 px-3 py-1 ${car.badgeColor} text-white text-xs font-bold rounded-full`}>
                    {car.badge}
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={toggleFavorite}
                  className="absolute top-4 right-4 p-2 bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-dark-700 transition-colors duration-200"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  )}
                </button>

                {/* Availability Overlay */}
                {!car.isAvailable && (
                  <div className="absolute inset-0 bg-dark-900/80 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Unavailable</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-primary transition-colors duration-300">
                      {car.name}
                    </h3>
                    <p className="text-gray-400">{car.brand} {car.model} • {car.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">${car.price}</div>
                    <div className="text-sm text-gray-400">per day</div>
                    {car.originalPrice && car.originalPrice > car.price && (
                      <div className="text-sm text-gray-500 line-through">
                        ${car.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(car.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {car.rating} ({car.reviews} reviews)
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.slice(0, 4).map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-dark-700 text-xs text-gray-300 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {car.features.length > 4 && (
                    <span className="px-2 py-1 bg-dark-700 text-xs text-gray-300 rounded-full">
                      +{car.features.length - 4} more
                    </span>
                  )}
                </div>

                {/* Specs */}
                <div className="grid grid-cols-4 gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <CogIcon className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BoltIcon className="w-4 h-4" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="text-right">
                    <span>{car.mileage}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Link
                    to={`/cars/${car.id}`}
                    className="flex-1 px-6 py-3 bg-gradient-neon text-dark-900 font-semibold rounded-lg hover:shadow-neon transition-all duration-300 text-center"
                  >
                    View Details
                  </Link>
                  <button
                    disabled={!car.isAvailable}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      car.isAvailable
                        ? 'bg-accent-primary text-dark-900 hover:bg-accent-primary/90'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Quick Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/cars/${car.id}`}>
        <div className="bg-dark-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-dark-700/50 hover:border-accent-primary/50 transition-all duration-300 group-hover:shadow-neon h-full">
          {/* Badge */}
          {car.badge && (
            <div className={`absolute top-4 left-4 z-10 px-3 py-1 ${car.badgeColor} text-white text-xs font-bold rounded-full`}>
              {car.badge}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 z-10 p-2 bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-dark-700 transition-colors duration-200"
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
            )}
          </button>

          {/* Car Image */}
          <div className="relative h-48 bg-gradient-to-br from-dark-700 to-dark-800 overflow-hidden flex items-center justify-center p-4">
            <CarImage
              carName={car.name}
              brand={car.brand}
              price={car.price}
              size="lg"
              animated={true}
              glow={true}
            />
            
            {/* Availability Overlay */}
            {!car.isAvailable && (
              <div className="absolute inset-0 bg-dark-900/80 flex items-center justify-center z-20">
                <span className="text-white font-bold text-lg">Unavailable</span>
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="p-6 space-y-4">
            {/* Name and Category */}
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-accent-primary transition-colors duration-300">
                {car.name}
              </h3>
              <p className="text-sm text-gray-400">{car.brand} {car.model} • {car.year}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(car.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {car.rating} ({car.reviews})
              </span>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {car.features.slice(0, 2).map((feature, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-dark-700 text-xs text-gray-300 rounded-full"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 2 && (
                <span className="px-2 py-1 bg-dark-700 text-xs text-gray-300 rounded-full">
                  +{car.features.length - 2} more
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CogIcon className="w-4 h-4" />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BoltIcon className="w-4 h-4" />
                <span>{car.fuel}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">${car.price}</span>
                <span className="text-sm text-gray-400">/day</span>
                {car.originalPrice && car.originalPrice > car.price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${car.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Link
                to={`/cars/${car.id}`}
                className="flex-1 px-4 py-2 bg-gradient-neon text-dark-900 font-semibold rounded-lg hover:shadow-neon transition-all duration-300 text-center"
              >
                View Details
              </Link>
              <button
                disabled={!car.isAvailable}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  car.isAvailable
                    ? 'bg-accent-primary text-dark-900 hover:bg-accent-primary/90'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Quick Book
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;