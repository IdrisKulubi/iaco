'use client';

import { useEffect, useState } from 'react';
import { OnboardingFlow } from '@/components/onboarding';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Skeleton } from '@/components/ui/skeleton';

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: session } = await authClient.getSession();
        
        if (!session?.user) {
          // User is not authenticated, redirect to sign in
          router.push('/sign-in');
          return;
        }

        setIsAuthenticated(true);

        // Check if user has already completed onboarding
        try {
          const response = await fetch('/api/auth/onboarding-status');
          if (response.ok) {
            const { completed } = await response.json();
            if (completed) {
              // User has already completed onboarding, redirect to home
              router.push('/');
              return;
            }
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleOnboardingComplete = () => {
    // Redirect to home page after onboarding completion
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-4">
              <Skeleton className="h-8 w-64 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to sign-in
  }

  return (
    <OnboardingFlow 
      onComplete={handleOnboardingComplete}
      allowSkip={true}
    />
  );
}