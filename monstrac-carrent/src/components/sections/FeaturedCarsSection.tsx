import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { StarIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, UserGroupIcon, CogIcon } from '@heroicons/react/24/outline';
import 'swiper/swiper-bundle.css';

// Mock featured cars data
const featuredCars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    category: 'Electric',
    price: 120,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc33?w=800&q=80',
    features: ['Autopilot', 'Premium Audio', 'All-Wheel Drive'],
    seats: 5,
    transmission: 'Automatic',
    location: 'Los Angeles',
    badge: 'Best Seller',
    badgeColor: 'bg-accent-primary',
  },
  {
    id: 2,
    name: 'BMW X5',
    category: 'Luxury SUV',
    price: 180,
    rating: 4.8,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    features: ['Panoramic Roof', 'Leather Seats', 'Advanced Safety'],
    seats: 7,
    transmission: 'Automatic',
    location: 'Beverly Hills',
    badge: 'Premium',
    badgeColor: 'bg-accent-secondary',
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    category: 'Luxury Sedan',
    price: 150,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
    features: ['AMG Package', 'Burmester Audio', 'Night Package'],
    seats: 5,
    transmission: 'Automatic',
    location: 'Santa Monica',
    badge: 'Top Rated',
    badgeColor: 'bg-accent-success',
  },
  {
    id: 4,
    name: 'Audi Q7',
    category: 'SUV',
    price: 160,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1606664515524-ed9f786329ac?w=800&q=80',
    features: ['Virtual Cockpit', 'Matrix LED', 'Quattro AWD'],
    seats: 7,
    transmission: 'Automatic',
    location: 'Malibu',
    badge: 'Family Choice',
    badgeColor: 'bg-accent-warning',
  },
  {
    id: 5,
    name: 'Porsche 911',
    category: 'Sports',
    price: 300,
    rating: 5.0,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    features: ['Sport Chrono', 'PASM', 'Turbo Engine'],
    seats: 2,
    transmission: 'Manual',
    location: 'Hollywood',
    badge: 'Exclusive',
    badgeColor: 'bg-gradient-to-r from-accent-primary to-accent-secondary',
  },
];

const FeaturedCarsSection = () => {
  const navigate = useNavigate();
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);

  const handleQuickBook = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would add to cart or start booking flow
    navigate(`/cars/${carId}`, { state: { quickBook: true } });
  };

  const handleViewDetails = (carId: number) => {
    navigate(`/cars/${carId}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-dark-900/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl" />
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Featured <span className="glow-text">Vehicles</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Handpicked premium cars for an exceptional driving experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="featured-cars-swiper"
          >
            {featuredCars.map((car) => (
              <SwiperSlide key={car.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setHoveredCar(car.id)}
                  onHoverEnd={() => setHoveredCar(null)}
                  onClick={() => handleViewDetails(car.id)}
                  className="card overflow-hidden cursor-pointer group h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${car.badgeColor}`}>
                      {car.badge}
                    </div>

                    {/* Quick Actions Overlay */}
                    <AnimatePresence>
                      {hoveredCar === car.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                            flex items-end justify-center pb-4"
                        >
                          <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            onClick={(e) => handleQuickBook(car.id, e)}
                            className="btn-primary py-2 px-6 text-sm"
                          >
                            Quick Book
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 3D Preview Button */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full 
                      flex items-center justify-center text-white hover:bg-accent-primary/20 transition-colors duration-300
                      group-hover:scale-110"
                    >
                      <SparklesIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title and Category */}
                    <div className="mb-3">
                      <h3 className="font-display font-semibold text-lg text-white group-hover:text-accent-primary 
                        transition-colors duration-300"
                      >
                        {car.name}
                      </h3>
                      <p className="text-sm text-gray-400">{car.category}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(car.rating)
                                ? 'text-yellow-400'
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {car.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-dark-800 text-gray-300 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {car.features.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-dark-800 text-gray-300 rounded">
                          +{car.features.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{car.seats} Seats</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <CogIcon className="w-4 h-4" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{car.location}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between pt-3 border-t border-dark-700">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          ${car.price}
                          <span className="text-sm font-normal text-gray-400">/day</span>
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(car.id);
                        }}
                        className="text-accent-primary hover:text-accent-primary/80 font-medium text-sm
                          flex items-center space-x-1 transition-colors duration-300"
                      >
                        <span>View Details</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Custom Swiper Styles */}
        <style>{`
          .featured-cars-swiper .swiper-button-prev,
          .featured-cars-swiper .swiper-button-next {
            color: #00d9ff;
            background: rgba(39, 39, 42, 0.8);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            backdrop-filter: blur(8px);
          }
          
          .featured-cars-swiper .swiper-button-prev:after,
          .featured-cars-swiper .swiper-button-next:after {
            font-size: 20px;
          }
          
          .featured-cars-swiper .swiper-pagination-bullet {
            background: #52525b;
            opacity: 1;
          }
          
          .featured-cars-swiper .swiper-pagination-bullet-active {
            background: #00d9ff;
          }
        `}</style>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;