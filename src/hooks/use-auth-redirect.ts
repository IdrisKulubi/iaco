'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface AuthRedirectOptions {
  requireAuth?: boolean;
  requireOnboarding?: boolean;
  redirectTo?: string;
}

export function useAuthRedirect(options: AuthRedirectOptions = {}) {
  const {
    requireAuth = false,
    requireOnboarding = false,
    redirectTo = '/',
  } = options;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      try {
        // Check authentication status
        const { data: session } = await authClient.getSession();
        const authenticated = !!session;
        setIsAuthenticated(authenticated);

        if (authenticated) {
          // Check onboarding status
          try {
            const response = await fetch('/api/auth/onboarding-status');
            if (response.ok) {
              const { completed } = await response.json();
              setHasCompletedOnboarding(completed);

              // Handle redirects based on requirements
              if (requireOnboarding && !completed) {
                router.push('/onboarding');
                return;
              }

              if (!requireOnboarding && !completed && window.location.pathname !== '/onboarding') {
                // User hasn't completed onboarding but is not on onboarding page
                router.push('/onboarding');
                return;
              }

              if (window.location.pathname === '/onboarding' && completed) {
                // User is on onboarding page but has already completed it
                router.push(redirectTo);
                return;
              }
            }
          } catch (error) {
            console.error('Error checking onboarding status:', error);
          }
        } else if (requireAuth) {
          // User is not authenticated but auth is required
          router.push('/sign-in');
          return;
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        if (requireAuth) {
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndOnboarding();
  }, [requireAuth, requireOnboarding, redirectTo, router]);

  return {
    isLoading,
    isAuthenticated,
    hasCompletedOnboarding,
  };
}