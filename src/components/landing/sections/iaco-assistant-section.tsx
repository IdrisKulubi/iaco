'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
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

const featureIcons = [ChatCircleDotsIcon, HandHeartIcon, ProhibitIcon, ShieldCheckIcon];
const featureKeys = ['answers', 'neverAlone', 'noAccess', 'guidance'];

export function IacoAssistantSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('iacoAssistant');

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
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                            <RobotIcon className="w-10 h-10 text-primary" weight="fill" />
                        </div>
                        <h2 className="iaco-title text-3xl md:text-4xl lg:text-5xl font-bold">
                            {t('title')}
                        </h2>
                    </div>

                    <div className="iaco-intro text-center mb-12">
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('intro')}
                        </p>
                    </div>

                    <div className="iaco-features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featureKeys.map((key, index) => {
                            const Icon = featureIcons[index];
                            return (
                                <div
                                    key={key}
                                    className="iaco-feature p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary" weight="fill" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">{t(`features.${key}.title`)}</h3>
                                            <p className="text-muted-foreground text-sm">{t(`features.${key}.description`)}</p>
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
