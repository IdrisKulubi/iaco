import { LandingNavbar, Hero, CryptoPrices, FAQ, Footer } from '@/components/landing';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <LandingNavbar />
      <Hero />
      <CryptoPrices />
      <FAQ />
      <Footer />
    </main>
  );
}
