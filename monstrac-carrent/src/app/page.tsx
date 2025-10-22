import { Hero } from "@/components/sections/Hero";
import { SearchForm } from "@/components/sections/SearchForm";
import { Categories } from "@/components/sections/Categories";
import { Featured } from "@/components/sections/Featured";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Advantages } from "@/components/sections/Advantages";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { PromoStrip } from "@/components/sections/PromoStrip";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <Hero />
      <SearchForm />
      <Categories />
      <Featured />
      <HowItWorks />
      <Advantages />
      <Testimonials />
      <FAQ />
      <PromoStrip />
    </main>
  );
}
