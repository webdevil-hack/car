import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const BookingForm = () => {
  const navigate = useNavigate();
  const { updateBookingFilters } = useStore();
  
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    passengers: '2',
    withDriver: false,
    promoCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickupLocation || !formData.pickupDate || !formData.returnDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    updateBookingFilters({
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation || formData.pickupLocation,
      pickupDate: new Date(formData.pickupDate + 'T' + formData.pickupTime),
      returnDate: new Date(formData.returnDate + 'T' + formData.returnTime),
      withDriver: formData.withDriver,
    });

    toast.success('Searching for available cars...');
    navigate('/cars');
  };

  const locations = [
    'Mumbai - BKC',
    'Mumbai - Andheri',
    'Delhi - Connaught Place',
    'Bangalore - Koramangala',
    'Pune - Hinjewadi',
    'Hyderabad - HITEC City',
  ];

  return (
    <section id="booking" className="py-20 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="card p-8 max-w-6xl mx-auto shadow-2xl">
            <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">
              Find Your Perfect Ride
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location & Date Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-accent-primary" />
                    <span>Pickup Location *</span>
                  </label>
                  <select
                    className="input-field"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    required
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropoff Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-neon-purple" />
                    <span>Drop-off Location</span>
                  </label>
                  <select
                    className="input-field"
                    value={formData.dropoffLocation}
                    onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                  >
                    <option value="">Same as pickup</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pickup Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-accent-primary" />
                    <span>Pickup Date *</span>
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-neon-purple" />
                    <span>Return Date *</span>
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              {/* Time & Passengers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Pickup Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Pickup Time</label>
                  <input
                    type="time"
                    className="input-field"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  />
                </div>

                {/* Return Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Return Time</label>
                  <input
                    type="time"
                    className="input-field"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                  />
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-accent-primary" />
                    <span>Passengers</span>
                  </label>
                  <select
                    className="input-field"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Promo Code</label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="input-field"
                    value={formData.promoCode}
                    onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                  />
                </div>
              </div>

              {/* Driver Toggle & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, withDriver: !formData.withDriver })}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all ${
                    formData.withDriver
                      ? 'bg-accent-primary/10 border-accent-primary text-accent-primary'
                      : 'bg-dark-bg border-dark-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {formData.withDriver ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                  <span className="font-medium">Include Driver</span>
                </button>

                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Cars</span>
                </button>
              </div>

              {/* Advanced Options Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/cars')}
                  className="text-sm text-accent-primary hover:text-neon-purple transition-colors"
                >
                  Advanced Filters & Options →
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
