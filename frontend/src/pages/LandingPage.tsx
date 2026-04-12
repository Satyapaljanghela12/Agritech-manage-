import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { TransitionSection } from '../components/landing/TransitionSection';
import { StorySection } from '../components/landing/StorySection';
import { StatsStrip } from '../components/landing/StatsStrip';
import { FeatureFlow } from '../components/landing/FeatureFlow';
import { DashboardExperience } from '../components/landing/DashboardExperience';
import { UseCasesInteractive } from '../components/landing/UseCasesInteractive';
import { TimelineSection } from '../components/landing/TimelineSection';
import { ComparisonSplit } from '../components/landing/ComparisonSplit';
import { TestimonialsCarousel } from '../components/landing/TestimonialsCarousel';
import { FAQ } from '../components/landing/FAQ';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <HeroSection />
      <TransitionSection />
      <StorySection />
      <StatsStrip />
      <FeatureFlow />
      <DashboardExperience />
      <UseCasesInteractive />
      <TimelineSection />
      <ComparisonSplit />
      <TestimonialsCarousel />
      <FAQ />
      <section id="contact">
        <CTASection />
      </section>
      <Footer />
    </div>
  );
};
