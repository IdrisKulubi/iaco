'use client';

/**
 * Onboarding Preview Component
 * 
 * A visual preview/demo of the onboarding flow for testing and showcasing.
 * This component can be used in development to quickly test the onboarding experience.
 */

import React from 'react';
import { OnboardingFlow } from './onboarding-flow';
import { motion } from 'framer-motion';

export function OnboardingPreview() {
  const handleComplete = () => {
    console.log('Onboarding completed!');
    alert('Onboarding completed! In production, this would redirect to the dashboard.');
  };

  return (
    <div className="min-h-screen">
      <OnboardingFlow 
        onComplete={handleComplete}
        allowSkip={true}
      />
      
      {/* Developer Info Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-xs font-mono backdrop-blur-sm"
      >
        🎨 Onboarding Preview Mode
      </motion.div>
    </div>
  );
}
