'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    WarningCircleIcon,
    CurrencyCircleDollarIcon,
    QuestionIcon,
    ProhibitIcon
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const painPointIcons = [
    CurrencyCircleDollarIcon,
    WarningCircleIcon,
    QuestionIcon,
    ProhibitIcon,
];

export function YouHesitateSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('youHesitate');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.hesitate-title',
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
                '.hesitate-subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.pain-point',
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.pain-points-container',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.hesitate-conclusion',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.hesitate-conclusion',
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const painPoints = [
        { key: 'money', icon: CurrencyCircleDollarIcon },
        { key: 'scams', icon: WarningCircleIcon },
        { key: 'jargon', icon: QuestionIcon },
        { key: 'action', icon: ProhibitIcon },
    ];

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50"
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Title */}
                    <h2 className="hesitate-title text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
                        {t('title')}{' '}
                        <span className="text-muted-foreground">{t('titleHighlight')}</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="hesitate-subtitle text-lg text-muted-foreground text-center mb-12">
                        {t('subtitle')}
                    </p>

                    {/* Pain Points */}
                    <div className="pain-points-container space-y-4 mb-12">
                        {painPoints.map((point, index) => {
                            const Icon = point.icon;
                            return (
                                <div
                                    key={index}
                                    className="pain-point flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-red-500 dark:text-red-400" weight="fill" />
                                    </div>
                                    <p className="text-lg font-medium">{t(`painPoints.${point.key}`)}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Conclusion */}
                    <div className="hesitate-conclusion text-center p-6 rounded-2xl bg-primary/5 border border-primary/20">
                        <p className="text-lg text-muted-foreground">
                            {t('conclusion')}{' '}
                            <strong className="text-foreground">{t('conclusionHighlight')}</strong>.
                        </p>
                        <p className="mt-4 text-xl font-semibold text-primary">
                            {t('reason')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
