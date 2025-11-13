import { LandingNavbar, Hero, CryptoPrices, FAQ, Footer } from '@/components/landing';
import { ChatBubbleWrapper } from '@/components/chat/chat-bubble-wrapper';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <LandingNavbar />
      <Hero />
      <CryptoPrices />
      <FAQ />
      <Footer />
      <ChatBubbleWrapper />
    </main>
  );
}
