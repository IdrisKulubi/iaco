'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUpIcon, 
  ShieldCheckIcon, 
  BookOpenIcon, 
  SmartphoneIcon,
  SparklesIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Message */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <motion.div
          className="text-6xl mb-4 inline-block"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          🚀
        </motion.div>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
          Your personal <span className="font-semibold text-blue-600 dark:text-blue-400">AI-powered</span> crypto learning and portfolio tracking companion. 
          Let's get you started on your crypto journey!
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-gray-200 dark:border-gray-700 h-full hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
              <CardContent className="p-5">
                <div className="flex items-start space-x-3">
                  <motion.div
                    className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Educational Disclaimer */}
      <motion.div
        variants={itemVariants}
        className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <BookOpenIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-1.5 flex items-center gap-2">
              Educational Purpose Only
              <SparklesIcon className="h-3.5 w-3.5" />
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              This app provides educational content and portfolio tracking. 
              It does not provide financial advice. Always do your own research 
              and consult with financial professionals before making investment decisions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-3 pt-4"
      >
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onNext}
            disabled={isLoading}
            className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </Button>
        </motion.div>
        {onSkip && (
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              onClick={onSkip}
              disabled={isLoading}
              className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Skip Setup
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}