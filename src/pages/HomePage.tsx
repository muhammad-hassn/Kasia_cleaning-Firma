import Hero from '@/sections/Hero';
import TrustStrip from '@/sections/TrustStrip';
import Services from '@/sections/Services';
import WhyChooseUs from '@/sections/WhyChooseUs';
import BeforeAfter from '@/sections/BeforeAfter';
import HowItWorks from '@/sections/HowItWorks';
import Reviews from '@/sections/Reviews';
import Gallery from '@/sections/Gallery';
import FinalCTA from '@/sections/FinalCTA';
import FAQ from '@/sections/FAQ';
import ContactSection from '@/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <WhyChooseUs />
      <BeforeAfter />
      <HowItWorks />
      <Reviews />
      <Gallery />
      <FinalCTA />
      <FAQ />
      <ContactSection />
    </>
  );
}
