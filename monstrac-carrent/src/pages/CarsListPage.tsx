import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal, X } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CarCard from '../components/cars/CarCard';
import FilterSidebar from '../components/cars/FilterSidebar';
import { mockCars } from '../data/mockData';
import { useStore } from '../store/useStore';

const CarsListPage = () => {
  const { bookingFilters } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [filteredCars, setFilteredCars] = useState(mockCars);

  useEffect(() => {
    let result = [...mockCars];

    // Apply filters
    if (bookingFilters.carType.length > 0) {
      result = result.filter((car) =>
        bookingFilters.carType.includes(car.category)
      );
    }

    if (bookingFilters.transmission.length > 0) {
      result = result.filter((car) =>
        bookingFilters.transmission.includes(car.transmission)
      );
    }

    if (bookingFilters.fuelType.length > 0) {
      result = result.filter((car) =>
        bookingFilters.fuelType.includes(car.fuelType)
      );
    }

    if (bookingFilters.seats) {
      result = result.filter((car) => car.seats >= parseInt(bookingFilters.seats));
    }

    // Price range filter
    result = result.filter(
      (car) =>
        car.pricePerDay >= bookingFilters.priceRange[0] &&
        car.pricePerDay <= bookingFilters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'popular':
        result.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended
        result.sort((a, b) => b.popularityScore * b.rating - a.popularityScore * a.rating);
    }

    setFilteredCars(result);
  }, [bookingFilters, sortBy]);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Browse Our <span className="glow-text">Fleet</span>
            </h1>
            <p className="text-gray-400 text-lg">
              {filteredCars.length} cars available
              {bookingFilters.pickupLocation && ` in ${bookingFilters.pickupLocation}`}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                {/* View Toggle & Filter Button */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden btn-outline flex items-center space-x-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
                  </button>

                  <div className="flex items-center bg-dark-card rounded-lg p-1 border border-dark-border">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-accent-primary text-dark-bg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list'
                          ? 'bg-accent-primary text-dark-bg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field py-2 text-sm"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Mobile Filters Modal */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/80 z-50 lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-80 bg-dark-card overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="sticky top-0 bg-dark-card border-b border-dark-border p-4 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">Filters</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="p-4">
                      <FilterSidebar />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Cars Grid/List */}
              {filteredCars.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'
                      : 'space-y-6'
                  }
                >
                  {filteredCars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CarCard car={car} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No cars found</h3>
                  <p className="text-gray-400">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarsListPage;
