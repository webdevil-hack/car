import { Star, Users, Gauge, Fuel, MapPin, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Car } from '../../data/mockData';

interface CarCardProps {
  car: Car;
  viewMode: 'grid' | 'list';
}

const CarCard = ({ car, viewMode }: CarCardProps) => {
  const navigate = useNavigate();

  if (viewMode === 'list') {
    return (
      <div className="card-hover overflow-hidden flex flex-col sm:flex-row group">
        <div className="sm:w-1/3 h-56 sm:h-auto relative overflow-hidden">
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
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-accent-primary transition-colors">
                {car.title}
              </h3>
              <p className="text-gray-400">{car.brand} {car.model} • {car.year}</p>
            </div>
            <div className="flex items-center space-x-1 bg-dark-bg px-3 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-white">{car.rating}</span>
              <span className="text-xs text-gray-500">({car.reviews})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-accent-primary" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-accent-primary" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Fuel className="w-4 h-4 text-accent-primary" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-accent-primary" />
              <span>{car.mileagePerDay} km/day</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {car.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-dark-bg rounded-full text-xs text-gray-400 border border-dark-border"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-border">
            <div>
              <div className="text-3xl font-bold glow-text">₹{car.pricePerDay}</div>
              <div className="text-xs text-gray-500">per day • ₹{car.pricePerHour}/hr</div>
            </div>
            <button
              onClick={() => navigate(`/cars/${car.id}`)}
              className="btn-primary flex items-center space-x-2"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-hover overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {car.popularityScore > 90 && (
          <div className="absolute top-4 right-4 bg-neon-green/20 backdrop-blur-sm border border-neon-green px-3 py-1 rounded-full text-xs font-semibold text-neon-green flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>POPULAR</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

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

        <div className="grid grid-cols-3 gap-3 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-accent-primary" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center space-x-1">
            <Gauge className="w-4 h-4 text-accent-primary" />
            <span>{car.transmission.slice(0, 4)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Fuel className="w-4 h-4 text-accent-primary" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-dark-border">
          <div>
            <div className="text-2xl font-bold glow-text">₹{car.pricePerDay}</div>
            <div className="text-xs text-gray-500">per day</div>
          </div>
          <button
            onClick={() => navigate(`/cars/${car.id}`)}
            className="btn-primary text-sm flex items-center space-x-2"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
