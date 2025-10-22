'use client'

import React from 'react'
import { ArrowRight, Play, Shield, Clock, Star, CheckCircle, Car } from 'lucide-react'

const trustBadges = [
  { icon: Shield, text: 'Fully Insured', color: 'text-green-500' },
  { icon: Clock, text: '24/7 Support', color: 'text-blue-500' },
  { icon: Star, text: 'Verified Cars', color: 'text-yellow-500' },
]

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Premium Cars' },
  { value: '50+', label: 'Cities Covered' },
  { value: '4.9', label: 'Average Rating' },
]

export function SimpleHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm">
                <span className="mr-2">🚗</span>
                Premium Car Rental Experience
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                  Drive Your
                  <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Dream Car
                  </span>
                  Today
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed">
                  Experience luxury and comfort with our premium fleet. From economy to exotic, 
                  find the perfect car for every journey.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg bg-gray-800 ${badge.color}`}>
                      <badge.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                  <span>Book Your Ride</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border border-gray-600 rounded-xl hover:bg-gray-800 transition-all duration-200">
                  <Play className="mr-2 h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-600">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold font-heading bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Car Showcase */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600">
                {/* Placeholder for 3D Car Scene */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Car className="h-24 w-24 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">3D Car Preview</h3>
                    <p className="text-gray-400">Interactive car visualization coming soon</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Available Now</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-600">
                  <div className="text-center">
                    <div className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">$49</div>
                    <div className="text-xs text-gray-400">per day</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl transform scale-110" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
        </div>
      </div>
    </section>
  )
}