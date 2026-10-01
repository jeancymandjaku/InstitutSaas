import React from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingPricingSection } from '../components/landing/LandingPricingSection';
import { LandingFaq } from '../components/landing/LandingFaq';
import { LandingFinalCta } from '../components/landing/LandingFinalCta';
import { LandingFooter } from '../components/landing/LandingFooter';
import { AuthModal } from '../components/modals/AuthModal';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#24312B] font-sans selection:bg-[#E8EEE8] selection:text-[#16382D]">
      <LandingNavbar />
      <main className="pt-20">
        <LandingPricingSection />
        <LandingFaq />
        <LandingFinalCta />
      </main>
      <LandingFooter />

      {/* Interactive Manager Connection & Onboarding Modal */}
      <AuthModal />
    </div>
  );
};
