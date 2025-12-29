import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import db from '@/db/drizzle';
import { userProfiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { DashboardContent } from './dashboard-content';

export default async function DashboardPage() {
    // Get session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect('/sign-in');
    }

    // Get user profile
    const profile = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userId, session.user.id))
        .limit(1);

    const userProfile = profile[0] || null;

    // If no profile or onboarding not complete, redirect
    if (!userProfile?.completedOnboarding) {
        redirect('/onboarding');
    }

    return (
        <DashboardContent
            user={{
                id: session.user.id,
                name: session.user.name || 'Crypto Explorer',
                email: session.user.email,
                image: session.user.image || undefined,
            }}
            profile={{
                experienceLevel: userProfile.experienceLevel,
                objectives: userProfile.investmentObjectives || [],
            }}
        />
    );
}
