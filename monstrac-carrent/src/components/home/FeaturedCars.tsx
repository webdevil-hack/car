import { motion } from 'framer-motion';
import { Star, Users, Gauge, Fuel, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCars } from '../../data/mockData';

const FeaturedCars = () => {
  const navigate = useNavigate();
  const featuredCars = mockCars.slice(0, 6);

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Featured Cars</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Handpicked premium vehicles for an unforgettable driving experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-hover overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {car.popularityScore > 90 && (
                  <div className="absolute top-4 right-4 bg-neon-green/20 backdrop-blur-sm border border-neon-green px-3 py-1 rounded-full text-xs font-semibold text-neon-green">
                    BEST SELLER
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-primary transition-colors">
                      {car.title}
                    </h3>
                    <p className="text-sm text-gray-400">{car.brand} {car.model}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-dark-bg px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-white">{car.rating}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-accent-primary" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Gauge className="w-4 h-4 text-accent-primary" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fuel className="w-4 h-4 text-accent-primary" />
                    <span>{car.fuelType}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                  <div>
                    <div className="text-2xl font-bold glow-text">₹{car.pricePerDay}</div>
                    <div className="text-xs text-gray-500">per day</div>
                  </div>
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="btn-primary text-sm flex items-center space-x-2"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/cars')}
            className="btn-secondary px-8 py-4 text-lg"
          >
            View All Cars
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCars;
