'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ProfileForm } from './profile-form';
import { WelcomeStep } from './welcome-step';
import { CompleteStep } from './complete-step';
import { completeOnboarding, skipOnboarding } from '@/lib/actions/profile';
import { CompleteOnboardingInput } from '@/lib/validations/profile';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export interface OnboardingFlowProps {
  /**
   * Callback when onboarding is completed
   */
  onComplete?: () => void;
  /**
   * Whether to show the skip option
   */
  allowSkip?: boolean;
}

type OnboardingStep = 'welcome' | 'profile' | 'complete';

export function OnboardingFlow({ onComplete, allowSkip = true }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const steps: OnboardingStep[] = ['welcome', 'profile', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleProfileSubmit = async (data: CompleteOnboardingInput) => {
    setIsLoading(true);
    try {
      const result = await completeOnboarding(data);
      
      if (result.success) {
        setCurrentStep('complete');
        toast.success('Profile created successfully!');
      } else {
        toast.error(result.error || 'Failed to create profile');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    if (!allowSkip) return;
    
    setIsLoading(true);
    try {
      const result = await skipOnboarding();
      
      if (result.success) {
        toast.success('Onboarding skipped - you can update your preferences later');
        onComplete?.();
        router.push('/');
      } else {
        toast.error(result.error || 'Failed to skip onboarding');
      }
    } catch (error) {
      console.error('Error skipping onboarding:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    onComplete?.();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentStep === 'welcome' && 'Welcome to Crypto Assistant'}
              {currentStep === 'profile' && 'Tell us about yourself'}
              {currentStep === 'complete' && 'You\'re all set!'}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {currentStep === 'welcome' && (
              <WelcomeStep
                onNext={handleNext}
                onSkip={allowSkip ? handleSkip : undefined}
                isLoading={isLoading}
              />
            )}

            {currentStep === 'profile' && (
              <ProfileForm
                onSubmit={handleProfileSubmit}
                onBack={handleBack}
                onSkip={allowSkip ? handleSkip : undefined}
                isLoading={isLoading}
              />
            )}

            {currentStep === 'complete' && (
              <CompleteStep
                onComplete={handleComplete}
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>

        {/* Skip Option (shown on all steps except complete) */}
        {allowSkip && currentStep !== 'complete' && (
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={handleSkip}
              disabled={isLoading}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Skip for now - I'll set this up later
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}