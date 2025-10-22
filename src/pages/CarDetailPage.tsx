import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  TruckIcon,
  UserGroupIcon,
  CogIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  PhotoIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  status: 'available' | 'rented' | 'maintenance' | 'unavailable';
  location: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  seats: number;
  features: string[];
  images: string[];
  description: string;
  specifications: {
    engine: string;
    horsepower: number;
    torque: number;
    acceleration: number;
    topSpeed: number;
    fuelCapacity: number;
    cargoSpace: number;
    towingCapacity: number;
    safetyRating: number;
  };
  reviews: {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
  }[];
  similarCars: {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
  }[];
}

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: '',
    returnLocation: '',
    driverAge: '',
    additionalDrivers: 0,
    extras: [] as string[],
    insurance: 'basic'
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - in real app, fetch from API based on id
    setCar({
      id: id || '1',
      name: 'BMW X5 xDrive40i',
      brand: 'BMW',
      model: 'X5',
      year: 2023,
      category: 'SUV',
      price: 150,
      rating: 4.8,
      reviewCount: 127,
      status: 'available',
      location: 'Downtown Office',
      mileage: 15000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      seats: 5,
      features: [
        'GPS Navigation',
        'Bluetooth Connectivity',
        'Backup Camera',
        'Leather Seats',
        'Sunroof',
        'Heated Seats',
        'Cruise Control',
        'Lane Departure Warning',
        'Blind Spot Monitoring',
        'Adaptive Cruise Control'
      ],
      images: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
      ],
      description: 'The BMW X5 xDrive40i combines luxury, performance, and versatility in one impressive package. With its powerful turbocharged engine, advanced all-wheel drive system, and premium interior, this SUV delivers an exceptional driving experience whether you\'re navigating city streets or exploring the great outdoors.',
      specifications: {
        engine: '3.0L TwinPower Turbo I6',
        horsepower: 335,
        torque: 330,
        acceleration: 5.3,
        topSpeed: 155,
        fuelCapacity: 21.9,
        cargoSpace: 33.9,
        towingCapacity: 7200,
        safetyRating: 5
      },
      reviews: [
        {
          id: '1',
          userName: 'John Smith',
          userAvatar: '/api/placeholder/40/40',
          rating: 5,
          comment: 'Excellent car! Smooth ride, great handling, and all the features you need. Highly recommended.',
          date: '2024-01-10',
          helpful: 12
        },
        {
          id: '2',
          userName: 'Sarah Johnson',
          userAvatar: '/api/placeholder/40/40',
          rating: 4,
          comment: 'Great SUV with plenty of space. The technology features are impressive and easy to use.',
          date: '2024-01-08',
          helpful: 8
        }
      ],
      similarCars: [
        {
          id: '2',
          name: 'Mercedes GLE',
          image: '/api/placeholder/300/200',
          price: 155,
          rating: 4.7
        },
        {
          id: '3',
          name: 'Audi Q7',
          image: '/api/placeholder/300/200',
          price: 145,
          rating: 4.6
        }
      ]
    });
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-gray-400">Loading car details...</p>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * car.price;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-400/20';
      case 'rented': return 'text-blue-400 bg-blue-400/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/20';
      case 'unavailable': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'specifications', name: 'Specifications' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'location', name: 'Location' }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Search
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 text-gray-400 hover:text-neon-pink transition-colors"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-6 h-6 text-neon-pink" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                  <TruckIcon className="w-32 h-32 text-gray-400" />
                </div>
                <button className="absolute top-4 right-4 p-2 bg-dark-900/80 rounded-lg text-white hover:bg-dark-900 transition-colors">
                  <PhotoIcon className="w-6 h-6" />
                </button>
                <button className="absolute top-4 left-4 p-2 bg-dark-900/80 rounded-lg text-white hover:bg-dark-900 transition-colors">
                  <PlayIcon className="w-6 h-6" />
                </button>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-neon-blue' : 'border-dark-600'
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                        <TruckIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Info */}
            <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{car.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span>{car.year} • {car.mileage.toLocaleString()} mi</span>
                    <span>•</span>
                    <span>{car.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-neon-blue">${car.price}</div>
                  <div className="text-gray-400">per day</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarSolidIcon
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(car.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-white font-medium">{car.rating}</span>
                  <span className="ml-1 text-gray-400">({car.reviewCount} reviews)</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(car.status)}`}>
                  {car.status}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed">{car.description}</p>
            </div>

            {/* Tabs */}
            <div className="bg-dark-800 rounded-xl border border-dark-700">
              <div className="border-b border-dark-700">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-neon-blue text-neon-blue'
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-dark-700 rounded-lg">
                        <UserGroupIcon className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                        <div className="text-white font-semibold">{car.seats}</div>
                        <div className="text-gray-400 text-sm">Seats</div>
                      </div>
                      <div className="text-center p-4 bg-dark-700 rounded-lg">
                        <CogIcon className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                        <div className="text-white font-semibold">{car.transmission}</div>
                        <div className="text-gray-400 text-sm">Transmission</div>
                      </div>
                      <div className="text-center p-4 bg-dark-700 rounded-lg">
                        <BoltIcon className="w-8 h-8 text-neon-green mx-auto mb-2" />
                        <div className="text-white font-semibold">{car.fuelType}</div>
                        <div className="text-gray-400 text-sm">Fuel Type</div>
                      </div>
                      <div className="text-center p-4 bg-dark-700 rounded-lg">
                        <ShieldCheckIcon className="w-8 h-8 text-neon-pink mx-auto mb-2" />
                        <div className="text-white font-semibold">{car.specifications.safetyRating}/5</div>
                        <div className="text-gray-400 text-sm">Safety Rating</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {car.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-gray-300">
                            <CheckCircleIcon className="w-5 h-5 text-neon-green mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Specifications Tab */}
                {activeTab === 'specifications' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Engine & Performance</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Engine</span>
                            <span className="text-white">{car.specifications.engine}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Horsepower</span>
                            <span className="text-white">{car.specifications.horsepower} HP</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Torque</span>
                            <span className="text-white">{car.specifications.torque} lb-ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">0-60 mph</span>
                            <span className="text-white">{car.specifications.acceleration}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Top Speed</span>
                            <span className="text-white">{car.specifications.topSpeed} mph</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Capacity & Dimensions</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Fuel Capacity</span>
                            <span className="text-white">{car.specifications.fuelCapacity} gal</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Cargo Space</span>
                            <span className="text-white">{car.specifications.cargoSpace} cu ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Towing Capacity</span>
                            <span className="text-white">{car.specifications.towingCapacity} lbs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Seating</span>
                            <span className="text-white">{car.seats} passengers</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Mileage</span>
                            <span className="text-white">{car.mileage.toLocaleString()} miles</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Customer Reviews</h3>
                      <button className="bg-gradient-neon text-dark-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Write Review
                      </button>
                    </div>

                    <div className="space-y-4">
                      {car.reviews.map((review) => (
                        <div key={review.id} className="bg-dark-700 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center">
                              <UserGroupIcon className="w-6 h-6 text-dark-900" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-white font-medium">{review.userName}</h4>
                                <div className="flex items-center">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <StarSolidIcon
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-300 mb-3">{review.comment}</p>
                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>{review.date}</span>
                                <button className="text-neon-blue hover:text-neon-purple transition-colors">
                                  Helpful ({review.helpful})
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white">Pickup & Return Location</h3>
                    <div className="bg-dark-700 rounded-lg p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <MapPinIcon className="w-6 h-6 text-neon-blue" />
                        <div>
                          <h4 className="text-white font-medium">{car.location}</h4>
                          <p className="text-gray-400">123 Main Street, Downtown, NY 10001</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400">Interactive Map</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Cars */}
            <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Similar Cars</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.similarCars.map((similarCar) => (
                  <div key={similarCar.id} className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded flex items-center justify-center">
                        <TruckIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{similarCar.name}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarSolidIcon
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(similarCar.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-400 text-sm">{similarCar.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${similarCar.price}</div>
                        <div className="text-gray-400 text-sm">/day</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Book This Car</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Date</label>
                    <input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Return Date</label>
                    <input
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <select
                      value={bookingData.pickupLocation}
                      onChange={(e) => setBookingData({...bookingData, pickupLocation: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    >
                      <option value="">Select location</option>
                      <option value="downtown">Downtown Office</option>
                      <option value="airport">Airport Terminal</option>
                      <option value="city-center">City Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Return Location</label>
                    <select
                      value={bookingData.returnLocation}
                      onChange={(e) => setBookingData({...bookingData, returnLocation: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    >
                      <option value="">Select location</option>
                      <option value="downtown">Downtown Office</option>
                      <option value="airport">Airport Terminal</option>
                      <option value="city-center">City Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Driver Age</label>
                    <select
                      value={bookingData.driverAge}
                      onChange={(e) => setBookingData({...bookingData, driverAge: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    >
                      <option value="">Select age range</option>
                      <option value="21-25">21-25 years</option>
                      <option value="26-30">26-30 years</option>
                      <option value="31-35">31-35 years</option>
                      <option value="36-40">36-40 years</option>
                      <option value="41+">41+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Drivers</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setBookingData({...bookingData, additionalDrivers: Math.max(0, bookingData.additionalDrivers - 1)})}
                        className="p-2 bg-dark-700 border border-dark-600 rounded-lg text-white hover:bg-dark-600 transition-colors"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium">{bookingData.additionalDrivers}</span>
                      <button
                        type="button"
                        onClick={() => setBookingData({...bookingData, additionalDrivers: bookingData.additionalDrivers + 1})}
                        className="p-2 bg-dark-700 border border-dark-600 rounded-lg text-white hover:bg-dark-600 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Insurance</label>
                    <select
                      value={bookingData.insurance}
                      onChange={(e) => setBookingData({...bookingData, insurance: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
                    >
                      <option value="basic">Basic Coverage</option>
                      <option value="premium">Premium Coverage</option>
                      <option value="full">Full Coverage</option>
                    </select>
                  </div>

                  <div className="border-t border-dark-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white">${calculateTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Insurance</span>
                      <span className="text-white">$25</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-300">Taxes & Fees</span>
                      <span className="text-white">${Math.round(calculateTotalPrice() * 0.1)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-neon-blue">${calculateTotalPrice() + 25 + Math.round(calculateTotalPrice() * 0.1)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-gradient-neon text-dark-900 py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;