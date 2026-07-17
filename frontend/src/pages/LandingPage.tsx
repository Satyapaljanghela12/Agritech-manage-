import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ServicesStrip } from '../components/landing/ServicesStrip';
import { AboutSection } from '../components/landing/AboutSection';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FAQSection } from '../components/landing/FAQSection';
import { CTABanner } from '../components/landing/CTABanner';
import { Footer } from '../components/landing/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesStrip />
      <AboutSection />
      <FeaturesGrid />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
};
