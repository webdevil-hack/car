'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Clock, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookingForm } from '@/components/forms/booking-form'
import { CarScene } from '@/components/3d/car-scene'

const trustBadges = [
  { icon: Shield, text: 'Fully Insured', color: 'text-success' },
  { icon: Clock, text: '24/7 Support', color: 'text-info' },
  { icon: Star, text: 'Verified Cars', color: 'text-warning' },
]

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Premium Cars' },
  { value: '50+', label: 'Cities Covered' },
  { value: '4.9', label: 'Average Rating' },
]

export function HeroSection() {
  const handleBookingSubmit = (data: any) => {
    console.log('Booking submitted:', data)
    // Handle booking submission
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(217,70,239,0.1),transparent_50%)]" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge variant="neon" className="text-sm px-4 py-2">
                  <span className="mr-2">🚗</span>
                  Premium Car Rental Experience
                </Badge>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                  Drive Your
                  <span className="block gradient-text">
                    Dream Car
                  </span>
                  Today
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed">
                  Experience luxury and comfort with our premium fleet. From economy to exotic, 
                  find the perfect car for every journey.
                </p>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-6"
              >
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
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="gradient" size="xl" className="group">
                  <span>Book Your Ride</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl" className="group">
                  <Play className="mr-2 h-5 w-5" />
                  <span>Watch Demo</span>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-600"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold font-heading gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - 3D Car Scene */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                {/* 3D Car Scene */}
                <CarScene 
                  className="w-full h-full" 
                  interactive={true}
                  autoRotate={false}
                />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-600"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">Available Now</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-600"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold gradient-text">$49</div>
                    <div className="text-xs text-gray-400">per day</div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl transform scale-110" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <div className="transform translate-y-1/2">
            <BookingForm onSubmit={handleBookingSubmit} />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-foreground-muted to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}