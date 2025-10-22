'use client'

import React from 'react'
import { Shield, Clock, DollarSign, Users, Car, Award, Phone, RefreshCw } from 'lucide-react'

const advantages = [
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise charges. What you see is what you pay.',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer service and roadside assistance.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: RefreshCw,
    title: 'Free Cancellation',
    description: 'Cancel up to 24 hours before pickup with full refund.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Users,
    title: 'Verified Drivers',
    description: 'All our drivers are professionally trained and background checked.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Shield,
    title: 'Insurance Included',
    description: 'Comprehensive insurance coverage for peace of mind.',
    gradient: 'from-teal-500 to-green-600',
  },
  {
    icon: Award,
    title: 'Easy Refunds',
    description: 'Hassle-free refund process with quick turnaround times.',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    icon: Car,
    title: 'Clean & Sanitized',
    description: 'All vehicles are thoroughly cleaned and sanitized after each use.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Phone,
    title: 'Instant Booking',
    description: 'Book instantly online or through our mobile app.',
    gradient: 'from-yellow-500 to-orange-600',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4">
            Why Choose
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Monstrac CarRent
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're committed to providing you with the best car rental experience. 
            Here's what sets us apart from the competition.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl border border-gray-600 bg-gray-800/30 backdrop-blur-sm hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${advantage.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <advantage.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-heading text-white group-hover:text-blue-400 transition-colors duration-200">
                  {advantage.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {advantage.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              99.9%
            </div>
            <div className="text-sm text-gray-400">Uptime Guarantee</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              &lt;2min
            </div>
            <div className="text-sm text-gray-400">Average Response Time</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              50+
            </div>
            <div className="text-sm text-gray-400">Cities Worldwide</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-sm text-gray-400">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}