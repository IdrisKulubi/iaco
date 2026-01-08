'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartIcon, LightbulbIcon, UsersIcon } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAreSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('whoWeAre');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.wwa-title',
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
                '.story-block',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.story-container',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32" id="who-we-are">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="wwa-title text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
                        {t('title')}
                    </h2>

                    <div className="story-container space-y-8">
                        <div className="story-block p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border-l-4 border-primary">
                            <div className="flex items-start gap-4">
                                <LightbulbIcon className="w-8 h-8 text-primary flex-shrink-0" weight="fill" />
                                <div>
                                    <p className="text-lg leading-relaxed">
                                        {t('story1.text')}{' '}
                                        <strong>{t('story1.search')}</strong>
                                    </p>
                                    <p className="mt-3 text-muted-foreground">
                                        {t('story1.continuation')}{' '}
                                        <strong>{t('story1.highlight')}</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="story-block p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border-l-4 border-amber-500">
                            <div className="flex items-start gap-4">
                                <HeartIcon className="w-8 h-8 text-amber-500 flex-shrink-0" weight="fill" />
                                <div>
                                    <p className="text-lg leading-relaxed">
                                        {t('story2.text')}
                                    </p>
                                    <p className="mt-3 text-xl font-semibold text-foreground">
                                        {t('story2.highlight')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="story-block p-6 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-start gap-4">
                                <UsersIcon className="w-8 h-8 text-primary flex-shrink-0" weight="fill" />
                                <div>
                                    <p className="text-lg leading-relaxed">
                                        {t('story3.text')}{' '}
                                        <strong>{t('story3.highlight')}</strong>{' '}
                                        {t('story3.continuation')}
                                    </p>
                                    <p className="mt-3 text-muted-foreground">
                                        {t('story3.birth')}{' '}
                                        <strong className="text-primary">{t('story3.iacoName')}</strong>{' '}
                                        {t('story3.birthEnd')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
