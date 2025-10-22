import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Clock, 
  XCircle, 
  Shield, 
  Award, 
  Ban, 
  RefreshCw, 
  Sparkles 
} from 'lucide-react';

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden charges. What you see is what you pay. Clear breakdown of all costs.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service ready to assist you anytime, anywhere.',
    },
    {
      icon: XCircle,
      title: 'Free Cancellation',
      description: 'Cancel up to 24 hours before pickup with full refund. No questions asked.',
    },
    {
      icon: Award,
      title: 'Verified Drivers',
      description: 'All our drivers are background-checked, licensed, and professionally trained.',
    },
    {
      icon: Shield,
      title: 'Insurance Included',
      description: 'Comprehensive insurance coverage on all rentals for your peace of mind.',
    },
    {
      icon: Ban,
      title: 'No Hidden Charges',
      description: 'All taxes and fees included in the quoted price. Complete transparency.',
    },
    {
      icon: RefreshCw,
      title: 'Easy Refunds',
      description: 'Quick and hassle-free refund process. Money back in 5-7 business days.',
    },
    {
      icon: Sparkles,
      title: 'Clean & Sanitized',
      description: 'All vehicles thoroughly cleaned and sanitized before every rental.',
    },
  ];

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Why Choose Monstrac?</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Experience the difference with our customer-first approach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 group hover:shadow-xl hover:shadow-accent-primary/10"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-primary/20 to-neon-purple/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <advantage.icon className="w-8 h-8 text-accent-primary" />
                </div>
                <h3 className="text-lg font-bold text-white">{advantage.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
