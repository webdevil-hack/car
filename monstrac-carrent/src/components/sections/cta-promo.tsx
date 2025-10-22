'use client'

import React, { useState, useEffect } from 'react'
import { Gift, ArrowRight, Clock, Star, Users, Percent } from 'lucide-react'

export function CTAPromo() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Promo Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                <Gift className="h-4 w-4 mr-2" />
                Limited Time Offer
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
                  Get 25% Off
                  <span className="block">Your First Rental</span>
                </h2>
                <p className="text-xl text-blue-100">
                  New customers save big on their first booking. Premium cars, unbeatable prices, unforgettable experiences.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-white">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm">Premium Vehicles</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Users className="h-5 w-5 text-green-400" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Percent className="h-5 w-5 text-pink-400" />
                  <span className="text-sm">No Hidden Fees</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <span className="text-sm">Instant Booking</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                  Claim Your Discount
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <div className="flex items-center text-white text-sm">
                  <span>Use code:</span>
                  <span className="ml-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg font-mono font-bold">
                    FIRST25
                  </span>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Offer Expires In:</h3>
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold text-white">{value.toString().padStart(2, '0')}</div>
                    <div className="text-sm text-blue-100 capitalize">{unit}</div>
                  </div>
                ))}
              </div>
              <p className="text-blue-100 text-sm mt-4">
                *Valid for new customers only. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>

        {/* Referral Program */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Refer & Earn */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600 p-8 hover:border-gray-500 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  Refer & Earn
                </h3>
                <p className="text-gray-400">
                  Invite friends and earn $50 credit for each successful referral. They get 20% off their first rental too!
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Your Referrals:</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Credits Earned:</span>
                  <span className="text-green-500 font-semibold">$600</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                  Start Referring
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600 p-8 hover:border-gray-500 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  Exclusive Deals
                </h3>
                <p className="text-gray-400">
                  Subscribe to our newsletter and be the first to know about flash sales, new vehicles, and exclusive promotions.
                </p>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200">
                  Subscribe Now
                </button>
                <p className="text-xs text-gray-500">
                  Get 10% off your next rental when you subscribe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}