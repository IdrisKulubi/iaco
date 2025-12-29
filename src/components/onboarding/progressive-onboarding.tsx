'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import gsap from 'gsap';
import { completeOnboarding } from '@/lib/actions/profile';
import {
  GraduationCap,
  Rocket,
  BookOpen,
  TrendingUp,
  PieChart,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

interface OnboardingAnswer {
  experienceLevel: 'beginner' | 'intermediate' | null;
  objective: 'learn' | 'invest' | 'diversify' | null;
}

interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
}

const levelOptions: QuestionOption[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: "I'm new to crypto and want to learn the basics",
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-500/20',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'I have some experience and understand the fundamentals',
    icon: Rocket,
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-500/20',
  },
];

const objectiveOptions: QuestionOption[] = [
  {
    id: 'learn',
    label: 'Learn',
    description: 'Understand crypto concepts and technology',
    icon: BookOpen,
    gradient: 'from-blue-500 to-cyan-600',
    iconBg: 'bg-blue-500/20',
  },
  {
    id: 'invest',
    label: 'Invest',
    description: 'Build a portfolio for long-term growth',
    icon: TrendingUp,
    gradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500/20',
  },
  {
    id: 'diversify',
    label: 'Diversify',
    description: 'Add crypto to my existing investments',
    icon: PieChart,
    gradient: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-500/20',
  },
];

export function ProgressiveOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswer>({
    experienceLevel: null,
    objective: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  const totalSteps = 2;

  // Initial animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );

      // Animate progress bar
      gsap.fromTo(
        progressRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'power2.out' }
      );

      // Animate question
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      );

      // Stagger animate options
      gsap.fromTo(
        '.option-card',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: 'back.out(1.2)',
        }
      );

      // Floating sparkles animation
      gsap.to(sparklesRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate step transition
  const animateStepTransition = useCallback((direction: 'next' | 'back') => {
    const tl = gsap.timeline();

    // Exit animation
    tl.to(questionRef.current, {
      opacity: 0,
      x: direction === 'next' ? -50 : 50,
      duration: 0.3,
      ease: 'power2.in',
    });

    tl.to(
      '.option-card',
      {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.in',
      },
      '-=0.2'
    );

    // Enter animation (after state update)
    tl.call(() => {
      // This will be called after exit animations complete
    });

    tl.fromTo(
      questionRef.current,
      { opacity: 0, x: direction === 'next' ? 50 : -50 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );

    tl.fromTo(
      '.option-card',
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.2)',
      },
      '-=0.2'
    );

    return tl;
  }, []);

  // Handle option selection
  const handleOptionSelect = async (optionId: string) => {
    if (isSubmitting) return;

    setSelectedOption(optionId);

    // Animate selection
    gsap.to(`[data-option="${optionId}"]`, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out',
    });

    // Small delay for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (currentStep === 0) {
      // Save level and move to next step
      setAnswers((prev) => ({
        ...prev,
        experienceLevel: optionId as 'beginner' | 'intermediate',
      }));

      // Animate transition
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentStep(1);
          setSelectedOption(null);
        },
      });

      tl.to('.option-card', {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      });

      tl.to(
        questionRef.current,
        {
          opacity: 0,
          x: -50,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      );

      // Progress bar animation
      tl.to(
        '.progress-fill',
        {
          width: '100%',
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '-=0.3'
      );

      tl.fromTo(
        questionRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );

      tl.fromTo(
        '.option-card',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.2)',
        },
        '-=0.2'
      );
    } else {
      // Final step - save and complete
      setIsSubmitting(true);

      const finalAnswers = {
        experienceLevel: answers.experienceLevel!,
        objective: optionId as 'learn' | 'invest' | 'diversify',
      };

      try {
        // Success animation before submitting
        const tl = gsap.timeline();

        tl.to('.option-card', {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.05,
        });

        tl.to(questionRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
        });

        // Show success state
        tl.to(containerRef.current, {
          scale: 1.02,
          duration: 0.2,
        });

        // Map objective to investment objectives array
        const objectiveMapping: Record<string, string[]> = {
          learn: ['learning'],
          invest: ['long-term-growth'],
          diversify: ['diversification'],
        };

        const result = await completeOnboarding({
          experienceLevel: finalAnswers.experienceLevel,
          investmentObjectives: objectiveMapping[finalAnswers.objective],
          riskTolerance: 'low',
          skipOnboarding: false,
        });

        if (result.success) {
          toast.success("You're all set! Let's start your crypto journey 🚀");

          // Final celebration animation
          gsap.to(containerRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              router.push('/');
            },
          });
        } else {
          toast.error(result.error || 'Something went wrong. Please try again.');
          setIsSubmitting(false);
          setSelectedOption(null);

          // Reset animation
          gsap.to([questionRef.current, '.option-card'], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
          });
        }
      } catch {
        toast.error('Something went wrong. Please try again.');
        setIsSubmitting(false);
        setSelectedOption(null);
      }
    }
  };

  const currentOptions = currentStep === 0 ? levelOptions : objectiveOptions;
  const currentQuestion = currentStep === 0
    ? "What's your experience level?"
    : "What's your main goal?";
  const currentSubtext = currentStep === 0
    ? "This helps us personalize your learning journey"
    : "We'll tailor recommendations just for you";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="w-full max-w-lg relative z-10">
        {/* Progress indicator */}
        <div ref={progressRef} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-400">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <div ref={sparklesRef} className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Almost there!</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="progress-fill h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-3 mt-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index <= currentStep
                  ? 'bg-white scale-110'
                  : 'bg-slate-700'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Main card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/50 shadow-2xl shadow-black/20 p-8 md:p-10">
          {/* Question */}
          <div ref={questionRef} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              {currentQuestion}
            </h1>
            <p className="text-slate-400 text-lg">{currentSubtext}</p>
          </div>

          {/* Options */}
          <div ref={optionsRef} className="space-y-4">
            {currentOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedOption === option.id;

              return (
                <button
                  key={option.id}
                  data-option={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isSubmitting}
                  className={`option-card w-full group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${isSelected
                    ? 'border-white/30 bg-gradient-to-r ' + option.gradient
                    : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="relative z-10 flex items-center gap-5 p-5 md:p-6">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected
                        ? 'bg-white/20'
                        : option.iconBg
                        }`}
                    >
                      <Icon
                        className={`w-7 h-7 transition-all duration-300 ${isSelected ? 'text-white' : 'text-slate-300'
                          }`}
                      />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 text-left">
                      <h3
                        className={`text-xl font-semibold mb-1 transition-colors duration-300 ${isSelected ? 'text-white' : 'text-slate-200'
                          }`}
                      >
                        {option.label}
                      </h3>
                      <p
                        className={`text-sm transition-colors duration-300 ${isSelected ? 'text-white/80' : 'text-slate-400'
                          }`}
                      >
                        {option.description}
                      </p>
                    </div>

                    {/* Arrow / Check indicator */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected
                        ? 'bg-white/20'
                        : 'bg-slate-700/50 group-hover:bg-slate-700'
                        }`}
                    >
                      {isSelected ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <ArrowRight
                          className={`w-5 h-5 transition-all duration-300 ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5'
                            }`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  {!isSelected && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Educational disclaimer */}
          <div className="mt-8 pt-6 border-t border-slate-800/50">
            <p className="text-center text-xs text-slate-500 leading-relaxed">
              🎓 Educational purposes only. Not financial advice.
              <br />
              Always do your own research before investing.
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-slate-600 text-sm mt-6">
          You can update these preferences anytime in Settings
        </p>
      </div>
    </div>
  );
}
