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
          setCryptoData(data);
        }
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
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
      const ctx = gsap.context(() => {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        gsap.from(cardsRef.current?.children || [], {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isLoading, cryptoData]);

  return (
    <section
      ref={sectionRef}
      id="prices"
      className="py-24 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto px-4 lg:px-8">
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
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </Card>
            ))}
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cryptoData.map((crypto) => {
              const isPositive = parseFloat(crypto.change24h) >= 0;
              return (
                <Card
                  key={crypto.symbol}
                  className="p-6 hover:shadow-lg hover:shadow-primary/10 transition-all hover:-translate-y-1 cursor-pointer group"
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
