'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClockIcon } from '@phosphor-icons/react';

interface BetaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function BetaModal({ open, onOpenChange }: BetaModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md text-center">
                <DialogHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <ClockIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" weight="fill" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">
                        Oops… not available yet
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground mt-2">
                        The waiting list is not open yet.
                        <br />
                        We are finalizing the last details before the beta launch.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium text-primary">
                        🚀 Come back very soon, the challenge is coming.
                    </p>
                </div>
                <Button
                    onClick={() => onOpenChange(false)}
                    className="mt-4 w-full"
                    variant="outline"
                >
                    Got it
                </Button>
            </DialogContent>
        </Dialog>
    );
}
