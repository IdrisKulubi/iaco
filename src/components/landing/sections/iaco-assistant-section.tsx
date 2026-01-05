'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    RobotIcon,
    ChatCircleDotsIcon,
    HandHeartIcon,
    ShieldCheckIcon,
    ProhibitIcon,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: ChatCircleDotsIcon,
        title: 'Answers your questions',
        description: 'Explains without jargon and helps you move forward without stress.',
    },
    {
        icon: HandHeartIcon,
        title: 'You are never alone',
        description: 'Learn at your own pace, without pressure or judgment.',
    },
    {
        icon: ProhibitIcon,
        title: 'No access to your money',
        description: 'Iaco has no access to your funds and gives no investment advice.',
    },
    {
        icon: ShieldCheckIcon,
        title: 'Just guidance',
        description: 'An intelligent assistant to understand, avoid mistakes, and move forward with confidence.',
    },
];

export function IacoAssistantSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.iaco-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.iaco-intro',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.iaco-intro',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.iaco-feature',
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.iaco-features-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50"
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                            <RobotIcon className="w-10 h-10 text-primary" weight="fill" />
                        </div>
                        <h2 className="iaco-title text-3xl md:text-4xl lg:text-5xl font-bold">
                            Iaco, your AI assistant
                        </h2>
                    </div>

                    {/* Intro */}
                    <div className="iaco-intro text-center mb-12">
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Iaco is here to help you understand crypto, simply.
                            Throughout the entire challenge, it supports you step by step.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="iaco-features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="iaco-feature p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary" weight="fill" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
