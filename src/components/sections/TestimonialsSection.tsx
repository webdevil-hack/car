import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, NY',
      rating: 5,
      text: 'Absolutely amazing experience! The car was spotless, the booking process was seamless, and the customer service was outstanding. Will definitely use Monstrac again.',
      avatar: '/images/avatars/sarah.jpg',
      car: 'BMW X5',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Los Angeles, CA',
      rating: 5,
      text: 'The Tesla Model 3 was incredible! The autopilot feature made my long drive so much more comfortable. The pickup and return process was super smooth.',
      avatar: '/images/avatars/michael.jpg',
      car: 'Tesla Model 3',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Miami, FL',
      rating: 5,
      text: 'Perfect service from start to finish. The Mercedes C-Class was luxurious and the driver was professional. Highly recommend for business trips.',
      avatar: '/images/avatars/emily.jpg',
      car: 'Mercedes C-Class',
      date: '3 days ago'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'Chicago, IL',
      rating: 4,
      text: 'Great value for money! The Audi A4 was in excellent condition and the booking process was straightforward. Will be using Monstrac for future rentals.',
      avatar: '/images/avatars/david.jpg',
      car: 'Audi A4',
      date: '5 days ago'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      location: 'Seattle, WA',
      rating: 5,
      text: 'Outstanding service! The car was exactly as described, the pricing was transparent, and the support team was very helpful. Five stars!',
      avatar: '/images/avatars/lisa.jpg',
      car: 'BMW X5',
      date: '1 day ago'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

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
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-dark-800/80 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-8 lg:p-12"
              >
                <div className="text-center space-y-6">
                  {/* Rating */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarSolidIcon
                        key={i}
                        className={`w-6 h-6 ${
                          i < testimonials[currentIndex].rating
                            ? 'text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-dark-900">
                        {testimonials[currentIndex].name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-semibold text-white">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonials[currentIndex].location}
                      </div>
                      <div className="text-sm text-accent-primary">
                        Rented: {testimonials[currentIndex].car}
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    {testimonials[currentIndex].date}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-primary transition-all duration-300"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-primary transition-all duration-300"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent-primary scale-125'
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { name: 'Google Reviews', rating: '4.9/5', reviews: '2,500+' },
            { name: 'Trustpilot', rating: '4.8/5', reviews: '1,800+' },
            { name: 'Yelp', rating: '4.7/5', reviews: '950+' },
            { name: 'Facebook', rating: '4.9/5', reviews: '3,200+' }
          ].map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-4 bg-dark-800/50 rounded-lg border border-dark-700/50"
            >
              <div className="text-2xl font-bold text-accent-primary mb-1">
                {platform.rating}
              </div>
              <div className="text-sm text-gray-400 mb-1">
                {platform.name}
              </div>
              <div className="text-xs text-gray-500">
                {platform.reviews} reviews
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;