import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const bookingSchema = z.object({
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  dropoffLocation: z.string().optional(),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  returnDate: z.string().min(1, 'Return date is required'),
  returnTime: z.string().min(1, 'Return time is required'),
  driverRequired: z.boolean(),
  passengers: z.string(),
  promoCode: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingFormSection = () => {
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [carType, setCarType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      driverRequired: false,
      passengers: '4',
    },
  });

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking form data:', data);
    // In a real app, this would save the search criteria and navigate
    navigate('/cars', { 
      state: { 
        searchCriteria: data,
        carType,
        priceRange,
      } 
    });
    toast.success('Searching for available cars...');
  };

  return (
    <section className="py-16 lg:py-24 bg-dark-900/50 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Find Your Perfect <span className="glow-text">Ride</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Search from our premium fleet of vehicles. Best prices guaranteed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6 lg:p-8 max-w-6xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Main form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    {...register('pickupLocation')}
                    type="text"
                    placeholder="Enter pickup location"
                    className="input-field pl-10 w-full"
                  />
                </div>
                {errors.pickupLocation && (
                  <p className="mt-1 text-sm text-red-400">{errors.pickupLocation.message}</p>
                )}
              </div>

              {/* Dropoff Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Drop-off Location (Optional)
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    {...register('dropoffLocation')}
                    type="text"
                    placeholder="Same as pickup"
                    className="input-field pl-10 w-full"
                  />
                </div>
              </div>

              {/* Pickup Date & Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pickup Date & Time
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register('pickupDate')}
                      type="date"
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="input-field pl-10 w-full"
                    />
                  </div>
                  <div className="relative w-24">
                    <ClockIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      {...register('pickupTime')}
                      type="time"
                      className="input-field pl-8 w-full"
                    />
                  </div>
                </div>
                {(errors.pickupDate || errors.pickupTime) && (
                  <p className="mt-1 text-sm text-red-400">Date and time are required</p>
                )}
              </div>

              {/* Return Date & Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Return Date & Time
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register('returnDate')}
                      type="date"
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="input-field pl-10 w-full"
                    />
                  </div>
                  <div className="relative w-24">
                    <ClockIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      {...register('returnTime')}
                      type="time"
                      className="input-field pl-8 w-full"
                    />
                  </div>
                </div>
                {(errors.returnDate || errors.returnTime) && (
                  <p className="mt-1 text-sm text-red-400">Date and time are required</p>
                )}
              </div>

              {/* Driver Required */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Driver Required?
                </label>
                <div className="flex items-center space-x-4 h-[50px]">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      {...register('driverRequired')}
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-600 bg-dark-800 text-accent-primary 
                        focus:ring-accent-primary/50 focus:ring-offset-0"
                    />
                    <span className="text-gray-300">Yes, I need a driver</span>
                  </label>
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Passengers
                </label>
                <div className="relative">
                  <UserGroupIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select
                    {...register('passengers')}
                    className="input-field pl-10 w-full appearance-none"
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5 Passengers</option>
                    <option value="6">6 Passengers</option>
                    <option value="7">7 Passengers</option>
                    <option value="8">8+ Passengers</option>
                  </select>
                </div>
              </div>

              {/* Promo Code */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Promo Code (Optional)
                </label>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    {...register('promoCode')}
                    type="text"
                    placeholder="Enter promo code"
                    className="input-field pl-10 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-2 text-accent-primary hover:text-accent-primary/80 
                  transition-colors duration-300"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Car Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Car Type
                    </label>
                    <select
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      className="input-field w-full appearance-none"
                    >
                      <option value="all">All Types</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="luxury">Luxury</option>
                      <option value="electric">Electric</option>
                      <option value="van">Van</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price Range (per day)
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">${priceRange[0]}</span>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1 h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-gray-400">${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Vehicle Features
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['AC', 'GPS', 'Bluetooth', 'Child Seat', 'WiFi', 'USB Charging'].map((feature) => (
                      <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-600 bg-dark-800 text-accent-primary 
                            focus:ring-accent-primary/50 focus:ring-offset-0"
                        />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary px-12 py-4 text-lg font-semibold min-w-[300px]"
              >
                Search Available Cars
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingFormSection;