import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TruckIcon as CarIcon,
  TruckIcon,
  BoltIcon,
  StarIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      id: 'hatchback',
      name: 'Hatchback',
      icon: CarIcon,
      description: 'Compact & efficient',
      price: 'From $25/day',
      color: 'from-neon-blue to-blue-600',
      count: 45
    },
    {
      id: 'sedan',
      name: 'Sedan',
      icon: CarIcon,
      description: 'Comfortable & spacious',
      price: 'From $35/day',
      color: 'from-neon-purple to-purple-600',
      count: 32
    },
    {
      id: 'suv',
      name: 'SUV',
      icon: TruckIcon,
      description: 'Adventure ready',
      price: 'From $50/day',
      color: 'from-neon-green to-green-600',
      count: 28
    },
    {
      id: 'luxury',
      name: 'Luxury',
      icon: StarIcon,
      description: 'Premium experience',
      price: 'From $100/day',
      color: 'from-yellow-400 to-orange-500',
      count: 15
    },
    {
      id: 'electric',
      name: 'Electric',
      icon: BoltIcon,
      description: 'Eco-friendly choice',
      price: 'From $40/day',
      color: 'from-green-400 to-emerald-500',
      count: 20
    },
    {
      id: 'vans',
      name: 'Vans',
      icon: UserGroupIcon,
      description: 'Group travel',
      price: 'From $60/day',
      color: 'from-pink-400 to-rose-500',
      count: 12
    },
    {
      id: 'self-drive',
      name: 'Self Drive',
      icon: CarIcon,
      description: 'Drive yourself',
      price: 'From $30/day',
      color: 'from-cyan-400 to-blue-500',
      count: 85
    },
    {
      id: 'with-driver',
      name: 'With Driver',
      icon: CogIcon,
      description: 'Chauffeur service',
      price: 'From $80/day',
      color: 'from-indigo-400 to-purple-500',
      count: 25
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
            Choose Your <span className="text-gradient">Vehicle Type</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From compact hatchbacks to luxury vehicles, find the perfect car for your journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
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
              <Link
                to={`/cars?category=${category.id}`}
                className="block"
              >
                <div className="relative bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-dark-700/50 hover:border-accent-primary/50 transition-all duration-300 group-hover:shadow-neon h-full">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Category Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {category.description}
                      </p>
                      <p className="text-sm font-semibold text-accent-primary">
                        {category.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        {category.count} available
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/cars"
            className="inline-flex items-center px-8 py-4 bg-gradient-neon text-dark-900 font-bold rounded-xl hover:shadow-neon-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Categories
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;