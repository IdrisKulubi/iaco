'use client';

import { useEffect, useState } from 'react';
import { ProgressiveOnboarding } from '@/components/onboarding/progressive-onboarding';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: session } = await authClient.getSession();

        if (!session?.user) {
          router.push('/sign-in');
          return;
        }

        setIsLoading(false);
      } catch {
        router.push('/sign-in');
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return <ProgressiveOnboarding />;
}