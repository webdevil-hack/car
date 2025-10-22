import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredTime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: '24/7 Customer Support'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['support@monstrac.com', 'info@monstrac.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: MapPinIcon,
      title: 'Office',
      details: ['123 Business Ave', 'City, State 12345'],
      description: 'Visit our headquarters'
    },
    {
      icon: ClockIcon,
      title: 'Hours',
      details: ['Mon-Fri: 9AM-6PM', 'Sat-Sun: 10AM-4PM'],
      description: 'Business hours'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We're here to help! Reach out to us for any questions, support, or feedback.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Contact <span className="text-gradient">Information</span>
                  </h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Choose your preferred way to reach us. We're always ready to assist you.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 p-6 bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700/50 hover:border-accent-primary/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-neon rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-dark-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-gray-300">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-accent-primary mt-2">
                          {info.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Live Chat CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-dark-800/80 to-dark-700/80 backdrop-blur-sm rounded-2xl p-6 border border-dark-600/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-neon rounded-xl flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-dark-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Live Chat Available
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        Get instant help from our support team
                      </p>
                      <button className="px-4 py-2 bg-gradient-neon text-dark-900 font-semibold rounded-lg hover:shadow-neon transition-all duration-300">
                        Start Chat
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/50">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Send us a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Preferred Contact Time
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                        >
                          <option value="">Select time</option>
                          <option value="morning">Morning (9AM-12PM)</option>
                          <option value="afternoon">Afternoon (12PM-5PM)</option>
                          <option value="evening">Evening (5PM-8PM)</option>
                          <option value="anytime">Anytime</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-neon text-dark-900 font-bold rounded-xl hover:shadow-neon-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-dark-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Find Us on the <span className="text-gradient">Map</span>
              </h2>
              <p className="text-xl text-gray-300">
                Visit our headquarters or find the nearest service center
              </p>
            </motion.div>

            <div className="bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/50">
              <div className="h-96 bg-gradient-to-br from-dark-700 to-dark-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-16 h-16 text-accent-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-300">
                    Map integration would go here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;