"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const onGoogle = async () => {
    if (!agreedToTerms) {
      return; // Don't proceed if terms not agreed
    }

    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/onboarding",
      });
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
          <CardTitle className="text-2xl text-center tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Start your crypto learning journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                I agree to IACO's Terms and Conditions
              </Label>
              <p className="text-xs text-muted-foreground">
                By creating an account, you accept our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <Button
            onClick={onGoogle}
            className={`w-full h-11 rounded-xl transition ${
              agreedToTerms
                ? "bg-primary text-primary-foreground shadow-[0_10px_20px_-10px_var(--color-primary)] hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            disabled={loading || !agreedToTerms}
          >
            {loading ? "Redirecting…" : "Sign up with Google"}
          </Button>

          <div className="relative text-center">
            <span className="px-3 text-xs text-muted-foreground bg-card relative z-10">
              or
            </span>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border" />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link className="text-primary hover:underline" href="/sign-in">
              Sign in
            </Link>
          </p>
          <p className="text-xs text-muted-foreground text-center">
            We&apos;ll create your account using your Google profile. You can
            remove access anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
