import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserProfile } from '@/lib/actions/profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { User2Icon, ShieldCheckIcon, KeyRoundIcon, Settings2Icon } from 'lucide-react';
import UserDetailsForm from '@/components/account/user-details-form';
import ProfileSettingsForm from '@/components/account/profile-settings-form';
import BinanceKeysForm from '@/components/account/binance-keys-form';

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const profileRes = await getUserProfile();
  const profile = (profileRes.success ? (profileRes.data as unknown) : null) as { experienceLevel?: 'beginner' | 'intermediate'; investmentObjectives?: string[]; riskTolerance?: 'low' | 'medium' | 'high' } | null;

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-950">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <User2Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">Account Settings</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Settings</SidebarGroupLabel>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-3 px-3 py-2">
                    <a href="#profile" className="flex items-center gap-3"><User2Icon className="h-4 w-4" /> <span>Profile</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-3 px-3 py-2">
                    <a href="#preferences" className="flex items-center gap-3"><Settings2Icon className="h-4 w-4" /> <span>Preferences</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-3 px-3 py-2">
                    <a href="#binance" className="flex items-center gap-3"><KeyRoundIcon className="h-4 w-4" /> <span>Binance</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-3 px-3 py-2">
                    <a href="#security" className="flex items-center gap-3"><ShieldCheckIcon className="h-4 w-4" /> <span>Security</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-900 px-6">
            <SidebarTrigger className="-ml-2" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Manage your account settings</h1>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 lg:p-10">
            <div className="mx-auto max-w-4xl space-y-8">
              <section id="profile" className="scroll-mt-20">
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">Profile</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Update your personal information</p>
                  </CardHeader>
                  <CardContent>
                    <UserDetailsForm defaultName={session?.user?.name || ''} defaultEmail={session?.user?.email || ''} defaultPhone={(session?.user as { phone?: string })?.phone || ''} />
                  </CardContent>
                </Card>
              </section>

              <section id="preferences" className="scroll-mt-20">
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">Preferences</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Customize your experience and learning path</p>
                  </CardHeader>
                  <CardContent>
                    <ProfileSettingsForm
                      defaultValues={{
                        experienceLevel: profile?.experienceLevel || 'beginner',
                        investmentObjectives: profile?.investmentObjectives || ['learning'],
                        riskTolerance: profile?.riskTolerance || 'low',
                      }}
                    />
                  </CardContent>
                </Card>
              </section>

              <section id="binance" className="scroll-mt-20">
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">Binance Connection</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Connect your Binance account to track portfolio</p>
                  </CardHeader>
                  <CardContent>
                    <BinanceKeysForm />
                  </CardContent>
                </Card>
              </section>

              <section id="security" className="scroll-mt-20">
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">Security</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Manage your authentication and sessions</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheckIcon className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Google Authentication</p>
                          <p className="text-sm text-muted-foreground mt-1">You signed in with Google. To manage sessions, sign out and sign back in if needed.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href="/api/auth/signout">Sign out</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}