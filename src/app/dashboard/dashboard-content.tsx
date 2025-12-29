'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import {
    ChatCircleIcon,
    BookOpenIcon,
    WalletIcon,
    TrendUpIcon,
    SparkleIcon,
    GraduationCapIcon,
    ShieldIcon,
    LightningIcon,
    ChartLineIcon,
    TargetIcon,
    ChartBarIcon,
    GearIcon,
    SignOutIcon,
    CaretRightIcon,
    PlayIcon
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { ChatBubbleWrapper } from '@/components/chat/chat-bubble-wrapper';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

interface DashboardContentProps {
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
    profile: {
        experienceLevel: string;
        objectives: string[];
    };
}

const quickActions = [
    {
        id: 'chat',
        title: 'Ask AI Coach',
        description: 'Get instant answers to your crypto questions',
        icon: ChatCircleIcon,
        gradient: 'from-blue-500 to-cyan-500',
        href: '#chat',
    },
    {
        id: 'learn',
        title: 'Start Learning',
        description: 'Watch beginner-friendly tutorials',
        icon: BookOpenIcon,
        gradient: 'from-purple-500 to-pink-500',
        href: '/learn',
    },
    {
        id: 'connect',
        title: 'Connect Binance',
        description: 'Track your portfolio in real-time',
        icon: WalletIcon,
        gradient: 'from-amber-500 to-orange-500',
        href: '/account',
    },
];

const learningModules = [
    {
        id: 'basics',
        title: 'Crypto Basics',
        lessons: 5,
        duration: '15 min',
        progress: 0,
        icon: GraduationCapIcon,
    },
    {
        id: 'wallets',
        title: 'Understanding Wallets',
        lessons: 4,
        duration: '12 min',
        progress: 0,
        icon: WalletIcon,
    },
    {
        id: 'security',
        title: 'Staying Safe',
        lessons: 6,
        duration: '20 min',
        progress: 0,
        icon: ShieldIcon,
    },
];

export function DashboardContent({ user, profile }: DashboardContentProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const learningRef = useRef<HTMLDivElement>(null);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push('/');
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );

            gsap.fromTo(
                statsRef.current?.children || [],
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.2,
                    ease: 'back.out(1.2)'
                }
            );

            gsap.fromTo(
                '.action-card',
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: 'power2.out'
                }
            );

            gsap.fromTo(
                '.learning-card',
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.6,
                    ease: 'power2.out'
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        >
            {/* Animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header ref={headerRef} className="relative z-10 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <LightningIcon className="w-5 h-5 text-white" weight="fill" />
                            </div>
                            <span className="text-xl font-bold text-white">IACO</span>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <Link href="/account">
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                    <GearIcon className="w-5 h-5" />
                                </Button>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <SignOutIcon className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full ring-2 ring-slate-700"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-medium">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <SparkleIcon className="w-5 h-5 text-amber-400" weight="fill" />
                        <span className="text-amber-400 text-sm font-medium">
                            {profile.experienceLevel === 'beginner' ? 'Beginner' : 'Intermediate'} Explorer
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {getGreeting()}, {user.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Ready to continue your crypto learning journey?
                    </p>
                </div>

                {/* Stats Overview */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Portfolio Card */}
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-emerald-500/20">
                                <TrendUpIcon className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="text-xs text-slate-500">Portfolio</span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">Not Connected</p>
                        <p className="text-sm text-slate-400">Connect Binance to track</p>
                    </div>

                    {/* Learning Progress */}
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-purple-500/20">
                                <ChartBarIcon className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs text-slate-500">Progress</span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">0%</p>
                        <p className="text-sm text-slate-400">Start learning below</p>
                    </div>

                    {/* Goals */}
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-amber-500/20">
                                <TargetIcon className="w-5 h-5 text-amber-400" />
                            </div>
                            <span className="text-xs text-slate-500">Your Goal</span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1 capitalize">
                            {profile.objectives[0]?.replace('-', ' ') || 'Learning'}
                        </p>
                        <p className="text-sm text-slate-400">Focus area</p>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Actions */}
                    <div ref={actionsRef}>
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <LightningIcon className="w-5 h-5 text-amber-400" weight="fill" />
                            Quick Actions
                        </h2>
                        <div className="space-y-4">
                            {quickActions.map((action) => {
                                const Icon = action.icon;
                                return (
                                    <Link
                                        key={action.id}
                                        href={action.href}
                                        className="action-card block group"
                                    >
                                        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-5 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02]">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient}`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                        {action.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-400">{action.description}</p>
                                                </div>
                                                <CaretRightIcon className="w-5 h-5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Learning Modules */}
                    <div ref={learningRef}>
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <BookOpenIcon className="w-5 h-5 text-purple-400" />
                            Start Learning
                        </h2>
                        <div className="space-y-4">
                            {learningModules.map((module) => {
                                const Icon = module.icon;
                                return (
                                    <div
                                        key={module.id}
                                        className="learning-card bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-5 hover:border-slate-700 transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-slate-800">
                                                <Icon className="w-6 h-6 text-slate-300" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                                                    {module.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <span>{module.lessons} lessons</span>
                                                    <span>•</span>
                                                    <span>{module.duration}</span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="bg-slate-800 hover:bg-slate-700 text-white"
                                            >
                                                <PlayIcon className="w-4 h-4" weight="fill" />
                                            </Button>
                                        </div>
                                        {/* Progress bar */}
                                        <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                                                style={{ width: `${module.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Educational Banner */}
                <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/20 p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/20">
                            <ChartLineIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-1">
                                📚 Remember: Education First
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                This app is designed to help you learn about cryptocurrency. All content is for
                                educational purposes only and should not be considered financial advice. Always
                                do your own research before making any investment decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Chat Bubble */}
            <ChatBubbleWrapper />
        </div>
    );
}
