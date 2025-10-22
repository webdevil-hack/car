import { motion } from 'framer-motion';
import { Gift, Share2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-accent-primary/10 via-dark-card to-neon-purple/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Limited Time Offer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-8 md:p-10 text-center md:text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-accent-primary/20 px-4 py-2 rounded-full mb-6">
                <Gift className="w-5 h-5 text-accent-primary" />
                <span className="text-sm font-semibold text-accent-primary">LIMITED TIME OFFER</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Get <span className="glow-text">25% OFF</span> on Your First Booking!
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                New customers get an exclusive discount on their first rental. Use code <span className="text-accent-primary font-mono font-bold">FIRST25</span> at checkout.
              </p>

              <button
                onClick={() => navigate('/cars')}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-500 mt-4">*Terms and conditions apply</p>
            </div>
          </motion.div>

          {/* Refer & Earn */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-8 md:p-10 text-center md:text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-neon-purple/20 px-4 py-2 rounded-full mb-6">
                <Share2 className="w-5 h-5 text-neon-purple" />
                <span className="text-sm font-semibold text-neon-purple">REFER & EARN</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">₹500</span> for Every Referral
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Share your love for Monstrac with friends and family. You both get ₹500 credit when they complete their first booking!
              </p>

              <button
                onClick={() => navigate('/dashboard/customer')}
                className="bg-gradient-to-r from-neon-purple to-neon-pink text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/50 hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Start Referring</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-dark-bg/50 rounded-lg p-3">
                  <div className="text-2xl font-bold glow-text">₹500</div>
                  <div className="text-gray-500">Per Referral</div>
                </div>
                <div className="bg-dark-bg/50 rounded-lg p-3">
                  <div className="text-2xl font-bold glow-text">∞</div>
                  <div className="text-gray-500">No Limit</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
