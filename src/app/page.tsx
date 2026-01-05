import { LandingNavbar } from '@/components/landing';
import { Footer } from '@/components/landing/footer';
import {
  HeroSection,
  YouHesitateSection,
  WhatYouGetSection,
  HowItWorksSection,
  WhoWeAreSection,
  IacoAssistantSection,
  RefundSection,
  SecuritySection,
  FinalCtaSection,
} from '@/components/landing/sections';
import { ChatBubbleWrapper } from '@/components/chat/chat-bubble-wrapper';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <LandingNavbar />
      <HeroSection />
      <YouHesitateSection />
      <WhatYouGetSection />
      <HowItWorksSection />
      <WhoWeAreSection />
      <IacoAssistantSection />
      <RefundSection />
      <SecuritySection />
      <FinalCtaSection />
      <Footer />
      <ChatBubbleWrapper />
    </main>
  );
}
