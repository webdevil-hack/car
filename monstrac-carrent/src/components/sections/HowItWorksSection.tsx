import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MagnifyingGlassIcon, CreditCardIcon, KeyIcon } from '@heroicons/react/24/outline';


const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      id: 1,
      title: 'Search',
      description: 'Browse our extensive fleet and find your perfect vehicle',
      icon: MagnifyingGlassIcon,
      color: 'from-blue-500 to-cyan-500',
      delay: 0,
    },
    {
      id: 2,
      title: 'Select & Book',
      description: 'Choose your dates, add extras, and confirm your booking',
      icon: CreditCardIcon,
      color: 'from-purple-500 to-pink-500',
      delay: 0.2,
    },
    {
      id: 3,
      title: 'Pay & Drive',
      description: 'Complete payment and pick up your car. Hit the road!',
      icon: KeyIcon,
      color: 'from-orange-500 to-red-500',
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 217, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            How It <span className="glow-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get on the road in 3 simple steps. It's that easy!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Connection Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-[60%] w-full h-0.5 bg-gradient-to-r from-dark-700 to-transparent">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: step.delay + 0.5, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary origin-left"
                  />
                </div>
              )}

              <div className="relative">
                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: step.delay, duration: 0.5, type: 'spring' }}
                  className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-accent-primary to-accent-secondary 
                    rounded-full flex items-center justify-center text-white font-bold text-lg z-10"
                >
                  {step.id}
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card p-8 h-full relative overflow-hidden group"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 
                    group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon Container */}
                  <motion.div
                    animate={inView ? { 
                      rotate: [0, -10, 10, -10, 0],
                    } : {}}
                    transition={{ 
                      delay: step.delay + 0.3,
                      duration: 0.5,
                      ease: 'easeInOut',
                    }}
                    className="w-20 h-20 mx-auto mb-6 relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl opacity-20 blur-xl
                      group-hover:opacity-40 transition-opacity duration-300`} />
                    <div className={`relative w-full h-full bg-gradient-to-br ${step.color} rounded-2xl
                      flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h3 className="font-display font-semibold text-xl text-white mb-3 group-hover:text-accent-primary 
                      transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Animated Background Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <motion.div
                      animate={inView ? {
                        rotate: 360,
                      } : {}}
                      transition={{
                        delay: step.delay,
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-full h-full"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          strokeDasharray="5 5"
                          className="text-gray-600"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/cars'}
            className="btn-primary px-8 py-4 text-lg font-semibold inline-flex items-center space-x-2"
          >
            <span>Start Booking Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;