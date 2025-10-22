import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon, GiftIcon, ClockIcon } from '@heroicons/react/24/outline';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-primary/20 animate-gradient" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Limited Time Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-r from-dark-800/90 to-dark-900/90 backdrop-blur-xl p-8 lg:p-12 text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-warning to-accent-primary 
              rounded-full mb-6 mx-auto"
          >
            <ClockIcon className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Limited Time <span className="glow-text">Special Offer</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get <span className="text-accent-primary font-bold">25% OFF</span> on your first booking
            + Free GPS & Child Seat upgrade!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cars')}
              className="btn-primary px-8 py-4 text-lg font-semibold shadow-lg shadow-accent-primary/25
                flex items-center space-x-2"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Claim Offer Now</span>
            </motion.button>
            <span className="text-gray-400">
              Use code: <span className="font-mono font-bold text-accent-primary">FIRST25</span>
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center space-x-4">
            {[
              { value: '02', label: 'Days' },
              { value: '14', label: 'Hours' },
              { value: '37', label: 'Minutes' },
              { value: '42', label: 'Seconds' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-dark-800 rounded-lg p-3 min-w-[60px]">
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 block">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Refer & Earn Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Refer & Earn Card */}
          <div className="card p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-success/20 rounded-full blur-3xl 
              group-hover:w-48 group-hover:h-48 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-success to-accent-primary 
                  rounded-xl flex items-center justify-center">
                  <GiftIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-white">
                  Refer & Earn
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Invite friends and earn <span className="text-accent-success font-bold">$50</span> in 
                wallet credits for each successful referral. Your friends get 
                <span className="text-accent-primary font-bold"> 20% OFF</span> on their first ride!
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard/referrals')}
                className="btn-secondary w-full"
              >
                Start Referring Now
              </motion.button>
            </div>
          </div>

          {/* Become a Partner Card */}
          <div className="card p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-secondary/20 rounded-full blur-3xl 
              group-hover:w-48 group-hover:h-48 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-secondary to-accent-primary 
                  rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-2xl text-white">
                  Become a Partner
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                List your cars on our platform and earn up to 
                <span className="text-accent-secondary font-bold"> $3000/month</span>. 
                Join our network of 500+ car owners earning passive income.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/partners')}
                className="btn-secondary w-full"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Stay updated with exclusive deals and new car additions
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary px-6"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;