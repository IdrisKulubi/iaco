'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  UserIcon,
  GearIcon,
  CreditCardIcon,
  SignOutIcon,
  ShieldIcon,
  WalletIcon,
  TrendUpIcon
} from '@phosphor-icons/react';

interface UserProfileDropdownProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// Generate cool gradient avatars based on user name/email
const generateAvatarBg = (name: string) => {
  const colors = [
    'from-primary to-blue-400',
    'from-teal-400 to-cyan-400',
    'from-purple-400 to-pink-400',
    'from-blue-400 to-primary',
    'from-green-400 to-teal-500',
    'from-yellow-400 to-orange-500',
    'from-pink-400 to-rose-400',
    'from-indigo-400 to-primary',
    'from-primary to-green-400',
    'from-orange-400 to-red-400',
  ];

  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const displayName = user.name || user.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const gradientClass = generateAvatarBg(displayName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ''} alt={displayName} />
            <AvatarFallback className={`bg-gradient-to-br ${gradientClass} text-white font-semibold`}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" forceMount>
        {/* User Info Header */}
        <div className="flex items-center space-x-3 p-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image || ''} alt={displayName} />
            <AvatarFallback className={`bg-gradient-to-br ${gradientClass} text-white font-semibold text-lg`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            {user.email && (
              <p className="text-xs text-muted-foreground">{user.email}</p>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center space-x-2 w-full">
              <TrendUpIcon className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/portfolio" className="flex items-center space-x-2 w-full">
              <WalletIcon className="h-4 w-4" />
              <span>Portfolio</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/account" className="flex items-center space-x-2 w-full">
              <UserIcon className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center space-x-2 w-full">
              <GearIcon className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/billing" className="flex items-center space-x-2 w-full">
              <CreditCardIcon className="h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/security" className="flex items-center space-x-2 w-full">
              <ShieldIcon className="h-4 w-4" />
              <span>Security</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <div className="py-2">
          <DropdownMenuItem
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
          >
            <SignOutIcon className="h-4 w-4 mr-2" />
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}