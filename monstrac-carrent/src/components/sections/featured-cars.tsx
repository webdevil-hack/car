'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Star, Users, Fuel, Settings, Heart, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const featuredCars = [
  {
    id: 1,
    name: 'Tesla Model S',
    category: 'Electric Luxury',
    image: '/api/placeholder/400/250',
    rating: 4.9,
    reviewCount: 156,
    pricePerDay: 120,
    pricePerHour: 15,
    features: {
      seats: 5,
      transmission: 'Auto',
      fuel: 'Electric',
      year: 2024,
    },
    badges: ['Best Seller', 'Eco-Friendly'],
    description: 'Experience the future of driving with this premium electric sedan.',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    name: 'BMW X5',
    category: 'Luxury SUV',
    image: '/api/placeholder/400/250',
    rating: 4.8,
    reviewCount: 203,
    pricePerDay: 95,
    pricePerHour: 12,
    features: {
      seats: 7,
      transmission: 'Auto',
      fuel: 'Petrol',
      year: 2023,
    },
    badges: ['Family Favorite', 'Premium'],
    description: 'Spacious luxury SUV perfect for family adventures.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    category: 'Luxury Sedan',
    image: '/api/placeholder/400/250',
    rating: 4.7,
    reviewCount: 89,
    pricePerDay: 85,
    pricePerHour: 11,
    features: {
      seats: 5,
      transmission: 'Auto',
      fuel: 'Petrol',
      year: 2023,
    },
    badges: ['Executive Choice', 'Comfort'],
    description: 'Elegant sedan combining luxury with performance.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 4,
    name: 'Toyota Prius',
    category: 'Hybrid Economy',
    image: '/api/placeholder/400/250',
    rating: 4.6,
    reviewCount: 124,
    pricePerDay: 45,
    pricePerHour: 6,
    features: {
      seats: 5,
      transmission: 'Auto',
      fuel: 'Hybrid',
      year: 2023,
    },
    badges: ['Eco-Friendly', 'Budget Friendly'],
    description: 'Fuel-efficient hybrid perfect for city driving.',
    gradient: 'from-green-500 to-emerald-600',
  },
]

export function FeaturedCars() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCars.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCars.length) % featuredCars.length)
  }

  const toggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    )
  }

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4">
            Featured
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Premium Vehicles
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our handpicked selection of premium vehicles, each offering exceptional comfort, 
            performance, and style for your journey.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-600 overflow-hidden hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                {/* Placeholder for car image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${car.gradient} mb-2`}>
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm text-gray-400">Car Image</p>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {car.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-xs font-semibold bg-gray-900/80 backdrop-blur-sm text-white rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button
                    onClick={() => toggleFavorite(car.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      favorites.includes(car.id)
                        ? 'bg-red-500/80 text-white'
                        : 'bg-gray-900/80 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className="h-4 w-4" fill={favorites.includes(car.id) ? 'currentColor' : 'none'} />
                  </button>
                  <Link
                    href={`/cars/${car.id}`}
                    className="block p-2 rounded-full bg-gray-900/80 backdrop-blur-sm text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors duration-200">
                      {car.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-white">{car.rating}</span>
                      <span className="text-sm text-gray-400">({car.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{car.category}</p>
                  <p className="text-sm text-gray-300">{car.description}</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{car.features.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <span>{car.features.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Fuel className="h-4 w-4 text-blue-500" />
                    <span>{car.features.fuel}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="text-blue-500">📅</span>
                    <span>{car.features.year}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className={`text-2xl font-bold bg-gradient-to-r ${car.gradient} bg-clip-text text-transparent`}>
                        ${car.pricePerDay}
                        <span className="text-sm text-gray-400 font-normal">/day</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        ${car.pricePerHour}/hour
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/cars/${car.id}`}
                      className="flex-1 py-2 px-4 text-sm font-medium text-center border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-all duration-200"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/book/${car.id}`}
                      className={`flex-1 py-2 px-4 text-sm font-medium text-center text-white bg-gradient-to-r ${car.gradient} rounded-lg hover:opacity-90 transition-all duration-200`}
                    >
                      Quick Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="/cars"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            View All Cars
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}