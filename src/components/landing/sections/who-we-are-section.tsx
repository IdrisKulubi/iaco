'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartIcon, LightbulbIcon, UsersIcon } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAreSection() {
    const sectionRef = useRef<HTMLElement>(null);

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
                    {/* Title */}
                    <h2 className="wwa-title text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
                        Who we are
                    </h2>

                    {/* Story */}
                    <div className="story-container space-y-8">
                        {/* Block 1 */}
                        <div className="story-block p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border-l-4 border-primary">
                            <div className="flex items-start gap-4">
                                <LightbulbIcon className="w-8 h-8 text-primary flex-shrink-0" weight="fill" />
                                <div>
                                    <p className="text-lg leading-relaxed">
                                        It all started with a very simple search. One day, our founder typed:{' '}
                                        <strong>&quot;how to invest in crypto?&quot;</strong>
                                    </p>
                                    <p className="mt-3 text-muted-foreground">
                                        She found videos, courses, tutorials everywhere. But when it came time to take action,
                                        something was missing: clear explanations, without jargon, and above all{' '}
                                        <strong>real guidance</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Block 2 */}
                        <div className="story-block p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border-l-4 border-amber-500">
                            <div className="flex items-start gap-4">
                                <HeartIcon className="w-8 h-8 text-amber-500 flex-shrink-0" weight="fill" />
                                <div>
                                    <p className="text-lg leading-relaxed">
                                        Too much complexity, too much fear of making a mistake, too much pressure.
                                        That&apos;s when she understood one essential thing:
                                    </p>
                                    <p className="mt-3 text-xl font-semibold text-foreground">
                                        The real problem is not a lack of information, but a lack of guidance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Block 3 */}
                        <div className="story-block p-6 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-start gap-4">
                                <UsersIcon className="w-8 h-8 text-primary flex-shrink-0" weight="fill" />
                                <div>
                                    <p className="text-lg leading-relaxed">
                                        She then decided to create the tool she would have wanted herself.
                                        A <strong>simple, caring guide</strong> that explains without judging and supports step by step.
                                    </p>
                                    <p className="mt-3 text-muted-foreground">
                                        With a developer sharing the same vision, <strong className="text-primary">Iaco</strong> was born.
                                        An intelligent assistant designed to make crypto more understandable, more human,
                                        and accessible to those who want to move forward with confidence.
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
