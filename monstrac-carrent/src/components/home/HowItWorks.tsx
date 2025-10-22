import { motion } from 'framer-motion';
import { Search, Car, CreditCard, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search & Select',
      description: 'Browse our extensive fleet and choose your perfect vehicle based on your needs and preferences.',
      color: 'accent-primary',
    },
    {
      icon: Car,
      title: 'Book Your Ride',
      description: 'Complete your booking with flexible pickup options and add any extras like driver or insurance.',
      color: 'neon-purple',
    },
    {
      icon: CreditCard,
      title: 'Pay & Drive',
      description: 'Secure payment, instant confirmation, and you\'re ready to hit the road with your dream car!',
      color: 'neon-green',
    },
  ];

  return (
    <section className="py-20 bg-dark-card/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">How It Works</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Rent a car in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="card p-8 h-full text-center group hover:shadow-2xl hover:shadow-accent-primary/10">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-accent-primary to-neon-purple rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mt-8 mb-6 flex justify-center">
                  <div className={`w-20 h-20 bg-${step.color}/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-10 h-10 text-${step.color}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow (not on last item, hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-accent-primary animate-pulse" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#booking" className="btn-primary px-8 py-4 text-lg inline-flex items-center space-x-2">
            <span>Start Booking Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
