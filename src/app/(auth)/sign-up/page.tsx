"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const onGoogle = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({ provider: "google", callbackURL: "/oboarding" });
      // Redirects to /oboarding after successful sign-up
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Join and start your crypto learning journey.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onGoogle} variant="outline" className="w-full" disabled={loading}>
            {loading ? "Redirecting…" : "Sign up with Google"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account? {" "}
            <Link className="text-primary hover:underline" href="/sign-in">Sign in</Link>
          </p>

          <p className="text-xs text-muted-foreground text-center">
            We&apos;ll create your account using your Google profile. You can remove access anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
