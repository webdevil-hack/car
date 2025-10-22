import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { carCategories } from '../../data/mockData';

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/cars?category=${categoryId}`);
  };

  return (
    <section className="py-20 bg-dark-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Browse by Category</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Choose from our diverse fleet of vehicles tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {carCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.id)}
              className="card-hover p-6 cursor-pointer group"
            >
              <div className="text-center space-y-3">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-accent-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400">{category.count} cars</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
