import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    id: 1,
    question: 'What is your cancellation policy?',
    answer: 'You can cancel your booking up to 24 hours before the scheduled pickup time for a full refund. Cancellations made within 24 hours may be subject to a cancellation fee of up to 50% of the booking amount. For same-day bookings, cancellations must be made at least 2 hours before pickup time.',
  },
  {
    id: 2,
    question: 'Is a security deposit required?',
    answer: 'Yes, we require a refundable security deposit that varies based on the vehicle category. The deposit ranges from $200 for economy cars to $1000 for luxury vehicles. The deposit is held on your credit card and released within 3-5 business days after the vehicle is returned in good condition.',
  },
  {
    id: 3,
    question: 'What are the age requirements for renting?',
    answer: 'Renters must be at least 21 years old with a valid driver\'s license. Drivers under 25 may be subject to a young driver surcharge of $25 per day. For luxury and specialty vehicles, the minimum age is 25. Additional restrictions may apply based on location.',
  },
  {
    id: 4,
    question: 'What is included in the daily mileage?',
    answer: 'Most rentals include 150 miles per day. Additional miles are charged at $0.35 per mile for standard vehicles and $0.50 per mile for luxury vehicles. We also offer unlimited mileage packages for longer rentals at competitive rates.',
  },
  {
    id: 5,
    question: 'What documents do I need to rent a car?',
    answer: 'You\'ll need a valid driver\'s license (held for at least 1 year), a credit card in your name for the deposit, and a secondary form of ID (passport or government-issued ID). International renters need an International Driving Permit along with their home country license.',
  },
  {
    id: 6,
    question: 'Can I add an additional driver?',
    answer: 'Yes, additional drivers can be added for $15 per day per driver. All additional drivers must meet the same age and license requirements as the primary renter and must be present at the time of pickup with their documentation.',
  },
  {
    id: 7,
    question: 'What happens if I return the car late?',
    answer: 'Late returns are subject to hourly charges. If you\'re up to 2 hours late, you\'ll be charged an hourly rate. Beyond 2 hours, you\'ll be charged for an additional full day. Please contact us if you need to extend your rental to avoid late fees.',
  },
  {
    id: 8,
    question: 'Is insurance included in the rental price?',
    answer: 'Basic liability insurance is included in all rentals. We offer additional coverage options including Collision Damage Waiver (CDW) and Personal Accident Insurance (PAI) for extra protection. Your personal auto insurance may also provide coverage.',
  },
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-dark-900/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(0, 217, 255, 0.1) 49%, rgba(0, 217, 255, 0.1) 51%, transparent 52%)`,
          backgroundSize: '20px 20px',
        }} />
      </div>
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked <span className="glow-text">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our car rental service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left
                    hover:bg-dark-800/50 transition-colors duration-300"
                >
                  <h3 className="font-medium text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact Support Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-gray-400 mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="btn-primary px-6 py-3"
              >
                Contact Support
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/help"
                className="btn-secondary px-6 py-3"
              >
                Visit Help Center
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;