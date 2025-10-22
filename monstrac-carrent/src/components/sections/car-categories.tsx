'use client'

import React from 'react'
import Link from 'next/link'
import { Car, Zap, Crown, Users, Truck, Fuel } from 'lucide-react'

const categories = [
  {
    id: 'hatchback',
    name: 'Hatchback',
    icon: Car,
    description: 'Compact and fuel-efficient',
    startingPrice: 25,
    features: ['Fuel Efficient', 'Easy Parking', 'City Driving'],
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-500/10 to-emerald-600/10',
  },
  {
    id: 'sedan',
    name: 'Sedan',
    icon: Car,
    description: 'Comfortable and spacious',
    startingPrice: 35,
    features: ['Comfortable', 'Spacious', 'Professional'],
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-500/10 to-cyan-600/10',
  },
  {
    id: 'suv',
    name: 'SUV',
    icon: Truck,
    description: 'Perfect for families',
    startingPrice: 55,
    features: ['Family Friendly', 'High Seating', 'All Terrain'],
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-500/10 to-red-600/10',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: Crown,
    description: 'Premium experience',
    startingPrice: 120,
    features: ['Premium Interior', 'Advanced Tech', 'Prestige'],
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-500/10 to-pink-600/10',
  },
  {
    id: 'electric',
    name: 'Electric',
    icon: Zap,
    description: 'Eco-friendly driving',
    startingPrice: 45,
    features: ['Zero Emissions', 'Silent Drive', 'Tech Forward'],
    gradient: 'from-teal-500 to-green-600',
    bgGradient: 'from-teal-500/10 to-green-600/10',
  },
  {
    id: 'van',
    name: 'Van',
    icon: Users,
    description: 'Group transportation',
    startingPrice: 75,
    features: ['8+ Seaters', 'Cargo Space', 'Group Travel'],
    gradient: 'from-indigo-500 to-blue-600',
    bgGradient: 'from-indigo-500/10 to-blue-600/10',
  },
]

export function CarCategories() {
  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Vehicle Category
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From compact city cars to luxury vehicles, we have the perfect ride for every occasion and budget.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/cars?category=${category.id}`}
              className="group relative"
            >
              <div className={`relative h-full p-8 rounded-3xl border border-gray-600 bg-gradient-to-br ${category.bgGradient} hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}>
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-400">
                      {category.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-400">Starting from</span>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                          ${category.startingPrice}
                          <span className="text-sm text-gray-400 font-normal">/day</span>
                        </div>
                      </div>
                      <div className="text-blue-500 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/cars"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            View All Vehicles
            <Car className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}