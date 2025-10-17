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
      await authClient.signIn.social({ provider: "google", callbackURL: "/onboarding" });
      // Redirects to /oboarding after successful sign-in
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onGoogle} variant="outline" className="w-full" disabled={loading}>
            {loading ? "Redirecting…" : "Continue with Google"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account? {" "}
            <Link className="text-primary hover:underline" href="/sign-up">Sign up</Link>
          </p>

          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our Terms and acknowledge our Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
