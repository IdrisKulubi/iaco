"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const onGoogle = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", // Redirect to dashboard after sign-in (middleware will handle onboarding check)
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full grid place-items-center px-6 bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-2xl">
        <CardHeader className="space-y-3">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center">
            <span className="text-xl font-bold text-primary">IACO</span>
          </div>
          <CardTitle className="text-2xl text-center tracking-tight text-white">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-300">Sign in to continue to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={onGoogle}
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground shadow-[0_10px_20px_-10px_var(--color-primary)] hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Redirecting…" : "Sign in with Google"}
          </Button>

          <div className="relative text-center">
            <span className="px-3 text-xs text-gray-400 bg-gray-800 relative z-10">or</span>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-600" />
          </div>

          <p className="text-sm text-gray-300 text-center">
            Don&apos;t have an account? {" "}
            <Link className="text-primary hover:underline" href="/sign-up">Sign up</Link>
          </p>
          <p className="text-xs text-gray-400 text-center">
            By continuing, you agree to our Terms and acknowledge our Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
