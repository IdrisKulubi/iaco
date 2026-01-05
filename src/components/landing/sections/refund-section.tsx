'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    CheckCircleIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const conditions = [
    { text: '90% of lessons completed' },
    { text: 'At least 80% on the final quiz' },
    { text: '2 alerts activated' },
];

export function RefundSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.refund-title',
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
                '.refund-content',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.refund-content',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.condition-item',
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.conditions-list',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32" id="refund">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                            <ShieldCheckIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" weight="fill" />
                        </div>
                        <h2 className="refund-title text-3xl md:text-4xl lg:text-5xl font-bold">
                            Refund conditions
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="refund-content space-y-8">
                        {/* Promise */}
                        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                            <p className="text-xl font-semibold text-center text-emerald-700 dark:text-emerald-300">
                                Our promise is simple: if you succeed in the challenge, you can be refunded.
                            </p>
                        </div>

                        {/* Conditions */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <p className="text-lg font-medium mb-4">
                                To validate success, you simply need to meet these objective conditions:
                            </p>
                            <ul className="conditions-list space-y-3">
                                {conditions.map((condition, index) => (
                                    <li
                                        key={index}
                                        className="condition-item flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                                    >
                                        <CheckCircleIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" weight="fill" />
                                        <span className="text-lg">{condition.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Conclusion */}
                        <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30">
                            <p className="text-muted-foreground">
                                If these criteria are met, you can request your refund,{' '}
                                <strong className="text-foreground">with no unnecessary discussion</strong>.
                            </p>
                            <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                                <ArrowRightIcon className="w-4 h-4" />
                                This guarantee exists for one reason only: to allow you to learn without pressure,
                                with a clear and transparent framework.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
