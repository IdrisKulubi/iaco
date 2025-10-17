import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session from the request
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Define protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/portfolio', '/chat'];
  const authRoutes = ['/sign-in', '/sign-up'];
  const onboardingRoute = '/onboarding';
  
  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isOnboardingRoute = pathname.startsWith(onboardingRoute);

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If user is authenticated
  if (session) {
    // If user is on auth routes, redirect to appropriate page
    if (isAuthRoute) {
      // Check if user has completed onboarding
      try {
        const response = await fetch(new URL('/api/auth/onboarding-status', request.url), {
          headers: {
            'Cookie': request.headers.get('cookie') || '',
          },
        });
        
        if (response.ok) {
          const { completed } = await response.json();
          if (!completed) {
            return NextResponse.redirect(new URL('/onboarding', request.url));
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
      
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is trying to access onboarding but has already completed it
    if (isOnboardingRoute) {
      try {
        const response = await fetch(new URL('/api/auth/onboarding-status', request.url), {
          headers: {
            'Cookie': request.headers.get('cookie') || '',
          },
        });
        
        if (response.ok) {
          const { completed } = await response.json();
          if (completed) {
            return NextResponse.redirect(new URL('/', request.url));
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    }
  }

  // Legacy redirect for /app to /home
  if (pathname === "/app") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Fix typo redirect from old onboarding path
  if (pathname === "/oboarding") {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*', 
    '/portfolio/:path*',
    '/chat/:path*',
    '/sign-in',
    '/sign-up',
    '/onboarding',
    '/oboarding',
    '/app'
  ],
};
