import { motion } from 'framer-motion';
import { Target, Award, Globe, Shield, Heart } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutPage = () => {
  const stats = [
    { value: '500+', label: 'Premium Cars' },
    { value: '50k+', label: 'Happy Customers' },
    { value: '25+', label: 'Cities' },
    { value: '10+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All vehicles undergo rigorous safety checks and maintenance.',
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      description: 'Your happiness is our top priority. We go the extra mile.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Premium quality vehicles and world-class service standards.',
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and electric vehicles.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-accent-primary/10 to-neon-purple/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                About <span className="glow-text">Monstrac CarRent</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Leading the future of car rentals with premium vehicles, transparent pricing,
                and exceptional service since 2014.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-dark-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold glow-text mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Target className="w-16 h-16 text-accent-primary mb-6" />
                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  To revolutionize the car rental industry by providing seamless, technology-driven
                  experiences that make premium vehicles accessible to everyone.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  We believe in transparency, sustainability, and putting our customers first in
                  everything we do.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {values.map((value, index) => (
                  <div key={index} className="card p-6 text-center">
                    <value.icon className="w-10 h-10 text-accent-primary mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-400">{value.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-dark-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">Leadership Team</h2>
              <p className="text-gray-400 text-lg mt-4">
                Meet the people driving innovation at Monstrac
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Rajesh Kumar', role: 'CEO & Founder', img: 'https://i.pravatar.cc/300?img=12' },
                { name: 'Priya Sharma', role: 'Chief Technology Officer', img: 'https://i.pravatar.cc/300?img=5' },
                { name: 'Amit Patel', role: 'Head of Operations', img: 'https://i.pravatar.cc/300?img=33' },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover text-center p-6"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-accent-primary/30"
                  />
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
