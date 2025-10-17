import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WelcomeStep } from '../src/components/onboarding/welcome-step';
import { CompleteStep } from '../src/components/onboarding/complete-step';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  TrendingUpIcon: () => <div data-testid="trending-up-icon" />,
  ShieldCheckIcon: () => <div data-testid="shield-check-icon" />,
  BookOpenIcon: () => <div data-testid="book-open-icon" />,
  SmartphoneIcon: () => <div data-testid="smartphone-icon" />,
  CheckCircleIcon: () => <div data-testid="check-circle-icon" />,
  MessageCircleIcon: () => <div data-testid="message-circle-icon" />,
  ArrowRightIcon: () => <div data-testid="arrow-right-icon" />,
  GraduationCapIcon: () => <div data-testid="graduation-cap-icon" />,
  ArrowLeftIcon: () => <div data-testid="arrow-left-icon" />,
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Onboarding Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('WelcomeStep', () => {
    const mockProps = {
      onNext: vi.fn(),
      onSkip: vi.fn(),
      isLoading: false,
    };

    it('should render welcome message and features', () => {
      render(<WelcomeStep {...mockProps} />);
      
      expect(screen.getByText(/Your personal AI-powered crypto learning/)).toBeInTheDocument();
      expect(screen.getByText('Track Your Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Learn with AI Coach')).toBeInTheDocument();
      expect(screen.getByText('Secure & Private')).toBeInTheDocument();
      expect(screen.getByText('Mobile-First Design')).toBeInTheDocument();
    });

    it('should display educational disclaimer', () => {
      render(<WelcomeStep {...mockProps} />);
      
      expect(screen.getByText('Educational Purpose Only')).toBeInTheDocument();
      expect(screen.getByText(/This app provides educational content/)).toBeInTheDocument();
    });

    it('should call onNext when Get Started button is clicked', () => {
      render(<WelcomeStep {...mockProps} />);
      
      const getStartedButton = screen.getByText('Get Started');
      fireEvent.click(getStartedButton);
      
      expect(mockProps.onNext).toHaveBeenCalledTimes(1);
    });

    it('should call onSkip when Skip Setup button is clicked', () => {
      render(<WelcomeStep {...mockProps} />);
      
      const skipButton = screen.getByText('Skip Setup');
      fireEvent.click(skipButton);
      
      expect(mockProps.onSkip).toHaveBeenCalledTimes(1);
    });

    it('should not show skip button when onSkip is not provided', () => {
      render(<WelcomeStep onNext={mockProps.onNext} isLoading={false} />);
      
      expect(screen.queryByText('Skip Setup')).not.toBeInTheDocument();
    });

    it('should disable buttons when loading', () => {
      render(<WelcomeStep {...mockProps} isLoading={true} />);
      
      const getStartedButton = screen.getByText('Get Started');
      const skipButton = screen.getByText('Skip Setup');
      
      expect(getStartedButton).toBeDisabled();
      expect(skipButton).toBeDisabled();
    });
  });

  describe('CompleteStep', () => {
    const mockProps = {
      onComplete: vi.fn(),
      isLoading: false,
    };

    it('should render success message and next steps', () => {
      render(<CompleteStep {...mockProps} />);
      
      expect(screen.getByText('Welcome to Crypto Assistant!')).toBeInTheDocument();
      expect(screen.getByText(/Your profile has been created successfully/)).toBeInTheDocument();
      expect(screen.getByText('Connect Your Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Chat with AI Coach')).toBeInTheDocument();
      expect(screen.getByText('Explore Safely')).toBeInTheDocument();
    });

    it('should display educational reminder', () => {
      render(<CompleteStep {...mockProps} />);
      
      expect(screen.getByText('Remember: Education First')).toBeInTheDocument();
      expect(screen.getByText(/This app is designed to help you learn/)).toBeInTheDocument();
    });

    it('should show quick tips', () => {
      render(<CompleteStep {...mockProps} />);
      
      expect(screen.getByText('💡 Quick Tips:')).toBeInTheDocument();
      expect(screen.getByText(/Look for the chat bubble/)).toBeInTheDocument();
      expect(screen.getByText(/You can update your preferences/)).toBeInTheDocument();
    });

    it('should call onComplete when Start Exploring button is clicked', () => {
      render(<CompleteStep {...mockProps} />);
      
      const startButton = screen.getByText('Start Exploring');
      fireEvent.click(startButton);
      
      expect(mockProps.onComplete).toHaveBeenCalledTimes(1);
    });

    it('should disable button when loading', () => {
      render(<CompleteStep {...mockProps} isLoading={true} />);
      
      const startButton = screen.getByRole('button', { name: /start exploring/i });
      expect(startButton).toBeDisabled();
    });
  });

  describe('Component Integration', () => {
    it('should render all required icons', () => {
      render(<WelcomeStep onNext={vi.fn()} isLoading={false} />);
      
      expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();
      expect(screen.getByTestId('shield-check-icon')).toBeInTheDocument();
      expect(screen.getAllByTestId('book-open-icon')).toHaveLength(2); // Appears in features and disclaimer
      expect(screen.getByTestId('smartphone-icon')).toBeInTheDocument();
    });

    it('should handle missing optional props gracefully', () => {
      expect(() => {
        render(<WelcomeStep onNext={vi.fn()} isLoading={false} />);
      }).not.toThrow();
      
      expect(() => {
        render(<CompleteStep onComplete={vi.fn()} />);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles and labels', () => {
      render(<WelcomeStep onNext={vi.fn()} onSkip={vi.fn()} isLoading={false} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Get Started');
      expect(buttons[1]).toHaveTextContent('Skip Setup');
    });

    it('should have proper heading structure', () => {
      render(<CompleteStep onComplete={vi.fn()} isLoading={false} />);
      
      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('Welcome to Crypto Assistant!');
    });
  });
});