'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ShieldIcon,
    LockKeyIcon,
    ProhibitIcon,
    CheckCircleIcon,
    EyeSlashIcon,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const trustPoints = [
    {
        icon: ProhibitIcon,
        title: 'No investment advice',
        description: 'Iaco is 100% educational. We help you understand crypto, not tell you what to buy.',
    },
    {
        icon: LockKeyIcon,
        title: 'No private keys requested',
        description: 'No seed phrase, no access to your accounts or your money.',
    },
    {
        icon: EyeSlashIcon,
        title: 'Your data stays private',
        description: 'We don\'t share or sell your information. Ever.',
    },
    {
        icon: CheckCircleIcon,
        title: 'Full control',
        description: 'Move at your own pace and stop at any time.',
    },
];

export function SecuritySection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.security-title',
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
                '.trust-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.trust-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.security-conclusion',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.security-conclusion',
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
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                            <ShieldIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" weight="fill" />
                        </div>
                        <h2 className="security-title text-3xl md:text-4xl lg:text-5xl font-bold">
                            Security, trust &amp; compliance
                        </h2>
                    </div>

                    {/* Trust Points Grid */}
                    <div className="trust-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {trustPoints.map((point, index) => {
                            const Icon = point.icon;
                            return (
                                <div
                                    key={index}
                                    className="trust-card p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" weight="fill" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">{point.title}</h3>
                                            <p className="text-muted-foreground text-sm">{point.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Conclusion */}
                    <div className="security-conclusion text-center p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                        <p className="text-lg text-muted-foreground">
                            No unrealistic promises, no &quot;easy money&quot;,{' '}
                            <strong className="text-foreground">just clear, honest, and transparent guidance</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
