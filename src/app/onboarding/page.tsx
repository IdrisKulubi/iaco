'use client';

import { useEffect, useState } from 'react';
import { OnboardingFlow } from '@/components/onboarding';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Skeleton } from '@/components/ui/skeleton';

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Simple session check - middleware handles redirects
        const { data: session } = await authClient.getSession();
        
        if (!session?.user) {
          console.log('[Onboarding] No session found, redirecting to sign-in');
          router.push('/sign-in');
          return;
        }

        console.log('[Onboarding] Session found, showing onboarding flow');
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/sign-in');
      }
    };

    checkSession();
  }, [router]);

  const handleOnboardingComplete = () => {
    console.log('[Onboarding] Onboarding completed, redirecting to home');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-2 w-full bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 space-y-6 border">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-64 mx-auto bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-4 w-48 mx-auto bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <Skeleton className="h-32 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <Skeleton className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <OnboardingFlow 
      onComplete={handleOnboardingComplete}
      allowSkip={true}
    />
  );
}