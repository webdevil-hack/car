import { SimpleHero } from '@/components/sections/simple-hero'
import { BookingSearch } from '@/components/sections/booking-search'
import { CarCategories } from '@/components/sections/car-categories'
import { FeaturedCars } from '@/components/sections/featured-cars'
import { HowItWorks } from '@/components/sections/how-it-works'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { CTAPromo } from '@/components/sections/cta-promo'

export default function Home() {
  return (
    <div className="min-h-screen">
      <SimpleHero />
      <BookingSearch />
      <CarCategories />
      <FeaturedCars />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTAPromo />
    </div>
  )
}