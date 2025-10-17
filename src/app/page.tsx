'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ModeToggle } from "@/components/themes/mode-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from '@/lib/auth-client';
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data: session } = await authClient.getSession();
        
        if (session?.user) {
          setIsAuthenticated(true);
          setUser(session.user);

          // Check if user has completed onboarding
          try {
            const response = await fetch('/api/auth/onboarding-status');
            if (response.ok) {
              const { completed } = await response.json();
              if (!completed) {
                router.push('/onboarding');
                return;
              }
            }
          } catch (error) {
            console.error('Error checking onboarding status:', error);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsAuthenticated(false);
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <ModeToggle />
        </div>
        <Skeleton className="h-4 w-64" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">AI Crypto Assistant</h1>
        <ModeToggle />
      </div>

      {isAuthenticated ? (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Welcome back, {user?.name || user?.email}! 
          </p>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Your crypto learning and portfolio tracking companion is ready.
            </p>
            
            <div className="flex gap-3 flex-wrap">
              <Button asChild>
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/chat">AI Coach</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile">Profile Settings</Link>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground">
              Sign out
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Your personal AI-powered crypto learning and portfolio tracking companion.
          </p>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Educational content • Portfolio tracking • AI guidance
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
