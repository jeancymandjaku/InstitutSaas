import React from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingTrustBar } from '../components/landing/LandingTrustBar';
import { LandingProblemSection } from '../components/landing/LandingProblemSection';
import { LandingTransformationSection } from '../components/landing/LandingTransformationSection';
import { LandingProductShowcase } from '../components/landing/LandingProductShowcase';
import { LandingCalendarSection } from '../components/landing/LandingCalendarSection';
import { LandingClientSection } from '../components/landing/LandingClientSection';
import { LandingBookingSection } from '../components/landing/LandingBookingSection';
import { LandingFeatureStory } from '../components/landing/LandingFeatureStory';
import { LandingWorkflowSection } from '../components/landing/LandingWorkflowSection';
import { LandingTeamSection } from '../components/landing/LandingTeamSection';
import { LandingVideoTour } from '../components/landing/LandingVideoTour';
import { LandingUseCases } from '../components/landing/LandingUseCases';
import { LandingValueSection } from '../components/landing/LandingValueSection';
import { LandingPricingSection } from '../components/landing/LandingPricingSection';
import { LandingTestimonials } from '../components/landing/LandingTestimonials';
import { LandingFaq } from '../components/landing/LandingFaq';
import { LandingFinalCta } from '../components/landing/LandingFinalCta';
import { LandingFooter } from '../components/landing/LandingFooter';
import { AuthModal } from '../components/modals/AuthModal';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#24312B] font-sans selection:bg-[#E8EEE8] selection:text-[#16382D]">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingTrustBar />
        <LandingProblemSection />
        <LandingTransformationSection />
        <LandingProductShowcase />
        <LandingCalendarSection />
        <LandingClientSection />
        <LandingBookingSection />
        <LandingFeatureStory />
        <LandingWorkflowSection />
        <LandingTeamSection />
        <LandingVideoTour />
        <LandingUseCases />
        <LandingValueSection />
        <LandingPricingSection />
        <LandingTestimonials />
        <LandingFaq />
        <LandingFinalCta />
      </main>
      <LandingFooter />

      {/* Interactive Manager Connection & Onboarding Modal */}
      <AuthModal />
    </div>
  );
};
