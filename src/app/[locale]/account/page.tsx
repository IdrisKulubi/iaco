import { getUserProfile } from '@/lib/actions/profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccountContent } from '@/components/account/account-content';
import { setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function AccountPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
        redirect(`/${locale}/sign-in`);
    }

    const profileRes = await getUserProfile();
    const profile = profileRes.success && profileRes.data
        ? {
            experienceLevel: (profileRes.data as { experienceLevel?: 'beginner' | 'intermediate' }).experienceLevel || 'beginner',
            investmentObjectives: (profileRes.data as { investmentObjectives?: string[] }).investmentObjectives || ['learning'],
            riskTolerance: (profileRes.data as { riskTolerance?: 'low' | 'medium' | 'high' }).riskTolerance || 'low',
        }
        : null;

    const user = {
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || undefined,
        phone: (session.user as { phone?: string })?.phone || '',
    };

    return <AccountContent user={user} profile={profile} />;
}
