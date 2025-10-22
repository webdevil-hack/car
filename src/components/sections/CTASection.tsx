import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GiftIcon,
  ShareIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-accent-primary">
                <GiftIcon className="w-6 h-6" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Get</span>
                <br />
                <span className="text-gradient">20% Off</span>
                <br />
                <span className="text-white">Your First Rental</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Join thousands of satisfied customers and experience premium car rental service. 
                Use code <span className="text-accent-primary font-bold">WELCOME20</span> at checkout.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/cars"
                className="px-8 py-4 bg-gradient-neon text-dark-900 font-bold rounded-xl hover:shadow-neon-lg transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center space-x-2"
              >
                <span>Book Now</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/signup"
                className="px-8 py-4 border-2 border-accent-primary text-accent-primary font-semibold rounded-xl hover:bg-accent-primary hover:text-dark-900 transition-all duration-300 text-center"
              >
                Sign Up Free
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                <span>10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Referral Program */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/50">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-neon rounded-full flex items-center justify-center mx-auto">
                  <ShareIcon className="w-10 h-10 text-dark-900" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Refer & Earn
                  </h3>
                  <p className="text-gray-300">
                    Invite friends and earn $25 for each successful referral
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                    <span className="text-gray-300">Your Referral Code</span>
                    <span className="text-accent-primary font-bold">MONSTRAC2024</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-dark-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent-primary">$25</div>
                      <div className="text-sm text-gray-400">Per Referral</div>
                    </div>
                    <div className="p-4 bg-dark-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent-primary">$50</div>
                      <div className="text-sm text-gray-400">Friend Gets</div>
                    </div>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold rounded-lg hover:shadow-neon transition-all duration-300">
                  Share Referral Link
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🚗', title: 'Premium Fleet', desc: 'Luxury vehicles' },
                { icon: '⚡', title: 'Instant Booking', desc: 'Book in minutes' },
                { icon: '🛡️', title: 'Fully Insured', desc: 'Complete coverage' },
                { icon: '📱', title: 'Mobile App', desc: 'Easy management' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-dark-800/50 rounded-lg text-center hover:bg-dark-700/50 transition-colors duration-200"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {feature.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;