'use client'

import React, { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'What do I need to rent a car?',
    answer: 'You need a valid driver\'s license, a credit card for payment and security deposit, and you must be at least 21 years old (25 for luxury vehicles). International visitors need a valid passport and international driving permit.',
  },
  {
    id: 2,
    question: 'Can I cancel my reservation?',
    answer: 'Yes, you can cancel your reservation up to 24 hours before the pickup time for a full refund. Cancellations made within 24 hours may be subject to a cancellation fee. Premium and luxury vehicle bookings may have different cancellation policies.',
  },
  {
    id: 3,
    question: 'What is included in the rental price?',
    answer: 'Our rental prices include basic insurance coverage, unlimited mileage within the city limits, 24/7 roadside assistance, and vehicle maintenance. Additional services like GPS, child seats, and extended insurance can be added for an extra fee.',
  },
  {
    id: 4,
    question: 'How old do I need to be to rent a car?',
    answer: 'The minimum age to rent a car is 21 years old. Drivers aged 21-24 may be subject to a young driver surcharge and have restrictions on certain vehicle categories. Luxury and premium vehicles require drivers to be at least 25 years old.',
  },
  {
    id: 5,
    question: 'Do you offer one-way rentals?',
    answer: 'Yes, we offer one-way rentals between most of our locations. Additional fees may apply depending on the pickup and drop-off locations. Please check availability and pricing when making your reservation.',
  },
  {
    id: 6,
    question: 'What happens if the car breaks down?',
    answer: 'All our vehicles come with 24/7 roadside assistance. If you experience any issues, call our emergency hotline and we\'ll provide immediate assistance. We\'ll arrange for repairs or a replacement vehicle at no additional cost to you.',
  },
  {
    id: 7,
    question: 'Can I add an additional driver?',
    answer: 'Yes, you can add additional drivers to your rental. Each additional driver must meet our age and license requirements and will be subject to an additional daily fee. The additional driver must be present during pickup to complete the paperwork.',
  },
  {
    id: 8,
    question: 'What is your fuel policy?',
    answer: 'We operate on a "full-to-full" fuel policy. You\'ll receive the car with a full tank and should return it with a full tank. If you return the car without refueling, we\'ll charge a refueling fee plus the cost of fuel at premium rates.',
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold font-heading mb-4">
            Frequently Asked
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our car rental service. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openItems.includes(faq.id)
            
            return (
              <div
                key={faq.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600 overflow-hidden hover:border-gray-500 transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-gray-600">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600 p-8">
            <h3 className="text-2xl font-bold font-heading text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6">
              Our customer support team is here to help you 24/7. Get in touch with us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                Contact Support
              </button>
              <button className="px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}