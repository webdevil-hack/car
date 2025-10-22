import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import CarCard from '../components/CarCard';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import ViewToggle from '../components/ViewToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import apiService from '../services/api';

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
    priceRange: [0, 500] as [number, number],
    transmission: '',
    fuel: '',
    seats: '',
    features: [] as string[],
    rating: 0
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCars: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCars({
          page: pagination.currentPage,
          limit: 12,
          category: filters.category || undefined,
          minPrice: filters.priceRange[0] || undefined,
          maxPrice: filters.priceRange[1] || undefined,
          brand: filters.search || undefined,
          transmission: filters.transmission || undefined,
          fuelType: filters.fuel || undefined,
          seats: filters.seats || undefined,
          search: filters.search || undefined,
          sortBy: sortBy === 'recommended' ? 'createdAt' : sortBy,
          sortOrder: 'desc'
        });
        
        setCars(response.data.cars);
        setFilteredCars(response.data.cars);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching cars:', error);
        // Fallback to mock data if API fails
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
          }
        ];
        setCars(mockCars);
        setFilteredCars(mockCars);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters, sortBy, pagination.currentPage]);

  // Apply filters locally for immediate feedback
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
      filtered = filtered.filter(car => car.seats === parseInt(filters.seats));
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(car => car.rating >= filters.rating);
    }

    // Features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(car =>
        filters.features.every(feature =>
          car.features.some(carFeature =>
            carFeature.toLowerCase().includes(feature.toLowerCase())
          )
        )
      );
    }

    setFilteredCars(filtered);
  }, [cars, filters]);

  // Sort cars
  useEffect(() => {
    let sorted = [...filteredCars];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for 'recommended'
        break;
    }

    setFilteredCars(sorted);
  }, [filteredCars, sortBy]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Our Fleet</h1>
          <p className="text-gray-400 text-lg">
            Choose from our premium collection of vehicles
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex gap-4">
              <SortDropdown value={sortBy} onChange={handleSortChange} />
              <ViewToggle value={viewMode} onChange={handleViewModeChange} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-400">
                    Showing {filteredCars.length} of {pagination.totalCars} cars
                  </p>
                </div>

                {/* Cars Grid */}
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }>
                  {filteredCars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-4 py-2 bg-dark-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-700 transition-colors"
                    >
                      Previous
                    </button>
                    
                    {[...Array(pagination.totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            page === pagination.currentPage
                              ? 'bg-gradient-neon text-dark-900'
                              : 'bg-dark-800 text-white hover:bg-dark-700'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-4 py-2 bg-dark-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;