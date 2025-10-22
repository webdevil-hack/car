import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  ClockIcon,
  XMarkIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      icon: CurrencyDollarIcon,
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprise charges. What you see is what you pay.',
      color: 'text-neon-green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: ClockIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.',
      color: 'text-neon-blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: XMarkIcon,
      title: 'Free Cancellation',
      description: 'Cancel your booking up to 24 hours before pickup with no penalty.',
      color: 'text-neon-purple',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: CheckBadgeIcon,
      title: 'Verified Drivers',
      description: 'All our drivers are background-checked and professionally trained.',
      color: 'text-neon-orange',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Insurance Included',
      description: 'Comprehensive insurance coverage included with every rental.',
      color: 'text-neon-green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'No Hidden Charges',
      description: 'All taxes, fees, and charges are clearly displayed upfront.',
      color: 'text-neon-blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: ArrowPathIcon,
      title: 'Easy Refunds',
      description: 'Quick and hassle-free refund process for eligible cancellations.',
      color: 'text-neon-purple',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: SparklesIcon,
      title: 'Clean & Sanitized',
      description: 'Every vehicle is thoroughly cleaned and sanitized before each rental.',
      color: 'text-neon-pink',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20'
    }
  ];

  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-gradient">Monstrac</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the difference with our premium service, cutting-edge technology, and customer-first approach
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className={`relative bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border ${advantage.borderColor} hover:border-accent-primary/50 transition-all duration-300 group-hover:shadow-neon h-full`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 ${advantage.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${advantage.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <advantage.icon className={`w-8 h-8 ${advantage.color}`} />
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-primary transition-colors duration-300 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${advantage.bgColor} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-4 gap-8"
        >
          {[
            { number: '10K+', label: 'Happy Customers', icon: UserGroupIcon },
            { number: '500+', label: 'Premium Vehicles', icon: CarIcon },
            { number: '50+', label: 'Cities Covered', icon: MapPinIcon },
            { number: '99%', label: 'Satisfaction Rate', icon: CheckBadgeIcon }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-dark-900" />
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-accent-primary transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;