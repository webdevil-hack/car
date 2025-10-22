import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  StarIcon,
  HeartIcon,
  EyeIcon,
  BoltIcon,
  UserGroupIcon,
  CogIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const FeaturedCarsSection: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const featuredCars = [
    {
      id: '1',
      name: 'BMW X5',
      category: 'Luxury SUV',
      image: '/images/cars/bmw-x5.jpg',
      price: 120,
      originalPrice: 150,
      rating: 4.8,
      reviews: 124,
      features: ['Automatic', '4 Seats', 'GPS', 'Bluetooth'],
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: 'Unlimited',
      badge: 'Best Seller',
      badgeColor: 'bg-neon-green',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Tesla Model 3',
      category: 'Electric Sedan',
      image: '/images/cars/tesla-model3.jpg',
      price: 90,
      originalPrice: 110,
      rating: 4.9,
      reviews: 89,
      features: ['Electric', '5 Seats', 'Autopilot', 'Supercharger'],
      transmission: 'Automatic',
      fuel: 'Electric',
      mileage: '400 km',
      badge: 'Eco Friendly',
      badgeColor: 'bg-green-500',
      isAvailable: true
    },
    {
      id: '3',
      name: 'Mercedes C-Class',
      category: 'Luxury Sedan',
      image: '/images/cars/mercedes-c-class.jpg',
      price: 85,
      originalPrice: 100,
      rating: 4.7,
      reviews: 156,
      features: ['Automatic', '5 Seats', 'Leather', 'Sunroof'],
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: 'Unlimited',
      badge: 'Premium',
      badgeColor: 'bg-neon-purple',
      isAvailable: false
    },
    {
      id: '4',
      name: 'Audi A4',
      category: 'Executive Sedan',
      image: '/images/cars/audi-a4.jpg',
      price: 75,
      originalPrice: 90,
      rating: 4.6,
      reviews: 98,
      features: ['Automatic', '5 Seats', 'Quattro', 'Virtual Cockpit'],
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: 'Unlimited',
      badge: 'Popular',
      badgeColor: 'bg-neon-blue',
      isAvailable: true
    }
  ];

  const toggleFavorite = (carId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
      } else {
        newFavorites.add(carId);
      }
      return newFavorites;
    });
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured <span className="text-gradient">Vehicles</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our most popular and highly-rated vehicles from our premium fleet
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="relative bg-dark-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-dark-700/50 hover:border-accent-primary/50 transition-all duration-300 group-hover:shadow-neon h-full">
                {/* Badge */}
                {car.badge && (
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 ${car.badgeColor} text-white text-xs font-bold rounded-full`}>
                    {car.badge}
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-4 right-4 z-10 p-2 bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-dark-700 transition-colors duration-200"
                >
                  {favorites.has(car.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  )}
                </button>

                {/* Car Image */}
                <div className="relative h-48 bg-gradient-to-br from-dark-700 to-dark-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent z-10"></div>
                  <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <TruckIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  
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
                    <p className="text-sm text-gray-400">{car.category}</p>
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
                      {car.rating} ({car.reviews} reviews)
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
                      {car.originalPrice > car.price && (
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
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/cars"
            className="inline-flex items-center px-8 py-4 border-2 border-accent-primary text-accent-primary font-bold rounded-xl hover:bg-accent-primary hover:text-dark-900 transition-all duration-300 transform hover:scale-105"
          >
            View All Cars
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;