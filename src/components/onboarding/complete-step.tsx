'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircleIcon, 
  TrendingUpIcon, 
  MessageCircleIcon, 
  ShieldCheckIcon,
  ArrowRightIcon,
  SparklesIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export interface CompleteStepProps {
  onComplete: () => void;
  isLoading?: boolean;
}

export function CompleteStep({ onComplete, isLoading }: CompleteStepProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti on mount
    const timer = setTimeout(() => {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    {
      icon: TrendingUpIcon,
      title: 'Connect Your Portfolio',
      description: 'Link your Binance account to start tracking your investments.',
      action: 'Optional - you can do this later',
      color: 'blue',
    },
    {
      icon: MessageCircleIcon,
      title: 'Chat with AI Coach',
      description: 'Ask questions and get personalized crypto education.',
      action: 'Available on every page',
      color: 'purple',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Explore Safely',
      description: 'All content is educational - we never provide financial advice.',
      action: 'Always do your own research',
      color: 'green',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      className="space-y-8 text-center"
    >
      {/* Success Icon and Message */}
      <motion.div variants={itemVariants} className="space-y-4">
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
          >
            <CheckCircleIcon className="h-20 w-20 text-green-600 dark:text-green-400 drop-shadow-lg" />
          </motion.div>
        </motion.div>
        <div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3"
          >
            Welcome to Crypto Assistant!
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto"
          >
            Your profile has been created successfully. You're ready to start your crypto learning journey.
          </motion.p>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-left flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-yellow-500" />
          What you can do next:
        </h3>
        <div className="space-y-3">
          {nextSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-2 border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
                <CardContent className="p-5">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className={`flex-shrink-0 mt-1 p-3 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/30`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className={`h-6 w-6 text-${step.color}-600 dark:text-${step.color}-400`} />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 text-base">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                        {step.description}
                      </p>
                      <p className={`text-xs text-${step.color}-600 dark:text-${step.color}-400 font-semibold`}>
                        {step.action}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Educational Reminder */}
      <motion.div
        variants={itemVariants}
        className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-5 shadow-sm"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <MessageCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1.5">
              Remember: Education First
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              This app is designed to help you learn about cryptocurrency. 
              All content is for educational purposes only and should not be considered financial advice.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onComplete}
            disabled={isLoading}
            className="w-full h-14 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            <span>Start Exploring</span>
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div variants={itemVariants} className="text-left space-y-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          💡 Quick Tips
        </h4>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            • Look for the chat bubble to ask the AI coach questions anytime
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            • You can update your preferences in Settings later
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            • Portfolio connection is optional and can be done when you're ready
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            • All your data is encrypted and secure
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
}