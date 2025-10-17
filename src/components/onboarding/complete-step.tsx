'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircleIcon, 
  TrendingUpIcon, 
  MessageCircleIcon, 
  ShieldCheckIcon,
  ArrowRightIcon 
} from 'lucide-react';

export interface CompleteStepProps {
  onComplete: () => void;
  isLoading?: boolean;
}

export function CompleteStep({ onComplete, isLoading }: CompleteStepProps) {
  const nextSteps = [
    {
      icon: TrendingUpIcon,
      title: 'Connect Your Portfolio',
      description: 'Link your Binance account to start tracking your investments.',
      action: 'Optional - you can do this later',
    },
    {
      icon: MessageCircleIcon,
      title: 'Chat with AI Coach',
      description: 'Ask questions and get personalized crypto education.',
      action: 'Available on every page',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Explore Safely',
      description: 'All content is educational - we never provide financial advice.',
      action: 'Always do your own research',
    },
  ];

  return (
    <div className="space-y-8 text-center">
      {/* Success Icon and Message */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to Crypto Assistant!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your profile has been created successfully. You're ready to start your crypto learning journey.
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-left">
          What you can do next:
        </h3>
        <div className="space-y-3">
          {nextSteps.map((step, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-700 text-left">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {step.description}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {step.action}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational Reminder */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <MessageCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-left">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
              Remember: Education First
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This app is designed to help you learn about cryptocurrency. 
              All content is for educational purposes only and should not be considered financial advice.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <Button
          onClick={onComplete}
          disabled={isLoading}
          className="w-full h-12 text-base font-medium"
        >
          <span>Start Exploring</span>
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Quick Tips */}
      <div className="text-left space-y-2">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">
          💡 Quick Tips:
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Look for the chat bubble to ask the AI coach questions anytime</li>
          <li>• You can update your preferences in Settings later</li>
          <li>• Portfolio connection is optional and can be done when you're ready</li>
          <li>• All your data is encrypted and secure</li>
        </ul>
      </div>
    </div>
  );
}