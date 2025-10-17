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
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full grid place-items-center px-6 bg-gradient-to-b from-background to-secondary/40">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="space-y-3">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center">
            <span className="text-xl font-bold text-primary">IACO</span>
          </div>
          <CardTitle className="text-2xl text-center tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-center">Sign in to continue to your account.</CardDescription>
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
            <span className="px-3 text-xs text-muted-foreground bg-card relative z-10">or</span>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border" />
          </div>

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
