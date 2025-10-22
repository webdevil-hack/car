import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const faqs = [
    {
      id: 1,
      question: 'What is your cancellation policy?',
      answer: 'You can cancel your booking up to 24 hours before the pickup time with no penalty. Cancellations made within 24 hours will incur a 50% cancellation fee. Same-day cancellations are subject to a 100% fee.'
    },
    {
      id: 2,
      question: 'What documents do I need to rent a car?',
      answer: 'You need a valid driver\'s license, a credit card in your name, and a government-issued ID. International visitors need a valid passport and international driving permit. The minimum age requirement is 21 years.'
    },
    {
      id: 3,
      question: 'Is insurance included in the rental price?',
      answer: 'Yes, comprehensive insurance coverage is included with every rental. This covers collision damage, theft, and third-party liability. Additional coverage options are available for purchase if needed.'
    },
    {
      id: 4,
      question: 'What happens if I return the car late?',
      answer: 'Late returns are subject to additional charges. We provide a 1-hour grace period, after which you\'ll be charged for an additional day. Please contact us if you anticipate being late to discuss options.'
    },
    {
      id: 5,
      question: 'Can I add additional drivers to my rental?',
      answer: 'Yes, you can add additional drivers for a small fee. All additional drivers must meet the same age and license requirements and be present at the time of pickup to complete the paperwork.'
    },
    {
      id: 6,
      question: 'What is your mileage policy?',
      answer: 'Most of our rentals include unlimited mileage within the rental period. Some luxury or specialty vehicles may have mileage restrictions. Please check the specific terms for your chosen vehicle.'
    },
    {
      id: 7,
      question: 'How do I extend my rental period?',
      answer: 'You can extend your rental by contacting our customer service team or through the mobile app. Extensions are subject to vehicle availability and may incur additional charges. Please request extensions at least 24 hours in advance.'
    },
    {
      id: 8,
      question: 'What if the car breaks down during my rental?',
      answer: 'We provide 24/7 roadside assistance. If your vehicle breaks down, contact our emergency hotline and we\'ll arrange for a replacement vehicle or repair service. You won\'t be charged for mechanical failures.'
    },
    {
      id: 9,
      question: 'Can I pick up the car at one location and return it to another?',
      answer: 'Yes, we offer one-way rentals between most of our locations for an additional fee. Please check availability and pricing when making your booking. Some restrictions may apply to certain vehicle types.'
    },
    {
      id: 10,
      question: 'How do I get a refund if I\'m eligible?',
      answer: 'Refunds are processed automatically for eligible cancellations within 5-7 business days to your original payment method. For other refund requests, please contact our customer service team with your booking details.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our car rental service
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800/80 backdrop-blur-sm border border-dark-700/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-dark-700/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.has(faq.id) ? (
                    <MinusIcon className="w-6 h-6 text-accent-primary" />
                  ) : (
                    <PlusIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openItems.has(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-dark-800/80 to-dark-700/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-600/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our customer support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-neon text-dark-900 font-semibold rounded-lg hover:shadow-neon transition-all duration-300">
                Contact Support
              </button>
              <button className="px-6 py-3 border-2 border-accent-primary text-accent-primary font-semibold rounded-lg hover:bg-accent-primary hover:text-dark-900 transition-all duration-300">
                Live Chat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;