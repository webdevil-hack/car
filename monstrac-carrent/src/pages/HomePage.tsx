import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import BookingForm from '../components/home/BookingForm';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedCars from '../components/home/FeaturedCars';
import HowItWorks from '../components/home/HowItWorks';
import AdvantagesSection from '../components/home/AdvantagesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <BookingForm />
        <CategoriesSection />
        <FeaturedCars />
        <HowItWorks />
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
