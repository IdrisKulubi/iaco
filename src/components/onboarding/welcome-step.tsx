'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUpIcon, 
  ShieldCheckIcon, 
  BookOpenIcon, 
  SmartphoneIcon 
} from 'lucide-react';

export interface WelcomeStepProps {
  onNext: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
}

export function WelcomeStep({ onNext, onSkip, isLoading }: WelcomeStepProps) {
  const features = [
    {
      icon: TrendingUpIcon,
      title: 'Track Your Portfolio',
      description: 'Connect your Binance account to see real-time portfolio values and performance.',
    },
    {
      icon: BookOpenIcon,
      title: 'Learn with AI Coach',
      description: 'Get personalized educational content and answers to your crypto questions.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Your API credentials are encrypted and your data is kept secure.',
    },
    {
      icon: SmartphoneIcon,
      title: 'Mobile-First Design',
      description: 'Access your portfolio and learning resources anywhere, anytime.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🚀</div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Your personal AI-powered crypto learning and portfolio tracking companion. 
          Let's get you started on your crypto journey!
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <BookOpenIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
              Educational Purpose Only
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              This app provides educational content and portfolio tracking. 
              It does not provide financial advice. Always do your own research 
              and consult with financial professionals before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={onNext}
          disabled={isLoading}
          className="flex-1 h-12 text-base font-medium"
        >
          Get Started
        </Button>
        {onSkip && (
          <Button
            variant="outline"
            onClick={onSkip}
            disabled={isLoading}
            className="flex-1 h-12 text-base"
          >
            Skip Setup
          </Button>
        )}
      </div>
    </div>
  );
}