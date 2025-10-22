'use client'

import React from 'react'
import { Search, Car, CreditCard, Key, ArrowRight } from 'lucide-react'

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Search & Select',
    description: 'Browse our extensive fleet and find the perfect car for your needs. Filter by location, dates, and preferences.',
    details: ['Choose pickup location', 'Select dates & times', 'Filter by car type', 'Compare prices'],
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-500/10 to-cyan-600/10',
  },
  {
    id: 2,
    icon: CreditCard,
    title: 'Book & Pay',
    description: 'Secure your reservation with our easy booking process. Multiple payment options available for your convenience.',
    details: ['Instant booking confirmation', 'Secure payment gateway', 'Multiple payment methods', 'Digital receipts'],
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-500/10 to-pink-600/10',
  },
  {
    id: 3,
    icon: Key,
    title: 'Pick Up & Drive',
    description: 'Collect your car from the designated location and enjoy your journey. 24/7 support available throughout your trip.',
    details: ['Quick pickup process', 'Vehicle inspection', 'Digital key handover', '24/7 roadside assistance'],
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-500/10 to-emerald-600/10',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4">
            How It
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Renting a car has never been easier. Follow these simple steps to get on the road in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent transform -translate-x-1/2 z-0" />
                )}

                <div className={`relative p-8 rounded-3xl border border-gray-600 bg-gradient-to-br ${step.bgGradient} hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group`}>
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-gray-900 border-2 border-gray-600 rounded-full flex items-center justify-center text-sm font-bold text-white group-hover:border-gray-500 transition-colors duration-300">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-heading text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-3 text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-gray-900 border-2 border-gray-600 rounded-full flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-heading text-white">
              Ready to get started?
            </h3>
            <p className="text-gray-400">
              Join thousands of satisfied customers who trust us with their transportation needs.
            </p>
            <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Start Booking Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}