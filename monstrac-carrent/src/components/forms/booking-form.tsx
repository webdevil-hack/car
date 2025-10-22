'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  DollarSign, 
  Search,
  ChevronDown,
  User,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const bookingSchema = z.object({
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  dropoffLocation: z.string().optional(),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  returnDate: z.string().min(1, 'Return date is required'),
  returnTime: z.string().min(1, 'Return time is required'),
  passengers: z.number().min(1).max(8),
  driverRequired: z.boolean(),
  carType: z.string().optional(),
  priceRange: z.array(z.number()).optional(),
  promoCode: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const carTypes = [
  { id: 'any', name: 'Any Type', icon: Car },
  { id: 'hatchback', name: 'Hatchback', icon: Car },
  { id: 'sedan', name: 'Sedan', icon: Car },
  { id: 'suv', name: 'SUV', icon: Car },
  { id: 'luxury', name: 'Luxury', icon: Car },
  { id: 'electric', name: 'Electric', icon: Car },
]

const popularLocations = [
  'Downtown',
  'Airport',
  'Train Station',
  'Hotel District',
  'Business Center',
  'Shopping Mall',
]

interface BookingFormProps {
  onSubmit?: (data: BookingFormData) => void
  className?: string
  compact?: boolean
}

export function BookingForm({ onSubmit, className, compact = false }: BookingFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedCarType, setSelectedCarType] = useState('any')
  const [priceRange, setPriceRange] = useState([50, 500])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: 2,
      driverRequired: false,
      carType: 'any',
      priceRange: [50, 500],
    },
  })

  const watchedValues = watch()

  const handleFormSubmit = (data: BookingFormData) => {
    console.log('Booking form submitted:', data)
    onSubmit?.(data)
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
    <Card className={cn('glass shadow-2xl', className)}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold font-heading mb-2">Find Your Perfect Ride</h3>
            <p className="text-gray-400">Search from our premium fleet</p>
          </div>

          {/* Main Form Fields */}
          <div className={cn(
            'grid gap-4',
            compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          )}>
            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Pickup Location</label>
              <div className="relative">
                <Input
                  {...register('pickupLocation')}
                  placeholder="Enter pickup location"
                  icon={<MapPin className="h-4 w-4" />}
                  error={!!errors.pickupLocation}
                />
                {errors.pickupLocation && (
                  <p className="text-sm text-error mt-1">{errors.pickupLocation.message}</p>
                )}
                
                {/* Popular Locations Dropdown */}
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                  {popularLocations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => setValue('pickupLocation', location)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors text-sm"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Dropoff Location <span className="text-gray-400">(Optional)</span>
              </label>
              <Input
                {...register('dropoffLocation')}
                placeholder="Same as pickup"
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>

            {/* Pickup Date & Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Pickup Date & Time</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  {...register('pickupDate')}
                  type="date"
                  min={getTomorrowDate()}
                  error={!!errors.pickupDate}
                />
                <Input
                  {...register('pickupTime')}
                  type="time"
                  error={!!errors.pickupTime}
                />
              </div>
              {(errors.pickupDate || errors.pickupTime) && (
                <p className="text-sm text-error">
                  {errors.pickupDate?.message || errors.pickupTime?.message}
                </p>
              )}
            </div>

            {/* Return Date & Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Return Date & Time</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  {...register('returnDate')}
                  type="date"
                  min={getNextDayDate()}
                  error={!!errors.returnDate}
                />
                <Input
                  {...register('returnTime')}
                  type="time"
                  error={!!errors.returnTime}
                />
              </div>
              {(errors.returnDate || errors.returnTime) && (
                <p className="text-sm text-error">
                  {errors.returnDate?.message || errors.returnTime?.message}
                </p>
              )}
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Passengers</label>
              <Input
                {...register('passengers', { valueAsNumber: true })}
                type="number"
                min="1"
                max="8"
                icon={<Users className="h-4 w-4" />}
                error={!!errors.passengers}
              />
              {errors.passengers && (
                <p className="text-sm text-error">{errors.passengers.message}</p>
              )}
            </div>

            {/* Driver Required Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Driver Service</label>
                <div className="flex items-center space-x-3 h-12 px-4 rounded-xl border border-gray-600 bg-gray-900">
                <User className="h-4 w-4 text-gray-400" />
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    {...register('driverRequired')}
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Need a driver?</span>
                </label>
              </div>
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <div className="border-t border-gray-600 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <span>Advanced Options</span>
              <ChevronDown className={cn(
                'h-4 w-4 transition-transform duration-200',
                showAdvanced && 'rotate-180'
              )} />
            </button>

            {/* Advanced Options */}
            <motion.div
              initial={false}
              animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Car Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Car Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {carTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          setSelectedCarType(type.id)
                          setValue('carType', type.id)
                        }}
                        className={cn(
                          'flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200',
                          selectedCarType === type.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                        )}
                      >
                        <type.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Price Range: ${priceRange[0]} - ${priceRange[1]} per day
                  </label>
                  <div className="px-3">
                    <input
                      type="range"
                      min="25"
                      max="1000"
                      step="25"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Promo Code</label>
                  <Input
                    {...register('promoCode')}
                    placeholder="Enter promo code"
                    icon={<Tag className="h-4 w-4" />}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-gray-600">
            <Badge variant="outline" className="text-xs">
              <span className="mr-1">🛡️</span>
              Insured
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="mr-1">⏰</span>
              24/7 Support
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="mr-1">✅</span>
              Verified Cars
            </Badge>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            loading={isSubmitting}
          >
            <Search className="mr-2 h-5 w-5" />
            Search Available Cars
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}