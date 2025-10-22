import HeroSection from '../components/sections/HeroSection';
import BookingFormSection from '../components/sections/BookingFormSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import FeaturedCarsSection from '../components/sections/FeaturedCarsSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import AdvantagesSection from '../components/sections/AdvantagesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Section 1: Hero Banner */}
      <HeroSection />
      
      {/* Section 2: Booking/Search Form */}
      <BookingFormSection />
      
      {/* Section 3: Top Categories / Car Types */}
      <CategoriesSection />
      
      {/* Section 4: Featured / Popular Cars */}
      <FeaturedCarsSection />
      
      {/* Section 5: How it Works */}
      <HowItWorksSection />
      
      {/* Section 6: Advantages / Why Choose Us */}
      <AdvantagesSection />
      
      {/* Section 7: Customer Testimonials */}
      <TestimonialsSection />
      
      {/* Section 8: FAQ */}
      <FAQSection />
      
      {/* Section 9: CTA / Promo Strip */}
      <CTASection />
    </div>
  );
};

export default HomePage;