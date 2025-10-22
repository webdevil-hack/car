import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  CheckBadgeIcon,
  ShieldCheckIcon,
  HeartIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Customers', icon: UserGroupIcon },
    { number: '500+', label: 'Premium Vehicles', icon: ChartBarIcon },
    { number: '50+', label: 'Cities Covered', icon: GlobeAltIcon },
    { number: '99%', label: 'Satisfaction Rate', icon: HeartIcon }
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Safety First',
      description: 'Every vehicle undergoes rigorous safety checks and maintenance to ensure your peace of mind.'
    },
    {
      icon: HeartIcon,
      title: 'Customer Centric',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional service every time.'
    },
    {
      icon: CheckBadgeIcon,
      title: 'Quality Assured',
      description: 'Only the finest vehicles make it to our fleet, maintained to the highest standards.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Sustainable Future',
      description: 'Committed to eco-friendly practices and expanding our electric vehicle fleet.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize car rental experience'
    },
    {
      year: '2021',
      title: 'First 1000 Customers',
      description: 'Reached our first milestone with 1000 satisfied customers'
    },
    {
      year: '2022',
      title: 'Electric Fleet Launch',
      description: 'Introduced our first electric vehicles to the fleet'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Launched AI-powered booking and customer service'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to 50+ cities across multiple countries'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                About <span className="text-gradient">Monstrac</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing the car rental industry with cutting-edge technology, 
                premium vehicles, and exceptional customer service.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-white mb-6">
                  Our <span className="text-gradient">Mission</span>
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  To provide seamless, safe, and sustainable mobility solutions that empower 
                  people to explore the world with confidence. We believe that every journey 
                  should be memorable, comfortable, and environmentally conscious.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Through innovation, technology, and a customer-first approach, we're building 
                  the future of transportation, one rental at a time.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/50"
              >
                <div className="space-y-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-neon rounded-xl flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-6 h-6 text-dark-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-dark-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="text-gradient">Impact</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Numbers that speak to our commitment and success
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
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
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-dark-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="text-gradient">Journey</span>
              </h2>
              <p className="text-xl text-gray-300">
                Key milestones in our growth and innovation
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-green"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start space-x-8"
                  >
                    {/* Timeline Dot */}
                    <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="text-dark-900 font-bold text-sm">
                        {item.year}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-dark-700/50">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience the <span className="text-gradient">Future</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of satisfied customers and discover why Monstrac is the preferred choice for premium car rentals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-neon text-dark-900 font-bold rounded-xl hover:shadow-neon-lg transition-all duration-300 transform hover:scale-105">
                  Start Your Journey
                </button>
                <button className="px-8 py-4 border-2 border-accent-primary text-accent-primary font-semibold rounded-xl hover:bg-accent-primary hover:text-dark-900 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;