import React from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  CarIcon,
  CreditCardIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Search & Select',
      description: 'Browse our premium fleet and find the perfect vehicle for your needs',
      icon: MagnifyingGlassIcon,
      color: 'from-neon-blue to-blue-600',
      details: [
        'Enter your pickup location and dates',
        'Filter by car type, price, and features',
        'Compare different options',
        'Read reviews and ratings'
      ]
    },
    {
      id: 2,
      title: 'Book & Pay',
      description: 'Complete your booking with secure payment and instant confirmation',
      icon: CarIcon,
      color: 'from-neon-purple to-purple-600',
      details: [
        'Choose your preferred vehicle',
        'Add optional extras and services',
        'Review pricing and policies',
        'Complete secure payment'
      ]
    },
    {
      id: 3,
      title: 'Drive & Enjoy',
      description: 'Pick up your car and enjoy a seamless driving experience',
      icon: CreditCardIcon,
      color: 'from-neon-green to-green-600',
      details: [
        'Pick up at your chosen location',
        'Complete quick vehicle inspection',
        'Enjoy your journey',
        'Return at scheduled time'
      ]
    }
  ];

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started with our simple 3-step process and experience the future of car rental
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green opacity-30"></div>
          
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="flex items-center justify-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center relative z-10`}>
                    <span className="text-2xl font-bold text-white">{step.id}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="text-center space-y-6">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Details List */}
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: detailIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 text-left"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full flex-shrink-0`}></div>
                        <span className="text-sm text-gray-400">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 z-20">
                    <ArrowRightIcon className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-neon text-dark-900 font-bold rounded-xl hover:shadow-neon-lg transition-all duration-300 transform hover:scale-105">
            Start Your Booking
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;