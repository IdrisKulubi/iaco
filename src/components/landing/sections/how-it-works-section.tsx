'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
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

const stepIcons = [
    NumberCircleOneIcon,
    NumberCircleTwoIcon,
    NumberCircleThreeIcon,
    NumberCircleFourIcon,
];

export function HowItWorksSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('howItWorks');

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

    const steps = [
        { key: 'signup', hasBullets: false },
        { key: 'daily', hasBullets: false },
        { key: 'support', hasBullets: true },
        { key: 'foundations', hasBullets: false },
    ];

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50"
            id="how-it-works"
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="hiw-title text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
                        {t('title')}
                    </h2>

                    <div className="steps-container space-y-6">
                        {steps.map((step, index) => {
                            const Icon = stepIcons[index];
                            return (
                                <div
                                    key={step.key}
                                    className="step-card flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="flex-shrink-0">
                                        <Icon className="w-10 h-10 text-primary" weight="fill" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{t(`steps.${step.key}.title`)}</h3>
                                        {!step.hasBullets && (
                                            <p className="text-muted-foreground">{t(`steps.${step.key}.description`)}</p>
                                        )}
                                        {step.hasBullets && (
                                            <ul className="space-y-2 mt-2">
                                                {['answers', 'helps', 'explains'].map((bullet) => (
                                                    <li key={bullet} className="flex items-center gap-2 text-muted-foreground">
                                                        <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0" weight="fill" />
                                                        {t(`steps.${step.key}.bullets.${bullet}`)}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="hiw-conclusion mt-12 text-center p-6 rounded-2xl bg-primary/5 border border-primary/20">
                        <p className="text-lg">
                            {t('conclusion', { emphasis: '' })}
                            <strong>{t('conclusionEmphasis')}</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
