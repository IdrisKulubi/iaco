'use client';

import { useTranslations } from 'next-intl';
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
    const t = useTranslations('betaModal');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md text-center">
                <DialogHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <ClockIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" weight="fill" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">
                        {t('title')}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground mt-2">
                        {t('description')}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium text-primary">
                        {t('message')}
                    </p>
                </div>
                <Button
                    onClick={() => onOpenChange(false)}
                    className="mt-4 w-full"
                    variant="outline"
                >
                    {t('button')}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
