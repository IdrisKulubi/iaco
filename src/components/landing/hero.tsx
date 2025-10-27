"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { ArrowRight, Bot, TrendingUp, Shield, Wallet } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states to prevent flash
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          subtitleRef.current,
          ctaRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      );

      // Feature chips inside lanes
      const chips = cardsRef.current?.querySelectorAll("[data-chip]") as
        | NodeListOf<HTMLElement>
        | undefined;
      if (chips && chips.length) {
        gsap.set(chips, {
          opacity: 0,
          y: 20,
        });
      }

      // Create timeline with slight delay to ensure DOM is ready
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1, // Small delay to ensure everything is rendered
      });

      tl.to(badgeRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
      })
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.3"
        )
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.3"
        )
        // Reveal chips (actual items) rather than lanes
        .to(
          cardsRef.current?.querySelectorAll("[data-chip]") || [],
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
          },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { label: "AI Coach", icon: Bot },
    { label: "Portfolio Tracking", icon: TrendingUp },
    { label: "Secure Auth", icon: Shield },
    { label: "Wallet Sync", icon: Wallet },
  ];
  const featuresAlt = [
    { label: "Beginner Friendly", icon: Shield },
    { label: "Live Prices", icon: TrendingUp },
    { label: "AI Insights", icon: Bot },
    { label: "Manage Wallets", icon: Wallet },
  ];

  return (
    <section
      ref={heroRef}
      id="features"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Gradient Background with Spotlight */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-500/5" />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]"
          )}
        />
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="hsl(var(--primary))"
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div ref={badgeRef} className="opacity-0">
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm border-primary/50 bg-primary/5"
            >
              AI-Powered Crypto Learning Platform
            </Badge>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0"
          >
            Your AI Crypto{" "}
            <span className="text-primary">Learning Assistant</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            Master cryptocurrency with personalized AI guidance, real-time
            portfolio tracking, and educational insights designed for beginners.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
          >
            <Button size="lg" className="gap-2 group" asChild>
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#prices">View Live Prices</Link>
            </Button>
          </div>

          {/* Feature Rail - modern marquee chips */}
          <div ref={cardsRef} className="pt-12">
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-4 sm:gap-6 py-3 animate-[scrollLeft_28s_linear_infinite]">
                {[...features, ...features].map((f, i) => (
                  <div
                    data-chip
                    key={`f1-${i}`}
                    className="opacity-0 flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-primary/5 dark:bg-black/30 text-sm"
                  >
                    <f.icon className="h-4 w-4 text-primary" />
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 sm:gap-6 py-3 animate-[scrollRight_32s_linear_infinite]">
                {[...featuresAlt, ...featuresAlt].map((f, i) => (
                  <div
                    data-chip
                    key={`f2-${i}`}
                    className="opacity-0 flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-primary/5 dark:bg-black/30 text-sm"
                  >
                    <f.icon className="h-4 w-4 text-primary" />
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <style jsx>{`
              @keyframes scrollLeft {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(-50%);
                }
              }
              @keyframes scrollRight {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(50%);
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
