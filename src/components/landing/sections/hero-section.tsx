'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BetaModal } from '../beta-modal';
import { ShieldCheckIcon, SparkleIcon } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showBetaModal, setShowBetaModal] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set('.hero-badge', { opacity: 0, y: 30 });
            gsap.set('.hero-headline', { opacity: 0, y: 50 });
            gsap.set('.hero-subtitle', { opacity: 0, y: 40 });
            gsap.set('.hero-guarantee', { opacity: 0, scale: 0.9 });
            gsap.set('.hero-cta', { opacity: 0, y: 30 });

            // Animate in sequence
            const tl = gsap.timeline({ delay: 0.2 });

            tl.to('.hero-badge', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
            })
                .to('.hero-headline', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.3')
                .to('.hero-subtitle', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                }, '-=0.4')
                .to('.hero-guarantee', {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                }, '-=0.3')
                .to('.hero-cta', {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                }, '-=0.2');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleBetaClick = () => {
        // Track click event
        if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
            (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'beta_signup_click', {
                event_category: 'engagement',
                event_label: 'hero_cta',
            });
        }
        setShowBetaModal(true);
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div ref={contentRef} className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <div className="hero-badge">
                        <Badge
                            variant="outline"
                            className="px-4 py-2 text-sm border-primary/30 bg-primary/5 font-medium"
                        >
                            <SparkleIcon className="w-4 h-4 mr-2 text-primary" weight="fill" />
                            21-Day Challenge
                        </Badge>
                    </div>

                    {/* Headline */}
                    <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                        Understand crypto in{' '}
                        <span className="text-primary">21 days</span>.
                        <br />
                        <span className="text-muted-foreground">No jargon. No stress.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A simple challenge to understand crypto, avoid scams and move forward with confidence,
                        supported by <strong className="text-foreground">Iaco</strong>, your AI assistant.
                    </p>

                    {/* Guarantee Badge */}
                    <div className="hero-guarantee inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                        <ShieldCheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" weight="fill" />
                        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                            Refunded if you succeed in the challenge
                        </span>
                    </div>

                    {/* CTA */}
                    <div className="hero-cta pt-4">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                            onClick={handleBetaClick}
                        >
                            Join the Beta Waiting List
                        </Button>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Be among the first to access the challenge
                        </p>
                    </div>
                </div>
            </div>

            <BetaModal open={showBetaModal} onOpenChange={setShowBetaModal} />
        </section>
    );
}
