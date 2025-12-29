'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendUpIcon, TrendDownIcon } from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/skeleton';

gsap.registerPlugin(ScrollTrigger);

interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  volume: string;
  high24h: string;
  low24h: string;
}

// Fallback data for testing
const FALLBACK_DATA: CryptoData[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: '107040.59', change24h: '0.44', volume: '28591248562', high24h: '107499.00', low24h: '106322.20' },
  { symbol: 'ETH', name: 'Ethereum', price: '3890.79', change24h: '-1.23', volume: '14567432890', high24h: '3927.73', low24h: '3810.25' },
  { symbol: 'BNB', name: 'BNB', price: '720.45', change24h: '2.15', volume: '1456789321', high24h: '735.20', low24h: '705.80' },
  { symbol: 'SOL', name: 'Solana', price: '245.67', change24h: '3.47', volume: '2847592137', high24h: '252.10', low24h: '238.90' },
  { symbol: 'XRP', name: 'Ripple', price: '2.45', change24h: '-0.89', volume: '4567812934', high24h: '2.52', low24h: '2.38' },
  { symbol: 'ADA', name: 'Cardano', price: '1.23', change24h: '1.67', volume: '1234567890', high24h: '1.28', low24h: '1.19' },
  { symbol: 'DOGE', name: 'Dogecoin', price: '0.42', change24h: '5.23', volume: '3456789012', high24h: '0.44', low24h: '0.39' },
  { symbol: 'DOT', name: 'Polkadot', price: '9.87', change24h: '-2.15', volume: '567890123', high24h: '10.15', low24h: '9.65' },
];

export function CryptoPrices() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/crypto-prices');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setCryptoData(data);
          } else {
            console.log('API returned no data, using fallback');
            setCryptoData(FALLBACK_DATA);
          }
        } else {
          console.log('API response not ok, using fallback data');
          setCryptoData(FALLBACK_DATA);
        }
      } catch (error) {
        console.error('Error fetching crypto prices, using fallback:', error);
        setCryptoData(FALLBACK_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading && cryptoData.length > 0) {
      // Add a small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const ctx = gsap.context(() => {
          // Ensure elements are visible first
          gsap.set(titleRef.current, { opacity: 1, y: 0 });
          gsap.set(cardsRef.current?.children || [], { opacity: 1, y: 0 });

          // Simple fade-in animation without ScrollTrigger for now
          gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );

          gsap.fromTo(cardsRef.current?.children || [],
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
              delay: 0.3
            }
          );
        }, sectionRef);

        return () => ctx.revert();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoading, cryptoData]);

  return (
    <section
      ref={sectionRef}
      id="prices"
      className="py-24 bg-gradient-to-b from-background to-primary/5 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Live Crypto{' '}
            <span className=" bg-clip-text ">
              Market Prices
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time cryptocurrency prices updated every 30 seconds from Binance
          </p>
        </div>

        {/* Ticker */}
        {cryptoData.length > 0 && (
          <div className="group relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur ring-1 ring-primary/20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="flex gap-6 py-3 will-change-transform" style={{ animation: 'scrollLeft 35s linear infinite' }}>
              {[...cryptoData, ...cryptoData].map((crypto, i) => {
                const isPositive = parseFloat(crypto.change24h) >= 0;
                return (
                  <div key={`${crypto.symbol}-${i}`} className="flex items-center gap-3 px-4 py-1 rounded-full bg-black/30 border border-white/10">
                    <span className="text-sm font-semibold">{crypto.symbol}</span>
                    <span className="text-sm opacity-80">${parseFloat(crypto.price).toLocaleString()}</span>
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${isPositive ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-400'}`}>
                      {isPositive ? <TrendUpIcon className="h-3 w-3" /> : <TrendDownIcon className="h-3 w-3" />}
                      {Math.abs(parseFloat(crypto.change24h))}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <style jsx>{`
          .group:hover div[style*='animation'] { animation-play-state: paused; }
          @keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>

        {/* Heatmap Grid */}
        {isLoading ? (
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 sm:p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : cryptoData.length > 0 ? (
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {cryptoData.map((crypto) => {
              const change = parseFloat(crypto.change24h);
              const isPositive = change >= 0;
              const intensity = Math.min(Math.abs(change) / 10, 1); // 0-1 scale
              // Use app primary color (approx RGB of oklch 0.64 0.15 198.6 ~ #06b6d4)
              const primaryRGB = '6, 182, 212';
              const bg = isPositive
                ? `radial-gradient(1200px 300px at 0% 0%, rgba(${primaryRGB},${0.12 + intensity * 0.2}) 0%, transparent 60%)`
                : `radial-gradient(1200px 300px at 0% 0%, rgba(239,68,68,${0.12 + intensity * 0.2}) 0%, transparent 60%)`;
              return (
                <div key={crypto.symbol} className="relative rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-4 sm:p-6 hover:-translate-y-1 transition-transform overflow-hidden">
                  <div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
                  <div className="relative z-10 flex items-start justify-between mb-5">
                    <div>
                      <p className="text-sm text-gray-400">{crypto.name}</p>
                      <p className="text-xl font-semibold tracking-tight">{crypto.symbol}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${isPositive ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-400'}`}>
                      {isPositive ? <TrendUpIcon className="h-3 w-3" /> : <TrendDownIcon className="h-3 w-3" />}
                      {Math.abs(change)}%
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-3xl font-bold tracking-tight">${parseFloat(crypto.price).toLocaleString()}</p>
                    <div className="mt-3 grid grid-cols-2 text-xs gap-4 opacity-80">
                      <div>
                        <p className="text-gray-400">24h High</p>
                        <p className="font-medium">${parseFloat(crypto.high24h).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400">24h Low</p>
                        <p className="font-medium">${parseFloat(crypto.low24h).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Unable to load cryptocurrency data at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Data provided by Binance • Updated in real-time
          </p>
        </div>
      </div>
    </section>
  );
}
