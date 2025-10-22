'use client'

import React, { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, NY',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    date: '2 weeks ago',
    review: 'Absolutely fantastic service! The car was spotless, the pickup process was seamless, and the customer support was outstanding. I\'ll definitely be using Monstrac CarRent for all my future trips.',
    carRented: 'Tesla Model S',
    verified: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    date: '1 month ago',
    review: 'Great experience from start to finish. The BMW X5 was perfect for our family vacation. Clean, comfortable, and the booking process was incredibly easy. Highly recommended!',
    carRented: 'BMW X5',
    verified: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    date: '3 weeks ago',
    review: 'I was impressed by the quality of the vehicle and the professionalism of the staff. The Mercedes C-Class was in perfect condition and made my business trip comfortable and stylish.',
    carRented: 'Mercedes C-Class',
    verified: true,
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Chicago, IL',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    date: '1 week ago',
    review: 'Outstanding service! The Toyota Prius was fuel-efficient and perfect for city driving. The 24/7 support was helpful when I had questions. Will definitely book again.',
    carRented: 'Toyota Prius',
    verified: true,
  },
  {
    id: 5,
    name: 'Lisa Wang',
    location: 'Los Angeles, CA',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    date: '2 months ago',
    review: 'Exceptional experience! The luxury sedan exceeded my expectations. The booking was instant, the car was immaculate, and the return process was hassle-free. Five stars!',
    carRented: 'Audi A8',
    verified: true,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4">
            What Our
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-600 p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-20">
              <Quote className="h-16 w-16 text-blue-500" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Review */}
              <blockquote className="text-xl md:text-2xl text-center text-gray-200 leading-relaxed mb-8 font-medium">
                "{currentTestimonial.review}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-bold text-white">{currentTestimonial.name}</h4>
                    {currentTestimonial.verified && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{currentTestimonial.location}</span>
                    <span>•</span>
                    <span>{currentTestimonial.date}</span>
                  </div>
                  <div className="text-sm text-blue-400 mt-1">
                    Rented: {currentTestimonial.carRented}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-600 p-6 hover:border-gray-500 transition-all duration-300 transform hover:scale-105"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-400">{testimonial.date}</span>
              </div>

              {/* Review */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                "{testimonial.review}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <span className="text-green-400 text-xs">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                5K+
              </div>
              <div className="text-sm text-gray-400">5-Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}