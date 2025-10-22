import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  CurrencyDollarIcon,
  PhoneIcon,
  XCircleIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  ArrowPathIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const advantages = [
  {
    icon: CurrencyDollarIcon,
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise charges. What you see is what you pay.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: PhoneIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to assist you anytime, anywhere.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: XCircleIcon,
    title: 'Free Cancellation',
    description: 'Cancel up to 24 hours before pickup with full refund.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: UserGroupIcon,
    title: 'Verified Drivers',
    description: 'Professional, licensed chauffeurs with background checks.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Insurance Included',
    description: 'Comprehensive coverage included with every rental.',
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    icon: DocumentCheckIcon,
    title: 'No Hidden Charges',
    description: 'Clear breakdown of all costs upfront. No surprises.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: ArrowPathIcon,
    title: 'Easy Refunds',
    description: 'Quick and hassle-free refund process when needed.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: SparklesIcon,
    title: 'Clean & Sanitized',
    description: 'All vehicles thoroughly cleaned and sanitized before each rental.',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

const AdvantagesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-dark-900/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Why Choose <span className="glow-text">Monstrac</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the difference with our commitment to excellence and customer satisfaction
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="card p-6 h-full relative overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 
                  group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${advantage.gradient} rounded-xl
                    flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300`}>
                    <advantage.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Icon Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} rounded-xl
                    opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-accent-primary 
                  transition-colors duration-300">
                  {advantage.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {advantage.description}
                </p>

                {/* Hover Effect - Corner Decoration */}
                <div className="absolute -bottom-1 -right-1 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <path
                      d="M0 64 Q32 64 32 32 T64 0"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d9ff" />
                        <stop offset="100%" stopColor="#bd00ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Happy Customers', value: '50K+', suffix: '' },
            { label: 'Cars Available', value: '500', suffix: '+' },
            { label: 'Cities Covered', value: '25', suffix: '+' },
            { label: 'Years of Service', value: '10', suffix: '+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center group"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5, type: 'spring' }}
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary 
                  bg-clip-text text-transparent mb-2"
              >
                {stat.value}{stat.suffix}
              </motion.div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;