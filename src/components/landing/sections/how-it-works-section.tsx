'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    NumberCircleOneIcon,
    NumberCircleTwoIcon,
    NumberCircleThreeIcon,
    NumberCircleFourIcon,
    CheckCircleIcon,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        icon: NumberCircleOneIcon,
        title: 'Sign up for the challenge',
        description: 'Join and move forward over 21 days, step by step.',
    },
    {
        icon: NumberCircleTwoIcon,
        title: 'One concept per day',
        description: 'Each day, discover one essential concept explained simply, without unnecessary jargon.',
    },
    {
        icon: NumberCircleThreeIcon,
        title: 'Iaco supports you',
        bullets: [
            'It answers your questions',
            'It helps you when you doubt',
            'It explains things differently if needed',
        ],
    },
    {
        icon: NumberCircleFourIcon,
        title: 'Build solid foundations',
        description: 'Day after day: better understanding, better protection, avoiding common mistakes.',
    },
];

export function HowItWorksSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.hiw-title',
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
                '.step-card',
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.steps-container',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.hiw-conclusion',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.hiw-conclusion',
                        start: 'top 90%',
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
            id="how-it-works"
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Title */}
                    <h2 className="hiw-title text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
                        How it works
                    </h2>

                    {/* Steps */}
                    <div className="steps-container space-y-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={index}
                                    className="step-card flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="flex-shrink-0">
                                        <Icon className="w-10 h-10 text-primary" weight="fill" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                        {step.description && (
                                            <p className="text-muted-foreground">{step.description}</p>
                                        )}
                                        {step.bullets && (
                                            <ul className="space-y-2 mt-2">
                                                {step.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                                        <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0" weight="fill" />
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Conclusion */}
                    <div className="hiw-conclusion mt-12 text-center p-6 rounded-2xl bg-primary/5 border border-primary/20">
                        <p className="text-lg">
                            At the end of the challenge, you know where you stand,{' '}
                            <strong>without stress or pressure</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
