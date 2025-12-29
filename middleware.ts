import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/db/drizzle";
import { userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and auth callbacks
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Get session from the request
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Define protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/portfolio", "/chat", "/account"];
  const authRoutes = ["/sign-in", "/sign-up"];
  const onboardingRoute = "/onboarding";

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isOnboardingRoute = pathname.startsWith(onboardingRoute);

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user is not authenticated and trying to access onboarding
  if (isOnboardingRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user is authenticated
  if (session?.user?.id) {
    // Check onboarding status directly from database
    let hasCompletedOnboarding = false;

    try {
      const profile = await db
        .select({ completedOnboarding: userProfiles.completedOnboarding })
        .from(userProfiles)
        .where(eq(userProfiles.userId, session.user.id))
        .limit(1);

      hasCompletedOnboarding =
        profile.length > 0 ? profile[0].completedOnboarding ?? false : false;

      console.log(
        `[Middleware] User ${session.user.id} - Path: ${pathname} - Onboarding: ${hasCompletedOnboarding}`
      );
    } catch (error) {
      console.error("Error checking onboarding status in middleware:", error);
      // On error, allow the request to proceed to avoid blocking users
    }

    // If user is on landing page (/), redirect to onboarding or dashboard
    if (pathname === "/") {
      const redirectUrl = !hasCompletedOnboarding ? "/onboarding" : "/dashboard";
      console.log(
        `[Middleware] Landing page detected for auth user, redirecting to: ${redirectUrl}`
      );
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // If user is on auth routes (sign-in/sign-up), redirect based on onboarding status
    if (isAuthRoute) {
      const redirectUrl = !hasCompletedOnboarding ? "/onboarding" : "/dashboard";
      console.log(
        `[Middleware] Auth route detected, redirecting to: ${redirectUrl}`
      );
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // If user is trying to access onboarding but has already completed it
    if (isOnboardingRoute && hasCompletedOnboarding) {
      console.log(
        `[Middleware] Onboarding already completed, redirecting to dashboard`
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user hasn't completed onboarding and is trying to access protected routes
    if (isProtectedRoute && !hasCompletedOnboarding) {
      console.log(
        `[Middleware] Protected route without onboarding, redirecting to onboarding`
      );
      return NextResponse.redirect(new URL("/onboarding", request.url));
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
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/portfolio/:path*",
    "/chat/:path*",
    "/sign-in",
    "/sign-up",
    "/onboarding",
    "/oboarding",
    "/account/:path*",
    "/app",
  ],
};
