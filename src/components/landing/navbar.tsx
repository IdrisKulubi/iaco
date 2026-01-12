'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ModeToggle } from '@/components/themes/mode-toggle';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './user-profile-dropdown';
import { LanguageSwitcher } from '@/components/language-switcher';
import { authClient } from '@/lib/auth-client';

export function LandingNavbar() {
  const { data: session, isPending } = authClient.useSession();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="IACO Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-primary">
              IACO
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              {t('howItWorks')}
            </Link>
            <Link href="#who-we-are" className="text-sm font-medium hover:text-primary transition-colors">
              {t('about')}
            </Link>
            <Link href="#refund" className="text-sm font-medium hover:text-primary transition-colors">
              {t('theChallenge')}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />

            {isPending ? (
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            ) : session?.user ? (
              <UserProfileDropdown user={session.user} />
            ) : (
              <>
                <div className="hidden md:flex gap-2">
                  <Button variant="ghost" asChild>
                    <Link href="/sign-in">{tCommon('signIn')}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/sign-up">{tCommon('getStarted')}</Link>
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
