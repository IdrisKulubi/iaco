'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
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

        {isLoading ? (
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-4 sm:p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </Card>
            ))}
          </div>
        ) : cryptoData.length > 0 ? (
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {cryptoData.map((crypto) => {
              const isPositive = parseFloat(crypto.change24h) >= 0;
              return (
                <Card
                  key={crypto.symbol}
                  className="p-4 sm:p-6 hover:shadow-lg hover:shadow-primary/10 transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{crypto.name}</p>
                      <p className="text-lg font-bold">{crypto.symbol}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        isPositive
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(parseFloat(crypto.change24h))}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold group-hover:text-primary transition-colors">
                        ${parseFloat(crypto.price).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Current Price</p>
                    </div>

                    <div className="flex justify-between text-xs pt-2 border-t">
                      <div>
                        <p className="text-muted-foreground">24h High</p>
                        <p className="font-medium">
                          ${parseFloat(crypto.high24h).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">24h Low</p>
                        <p className="font-medium">
                          ${parseFloat(crypto.low24h).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
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
