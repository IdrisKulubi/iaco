'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
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
  ArrowLeftIcon,
  RocketIcon,
  CoinsIcon
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

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
    color: 'blue',
  },
  {
    id: 'long-term-growth',
    label: 'Long-term investment growth',
    description: 'Building wealth over time',
    icon: TrendingUpIcon,
    color: 'green',
  },
  {
    id: 'diversification',
    label: 'Portfolio diversification',
    description: 'Adding crypto to my investment mix',
    icon: ShieldCheckIcon,
    color: 'purple',
  },
  {
    id: 'trading',
    label: 'Active trading',
    description: 'Buying and selling for short-term gains',
    icon: RocketIcon,
    color: 'orange',
  },
  {
    id: 'defi',
    label: 'DeFi and yield farming',
    description: 'Earning yield through decentralized finance',
    icon: CoinsIcon,
    color: 'pink',
  },
];

export function ProfileForm({ onSubmit, onBack, onSkip, isLoading }: ProfileFormProps) {
  const form = useForm<CompleteOnboardingInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(completeOnboardingSchema) as any,
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(handleSubmit)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Experience Level */}
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  What&apos;s your experience with cryptocurrency?
                </FormLabel>
                <FormDescription className="text-gray-600 dark:text-gray-400">
                  This helps us tailor the educational content to your level.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 gap-3 mt-4"
                  >
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${field.value === 'beginner'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}>
                        <RadioGroupItem value="beginner" id="beginner" />
                        <div className="flex-1">
                          <Label htmlFor="beginner" className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
                            🌱 Beginner
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                            New to crypto, want to learn the basics
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${field.value === 'intermediate'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}>
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <div className="flex-1">
                          <Label htmlFor="intermediate" className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
                            🚀 Intermediate
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                            Have some experience, understand basic concepts
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Investment Objectives */}
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="investmentObjectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  What are your investment objectives?
                </FormLabel>
                <FormDescription className="text-gray-600 dark:text-gray-400">
                  Select all that apply. This helps us provide relevant guidance.
                </FormDescription>
                <FormControl>
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {investmentObjectiveOptions.map((option, index) => {
                      const isSelected = field.value?.includes(option.id);
                      const colorClasses = {
                        blue: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
                        green: 'border-green-500 bg-green-50 dark:bg-green-950/30',
                        purple: 'border-purple-500 bg-purple-50 dark:bg-purple-950/30',
                        orange: 'border-orange-500 bg-orange-50 dark:bg-orange-950/30',
                        pink: 'border-pink-500 bg-pink-50 dark:bg-pink-950/30',
                      };

                      return (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div
                            className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${isSelected
                              ? `${colorClasses[option.color as keyof typeof colorClasses]} shadow-md`
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                          >
                            <Checkbox
                              id={option.id}
                              checked={isSelected}
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
                              <motion.div
                                className={`p-2 rounded-lg ${isSelected
                                  ? `bg-${option.color}-100 dark:bg-${option.color}-900/40`
                                  : 'bg-gray-100 dark:bg-gray-800'
                                  }`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <option.icon className={`h-5 w-5 ${isSelected
                                  ? `text-${option.color}-600 dark:text-${option.color}-400`
                                  : 'text-gray-600 dark:text-gray-400'
                                  }`} />
                              </motion.div>
                              <div className="flex-1">
                                <Label htmlFor={option.id} className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
                                  {option.label}
                                </Label>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Risk Tolerance */}
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="riskTolerance"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  What&apos;s your risk tolerance?
                </FormLabel>
                <FormDescription className="text-gray-600 dark:text-gray-400">
                  This affects the type of educational content and alerts we show you.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 gap-3 mt-4"
                  >
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${field.value === 'low'
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}>
                        <RadioGroupItem value="low" id="low-risk" />
                        <div className="flex-1">
                          <Label htmlFor="low-risk" className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
                            🛡️ Conservative (Low Risk)
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                            Prefer stable investments, focus on learning and small amounts
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${field.value === 'medium'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}>
                        <RadioGroupItem value="medium" id="medium-risk" />
                        <div className="flex-1">
                          <Label htmlFor="medium-risk" className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
                            ⚖️ Moderate (Medium Risk)
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                            Comfortable with some volatility for potential growth
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${field.value === 'high'
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}>
                        <RadioGroupItem value="high" id="high-risk" />
                        <div className="flex-1">
                          <Label htmlFor="high-risk" className="font-semibold cursor-pointer text-gray-900 dark:text-gray-100">
                            🔥 Aggressive (High Risk)
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                            Willing to accept high volatility for potential high returns
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 h-12 border-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? 'Creating Profile...' : 'Complete Setup'}
            </Button>
          </motion.div>
          {onSkip && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="ghost"
                onClick={onSkip}
                disabled={isLoading}
                className="h-12"
              >
                Skip
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.form>
    </Form>
  );
}