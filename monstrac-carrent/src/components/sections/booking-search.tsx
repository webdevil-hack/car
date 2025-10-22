'use client'

import React, { useState } from 'react'
import { MapPin, Calendar, Clock, Users, Car, Search, ChevronDown } from 'lucide-react'

const popularLocations = [
  'Downtown',
  'Airport',
  'Train Station',
  'Hotel District',
  'Business Center',
  'Shopping Mall',
]

const carTypes = [
  { id: 'any', name: 'Any Type' },
  { id: 'hatchback', name: 'Hatchback' },
  { id: 'sedan', name: 'Sedan' },
  { id: 'suv', name: 'SUV' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'electric', name: 'Electric' },
]

export function BookingSearch() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    passengers: 2,
    carType: 'any',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search submitted:', formData)
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getNextDayDate = () => {
    const nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 2)
    return nextDay.toISOString().split('T')[0]
  }

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-600 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading mb-4">Find Your Perfect Ride</h2>
            <p className="text-gray-400">Search from our premium fleet of vehicles</p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    placeholder="Enter pickup location"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Dropoff Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Dropoff Location <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.dropoffLocation}
                    onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                    placeholder="Same as pickup"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Pickup Date & Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Pickup Date & Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    min={getTomorrowDate()}
                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Return Date & Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Return Date & Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    min={getNextDayDate()}
                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                    min="1"
                    max="8"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Car Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Car Type</label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={formData.carType}
                    onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                    className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {carTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Popular Locations */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Popular Locations</label>
              <div className="flex flex-wrap gap-2">
                {popularLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => setFormData({ ...formData, pickupLocation: location })}
                    className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 justify-center py-4 border-t border-gray-600">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>🛡️</span>
                <span>Insured</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>⏰</span>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>✅</span>
                <span>Verified Cars</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Available Cars
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}