import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CalendarDaysIcon, 
  UserGroupIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const BookingFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    passengers: '1',
    driverRequired: false,
    promoCode: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 bg-dark-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Find Your Perfect Ride
            </h2>
            <p className="text-gray-300 text-lg">
              Search from our premium fleet and book in just a few clicks
            </p>
          </div>

          <div className="bg-dark-800/80 backdrop-blur-md rounded-2xl p-8 border border-dark-700/50 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Main Search Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>Pickup Location</span>
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Enter pickup location"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                    required
                  />
                </div>

                {/* Drop-off Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>Drop-off Location (Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    placeholder="Enter drop-off location"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Date and Time Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>Pickup Date & Time</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                      required
                    />
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>Return Date & Time</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                      required
                    />
                    <input
                      type="time"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Passengers and Driver */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>Passengers</span>
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Driver Required
                  </label>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="driverRequired"
                        checked={formData.driverRequired}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-accent-primary bg-dark-700 border-dark-600 rounded focus:ring-accent-primary focus:ring-2"
                      />
                      <span className="text-sm text-gray-300">Yes, I need a driver</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Promo Code (Optional)
                </label>
                <input
                  type="text"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                  placeholder="Enter promo code"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                />
              </div>

              {/* Advanced Options Toggle */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-2 text-accent-primary hover:text-accent-secondary transition-colors duration-200"
                >
                  <Cog6ToothIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                  </span>
                </button>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-4 border-t border-dark-700"
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Car Type</label>
                      <select className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200">
                        <option value="">Any Type</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="luxury">Luxury</option>
                        <option value="electric">Electric</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Price Range</label>
                      <select className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200">
                        <option value="">Any Price</option>
                        <option value="0-50">$0 - $50/day</option>
                        <option value="50-100">$50 - $100/day</option>
                        <option value="100-200">$100 - $200/day</option>
                        <option value="200+">$200+/day</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Transmission</label>
                      <select className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200">
                        <option value="">Any</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Search Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-neon text-dark-900 font-bold rounded-xl hover:shadow-neon-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span>Search Available Cars</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingFormSection;