import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    date: '2 weeks ago',
    review: 'Absolutely fantastic experience! The booking process was seamless, and the car was in pristine condition. The customer service team went above and beyond to ensure everything was perfect. Will definitely use Monstrac again!',
    carRented: 'Tesla Model 3',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    date: '1 month ago',
    review: 'Best car rental service I\'ve ever used. The app is intuitive, prices are transparent, and the vehicle selection is outstanding. The BMW X5 I rented was spotless and drove like a dream. Highly recommended!',
    carRented: 'BMW X5',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 5,
    date: '3 weeks ago',
    review: 'I was impressed by the professionalism and efficiency. The pickup and drop-off process was quick and hassle-free. The Mercedes was luxurious and well-maintained. Great value for money!',
    carRented: 'Mercedes C-Class',
  },
  {
    id: 4,
    name: 'David Park',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    rating: 5,
    date: '1 week ago',
    review: 'Exceptional service from start to finish. The 24/7 support came in handy when I needed to extend my rental. The Audi Q7 was perfect for our family road trip. Thank you, Monstrac!',
    carRented: 'Audi Q7',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80',
    rating: 5,
    date: '2 months ago',
    review: 'The convenience and quality of service are unmatched. I love how easy it is to book, and the cars are always clean and ready. The insurance included gives peace of mind. A truly premium experience!',
    carRented: 'Porsche 911',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = testimonials.length - 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            What Our <span className="glow-text">Customers Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real experiences from our valued customers across the country
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative h-[400px] sm:h-[350px] lg:h-[300px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="card p-8 lg:p-10">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-accent-primary/20">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-accent-primary/20"
                    />
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white">
                        {testimonials[currentIndex].name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{testimonials[currentIndex].location}</span>
                        <span className="text-gray-600">•</span>
                        <span>{testimonials[currentIndex].date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[currentIndex].rating
                              ? 'text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      Rented: {testimonials[currentIndex].carRented}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 leading-relaxed text-lg">
                    "{testimonials[currentIndex].review}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12
                w-12 h-12 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center
                text-gray-400 hover:text-white hover:bg-dark-700 transition-all duration-300
                border border-dark-700 hover:border-dark-600"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12
                w-12 h-12 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center
                text-gray-400 hover:text-white hover:bg-dark-700 transition-all duration-300
                border border-dark-700 hover:border-dark-600"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-accent-primary'
                    : 'w-2 bg-dark-700 hover:bg-dark-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          {[
            { name: 'Google', rating: '4.8', reviews: '2.3k' },
            { name: 'Trustpilot', rating: '4.9', reviews: '1.8k' },
            { name: 'Facebook', rating: '4.7', reviews: '3.1k' },
          ].map((platform) => (
            <div key={platform.name} className="flex items-center space-x-3 text-gray-400">
              <div className="flex items-center space-x-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-white">{platform.rating}</span>
              </div>
              <span className="text-sm">
                on {platform.name} ({platform.reviews} reviews)
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;