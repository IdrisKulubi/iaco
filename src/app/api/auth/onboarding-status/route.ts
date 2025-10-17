import { NextRequest, NextResponse } from 'next/server';
import { hasCompletedOnboarding } from '@/lib/actions/profile';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get session from the request
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has completed onboarding
    const result = await hasCompletedOnboarding(session.user.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to check onboarding status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      completed: result.data || false,
      userId: session.user.id,
    });
  } catch (error) {
    console.error('Error in onboarding status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}