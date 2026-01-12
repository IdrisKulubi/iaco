"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
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
    const t = useTranslations('auth.signUp');

    const onGoogle = async () => {
        if (!agreedToTerms) {
            return;
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
        <div className="min-h-dvh w-full grid place-items-center px-6 bg-gray-900">
            <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-2xl">
                <CardHeader className="space-y-3">
                    <div className="mx-auto h-16 w-16 relative mb-4">
                        <Image
                            src="/logo.png"
                            alt="IACO Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <CardTitle className="text-2xl text-center tracking-tight text-white">
                        {t('title')}
                    </CardTitle>
                    <CardDescription className="text-center text-gray-300">
                        {t('subtitle')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-700/50 border border-gray-600">
                        <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                            className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white"
                            >
                                I agree to IACO&apos;s Terms and Conditions
                            </Label>
                            <p className="text-xs text-gray-400">
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
                        className={`w-full h-11 rounded-xl transition ${agreedToTerms
                            ? "bg-primary text-primary-foreground shadow-[0_10px_20px_-10px_var(--color-primary)] hover:opacity-90"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            }`}
                        disabled={loading || !agreedToTerms}
                    >
                        {loading ? "Redirecting…" : t('google')}
                    </Button>

                    <div className="relative text-center">
                        <span className="px-3 text-xs text-gray-400 bg-gray-800 relative z-10">
                            or
                        </span>
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-600" />
                    </div>

                    <p className="text-sm text-gray-300 text-center">
                        {t('hasAccount')}{" "}
                        <Link className="text-primary hover:underline" href="/sign-in">
                            {t('signIn')}
                        </Link>
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                        We&apos;ll create your account using your Google profile. You can
                        remove access anytime.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
