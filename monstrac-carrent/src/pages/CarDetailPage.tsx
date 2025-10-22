import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star,
  Users,
  Gauge,
  Fuel,
  MapPin,
  Shield,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { mockCars } from '../data/mockData';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const car = mockCars.find((c) => c.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDays, setBookingDays] = useState(3);
  const [includeDriver, setIncludeDriver] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Car Not Found</h1>
          <button onClick={() => navigate('/cars')} className="btn-primary">
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  const driverCost = 500;
  const subtotal = car.pricePerDay * bookingDays + (includeDriver ? driverCost * bookingDays : 0);
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue booking');
      navigate('/login');
      return;
    }

    // Simulate booking
    toast.success('Proceeding to payment...');
    setTimeout(() => {
      navigate(`/booking/confirmation/${Math.random().toString(36).substr(2, 9)}`);
    }, 1500);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-400 hover:text-accent-primary transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Cars</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="card overflow-hidden">
                <div className="relative h-96">
                  <img
                    src={car.images[currentImageIndex]}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-card/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-accent-primary transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-card/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-accent-primary transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
                {/* Thumbnails */}
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {car.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-accent-primary'
                          : 'border-dark-border hover:border-gray-500'
                      }`}
                    >
                      <img src={img} alt={`${car.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Info */}
              <div className="card p-6 space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{car.title}</h1>
                      <p className="text-gray-400">
                        {car.brand} {car.model} • {car.year}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 bg-dark-bg px-3 py-2 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-lg font-semibold text-white">{car.rating}</span>
                      <span className="text-sm text-gray-500">({car.reviews} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">{car.description}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Users, label: 'Seats', value: car.seats },
                    { icon: Gauge, label: 'Transmission', value: car.transmission },
                    { icon: Fuel, label: 'Fuel', value: car.fuelType },
                    { icon: MapPin, label: 'Mileage/day', value: `${car.mileagePerDay}km` },
                  ].map((stat, index) => (
                    <div key={index} className="bg-dark-bg rounded-lg p-4 text-center">
                      <stat.icon className="w-6 h-6 text-accent-primary mx-auto mb-2" />
                      <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                      <div className="font-semibold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-300">
                        <Check className="w-4 h-4 text-accent-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      { label: 'Registration', value: car.registration },
                      { label: 'Color', value: car.color },
                      { label: 'Deposit', value: `₹${car.deposit}` },
                      { label: 'Extra km charge', value: `₹${car.extraKmCharge}/km` },
                    ].map((spec, index) => (
                      <div key={index}>
                        <div className="text-gray-500">{spec.label}</div>
                        <div className="text-white font-medium">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="card p-6 space-y-6">
                  <div>
                    <div className="text-4xl font-bold glow-text mb-1">₹{car.pricePerDay}</div>
                    <div className="text-sm text-gray-500">per day</div>
                    <div className="text-sm text-gray-400 mt-1">
                      ₹{car.pricePerHour}/hr • ₹{car.pricePerWeek}/week
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Number of Days
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={bookingDays}
                        onChange={(e) => setBookingDays(parseInt(e.target.value) || 1)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="input-field"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-accent-primary" />
                        <span className="text-sm text-gray-300">Include Driver</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeDriver}
                        onChange={(e) => setIncludeDriver(e.target.checked)}
                        className="w-5 h-5 rounded border-dark-border bg-dark-card text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
                      />
                    </div>

                    {includeDriver && (
                      <div className="text-sm text-gray-400 px-4">
                        + ₹{driverCost}/day for driver
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 pt-4 border-t border-dark-border text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal ({bookingDays} days)</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Taxes & Fees (18%)</span>
                      <span>₹{taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Refundable Deposit</span>
                      <span>₹{car.deposit}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-dark-border">
                      <span>Total</span>
                      <span className="glow-text">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button onClick={handleBooking} className="btn-primary w-full py-4 text-lg">
                    Book Now
                  </button>

                  <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Insured</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Free Cancellation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetailPage;
