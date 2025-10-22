import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: 'hatchback',
    name: 'Hatchback',
    icon: '🚗',
    description: 'Compact and fuel-efficient',
    count: 24,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'sedan',
    name: 'Sedan',
    icon: '🚙',
    description: 'Comfortable family cars',
    count: 36,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'suv',
    name: 'SUV',
    icon: '🚙',
    description: 'Spacious and powerful',
    count: 28,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: '🏎️',
    description: 'Premium experience',
    count: 18,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'electric',
    name: 'Electric',
    icon: '⚡',
    description: 'Eco-friendly rides',
    count: 15,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'van',
    name: 'Vans',
    icon: '🚐',
    description: 'Group travel solutions',
    count: 12,
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'self-drive',
    name: 'Self-drive',
    icon: '🔑',
    description: 'Drive yourself',
    count: 42,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'with-driver',
    name: 'With Driver',
    icon: '👨‍✈️',
    description: 'Professional chauffeur',
    count: 30,
    gradient: 'from-teal-500 to-cyan-500',
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate('/cars', { state: { selectedCategory: categoryId } });
  };

  return (
    <section className="py-16 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Browse by <span className="glow-text">Category</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose from our diverse fleet to match your travel needs
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
              className="card p-6 cursor-pointer group relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                
                {/* Title */}
                <h3 className="font-display font-semibold text-lg text-white mb-1 group-hover:text-accent-primary transition-colors duration-300">
                  {category.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-400 mb-3">
                  {category.description}
                </p>
                
                {/* Count Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {category.count} cars available
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-accent-primary 
                      transform group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-primary/10 blur-3xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate('/cars')}
            className="inline-flex items-center space-x-2 text-accent-primary hover:text-accent-primary/80 
              font-medium transition-colors duration-300 group"
          >
            <span>View All Cars</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;