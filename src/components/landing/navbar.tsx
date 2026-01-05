'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/themes/mode-toggle';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './user-profile-dropdown';
import { authClient } from '@/lib/auth-client';

export function LandingNavbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">

            <span className="text-xl font-bold text-primary  ">
              IACO
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#who-we-are" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#refund" className="text-sm font-medium hover:text-primary transition-colors">
              Refund
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {isPending ? (
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            ) : session?.user ? (
              <UserProfileDropdown user={session.user} />
            ) : (
              <>
                <div className="hidden md:flex gap-2">
                  <Button variant="ghost" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </div>
                <Button size="sm" className="md:hidden" asChild>
                  <Link href="/sign-up">Start</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
