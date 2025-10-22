import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/sections/HeroSection';
import BookingFormSection from '../components/sections/BookingFormSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import FeaturedCarsSection from '../components/sections/FeaturedCarsSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import AdvantagesSection from '../components/sections/AdvantagesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />
      
      <main>
        <HeroSection />
        <BookingFormSection />
        <CategoriesSection />
        <FeaturedCarsSection />
        <HowItWorksSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;