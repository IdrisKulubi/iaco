"use client";

import { AlertCircleIcon } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-900 px-4 py-3">
      <div className="flex items-start gap-2">
        <AlertCircleIcon className="size-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-800 dark:text-amber-200">
          <strong>Educational purposes only.</strong> This assistant provides
          educational information about cryptocurrency and blockchain technology.
          It does not provide financial advice or investment recommendations.
          Always do your own research (DYOR) before making any investment decisions.
        </p>
      </div>
    </div>
  );
}
