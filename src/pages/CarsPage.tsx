import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import CarCard from '../components/CarCard';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import ViewToggle from '../components/ViewToggle';
import LoadingSpinner from '../components/LoadingSpinner';

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

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: [0, 500],
    transmission: '',
    fuel: '',
    seats: '',
    features: [] as string[],
    rating: 0
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockCars: Car[] = [
      {
        id: '1',
        name: 'BMW X5',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        category: 'SUV',
        price: 120,
        originalPrice: 150,
        rating: 4.8,
        reviews: 124,
        image: '/images/cars/bmw-x5.jpg',
        features: ['GPS', 'Bluetooth', 'Sunroof', 'Leather Seats'],
        transmission: 'Automatic',
        fuel: 'Petrol',
        seats: 5,
        mileage: 'Unlimited',
        isAvailable: true,
        badge: 'Best Seller',
        badgeColor: 'bg-neon-green'
      },
      {
        id: '2',
        name: 'Tesla Model 3',
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        category: 'Electric',
        price: 90,
        originalPrice: 110,
        rating: 4.9,
        reviews: 89,
        image: '/images/cars/tesla-model3.jpg',
        features: ['Autopilot', 'Supercharger', 'Premium Audio', 'Glass Roof'],
        transmission: 'Automatic',
        fuel: 'Electric',
        seats: 5,
        mileage: '400 km',
        isAvailable: true,
        badge: 'Eco Friendly',
        badgeColor: 'bg-green-500'
      },
      {
        id: '3',
        name: 'Mercedes C-Class',
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2023,
        category: 'Luxury',
        price: 85,
        originalPrice: 100,
        rating: 4.7,
        reviews: 156,
        image: '/images/cars/mercedes-c-class.jpg',
        features: ['Leather', 'Sunroof', 'Premium Audio', 'Navigation'],
        transmission: 'Automatic',
        fuel: 'Petrol',
        seats: 5,
        mileage: 'Unlimited',
        isAvailable: false,
        badge: 'Premium',
        badgeColor: 'bg-neon-purple'
      },
      {
        id: '4',
        name: 'Audi A4',
        brand: 'Audi',
        model: 'A4',
        year: 2023,
        category: 'Sedan',
        price: 75,
        originalPrice: 90,
        rating: 4.6,
        reviews: 98,
        image: '/images/cars/audi-a4.jpg',
        features: ['Quattro', 'Virtual Cockpit', 'Premium Audio', 'LED Lights'],
        transmission: 'Automatic',
        fuel: 'Petrol',
        seats: 5,
        mileage: 'Unlimited',
        isAvailable: true,
        badge: 'Popular',
        badgeColor: 'bg-neon-blue'
      },
      {
        id: '5',
        name: 'Honda Civic',
        brand: 'Honda',
        model: 'Civic',
        year: 2023,
        category: 'Hatchback',
        price: 45,
        rating: 4.5,
        reviews: 203,
        image: '/images/cars/honda-civic.jpg',
        features: ['Honda Sensing', 'Apple CarPlay', 'Android Auto', 'Lane Keep Assist'],
        transmission: 'Automatic',
        fuel: 'Petrol',
        seats: 5,
        mileage: 'Unlimited',
        isAvailable: true
      },
      {
        id: '6',
        name: 'Toyota Camry',
        brand: 'Toyota',
        model: 'Camry',
        year: 2023,
        category: 'Sedan',
        price: 55,
        rating: 4.4,
        reviews: 167,
        image: '/images/cars/toyota-camry.jpg',
        features: ['Toyota Safety Sense', 'Wireless Charging', 'JBL Audio', 'Heated Seats'],
        transmission: 'Automatic',
        fuel: 'Hybrid',
        seats: 5,
        mileage: 'Unlimited',
        isAvailable: true
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort cars
  useEffect(() => {
    let filtered = [...cars];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(car => car.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(car =>
      car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    // Transmission filter
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Fuel filter
    if (filters.fuel) {
      filtered = filtered.filter(car => car.fuel === filters.fuel);
    }

    // Seats filter
    if (filters.seats) {
      filtered = filtered.filter(car => car.seats >= parseInt(filters.seats));
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(car => car.rating >= filters.rating);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Recommended (default)
        break;
    }

    setFilteredCars(filtered);
  }, [cars, filters, sortBy]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-gradient">Fleet</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Choose from our premium collection of vehicles
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={filters.search}
                onChange={(value) => handleFilterChange({ search: value })}
                placeholder="Search cars by name, brand, or model..."
              />
            </div>
            <div className="flex gap-4">
              <SortDropdown
                value={sortBy}
                onChange={setSortBy}
              />
              <ViewToggle
                mode={viewMode}
                onChange={setViewMode}
              />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80"
          >
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
            />
          </motion.div>

          {/* Cars Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-300">
                Showing {filteredCars.length} of {cars.length} cars
              </div>
              <div className="text-sm text-gray-400">
                {filters.search && `Results for "${filters.search}"`}
              </div>
            </div>

            {/* Cars Display */}
            {filteredCars.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CarCard
                      car={car}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No cars found
                </h3>
                <p className="text-gray-300 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => setFilters({
                    search: '',
                    category: '',
                    priceRange: [0, 500],
                    transmission: '',
                    fuel: '',
                    seats: '',
                    features: [],
                    rating: 0
                  })}
                  className="px-6 py-3 bg-gradient-neon text-dark-900 font-semibold rounded-lg hover:shadow-neon transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;