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
import { setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

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
