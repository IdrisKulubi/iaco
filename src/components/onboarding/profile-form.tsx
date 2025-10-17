'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  completeOnboardingSchema,
  CompleteOnboardingInput,
} from '@/lib/validations/profile';
import { 
  GraduationCapIcon, 
  TrendingUpIcon, 
  ShieldCheckIcon,
  ArrowLeftIcon 
} from 'lucide-react';

export interface ProfileFormProps {
  onSubmit: (data: CompleteOnboardingInput) => Promise<void>;
  onBack: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
}

const investmentObjectiveOptions = [
  {
    id: 'learning',
    label: 'Learning about cryptocurrency',
    description: 'I want to understand how crypto works',
    icon: GraduationCapIcon,
  },
  {
    id: 'long-term-growth',
    label: 'Long-term investment growth',
    description: 'Building wealth over time',
    icon: TrendingUpIcon,
  },
  {
    id: 'diversification',
    label: 'Portfolio diversification',
    description: 'Adding crypto to my investment mix',
    icon: ShieldCheckIcon,
  },
  {
    id: 'trading',
    label: 'Active trading',
    description: 'Buying and selling for short-term gains',
    icon: TrendingUpIcon,
  },
  {
    id: 'defi',
    label: 'DeFi and yield farming',
    description: 'Earning yield through decentralized finance',
    icon: TrendingUpIcon,
  },
];

export function ProfileForm({ onSubmit, onBack, onSkip, isLoading }: ProfileFormProps) {
  const form = useForm<CompleteOnboardingInput>({
    resolver: zodResolver(completeOnboardingSchema),
    defaultValues: {
      experienceLevel: 'beginner',
      investmentObjectives: ['learning'],
      riskTolerance: 'low',
      skipOnboarding: false,
    },
  });

  const handleSubmit = async (data: CompleteOnboardingInput) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Experience Level */}
        <FormField
          control={form.control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                What's your experience with cryptocurrency?
              </FormLabel>
              <FormDescription>
                This helps us tailor the educational content to your level.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <div className="flex-1">
                      <Label htmlFor="beginner" className="font-medium cursor-pointer">
                        Beginner
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        New to crypto, want to learn the basics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <div className="flex-1">
                      <Label htmlFor="intermediate" className="font-medium cursor-pointer">
                        Intermediate
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Have some experience, understand basic concepts
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Investment Objectives */}
        <FormField
          control={form.control}
          name="investmentObjectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                What are your investment objectives?
              </FormLabel>
              <FormDescription>
                Select all that apply. This helps us provide relevant guidance.
              </FormDescription>
              <FormControl>
                <div className="grid grid-cols-1 gap-3">
                  {investmentObjectiveOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Checkbox
                        id={option.id}
                        checked={field.value?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, option.id]);
                          } else {
                            field.onChange(currentValues.filter((value) => value !== option.id));
                          }
                        }}
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        <option.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <div>
                          <Label htmlFor={option.id} className="font-medium cursor-pointer">
                            {option.label}
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Risk Tolerance */}
        <FormField
          control={form.control}
          name="riskTolerance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                What's your risk tolerance?
              </FormLabel>
              <FormDescription>
                This affects the type of educational content and alerts we show you.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="low" id="low-risk" />
                    <div className="flex-1">
                      <Label htmlFor="low-risk" className="font-medium cursor-pointer">
                        Conservative (Low Risk)
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Prefer stable investments, focus on learning and small amounts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="medium" id="medium-risk" />
                    <div className="flex-1">
                      <Label htmlFor="medium-risk" className="font-medium cursor-pointer">
                        Moderate (Medium Risk)
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Comfortable with some volatility for potential growth
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="high" id="high-risk" />
                    <div className="flex-1">
                      <Label htmlFor="high-risk" className="font-medium cursor-pointer">
                        Aggressive (High Risk)
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Willing to accept high volatility for potential high returns
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 h-12"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 h-12 text-base font-medium"
          >
            {isLoading ? 'Creating Profile...' : 'Complete Setup'}
          </Button>
          {onSkip && (
            <Button
              type="button"
              variant="ghost"
              onClick={onSkip}
              disabled={isLoading}
              className="h-12"
            >
              Skip
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}