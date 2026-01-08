'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    RocketIcon,
    ShieldCheckIcon,
    ChatCircleIcon,
    TrophyIcon,
    BookOpenIcon,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const benefitIcons = [RocketIcon, BookOpenIcon, ShieldCheckIcon, ChatCircleIcon, TrophyIcon];
const benefitKeys = ['stepByStep', 'clear', 'risks', 'support', 'confidence'];

export function WhatYouGetSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('whatYouGet');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.wyg-title',
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
                '.benefit-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.benefits-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="wyg-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            {t('title')}{' '}
                            <span className="text-primary">{t('titleHighlight')}</span>
                        </h2>
                    </div>

                    <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefitKeys.map((key, index) => {
                            const Icon = benefitIcons[index];
                            return (
                                <div
                                    key={key}
                                    className="benefit-card p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-primary" weight="fill" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{t(`benefits.${key}.title`)}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {t(`benefits.${key}.description`)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
