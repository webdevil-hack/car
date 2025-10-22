import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowRight, Calendar, MapPin, Car as CarIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BookingConfirmation = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 md:p-12 text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-16 h-16 text-neon-green" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Booking <span className="glow-text">Confirmed!</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              Your booking has been successfully confirmed. We've sent you a confirmation email with all the details.
            </p>

            {/* Booking ID */}
            <div className="bg-dark-bg rounded-lg p-6 mb-8">
              <div className="text-sm text-gray-500 mb-2">Booking ID</div>
              <div className="text-2xl font-bold glow-text font-mono">{id}</div>
            </div>

            {/* Booking Details */}
            <div className="bg-dark-bg rounded-lg p-6 mb-8 text-left space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Booking Details</h3>
              
              <div className="flex items-start space-x-3">
                <CarIcon className="w-5 h-5 text-accent-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Vehicle</div>
                  <div className="text-white font-medium">Tesla Model 3 Performance</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-accent-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="text-white font-medium">Oct 25, 2024 - Oct 28, 2024 (3 days)</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Pickup Location</div>
                  <div className="text-white font-medium">Mumbai - BKC</div>
                </div>
              </div>

              <div className="pt-4 border-t border-dark-border flex justify-between items-center">
                <span className="text-gray-400">Total Amount Paid</span>
                <span className="text-2xl font-bold glow-text">₹4,500</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <button className="btn-primary flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Invoice</span>
              </button>
              <Link to="/dashboard/customer" className="btn-secondary flex items-center justify-center space-x-2">
                <span>View Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Next Steps */}
            <div className="mt-8 pt-8 border-t border-dark-border text-left">
              <h3 className="text-lg font-bold text-white mb-4">What's Next?</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-accent-primary">•</span>
                  <span>You'll receive a reminder 24 hours before your pickup time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-primary">•</span>
                  <span>Bring your driving license and a valid ID for verification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-primary">•</span>
                  <span>Contact our 24/7 support if you have any questions</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
