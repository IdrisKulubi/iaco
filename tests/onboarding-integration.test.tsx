import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OnboardingFlow } from '../src/components/onboarding/onboarding-flow';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock server actions
vi.mock('../src/lib/actions/profile', () => ({
  completeOnboarding: vi.fn(),
  skipOnboarding: vi.fn(),
}));

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
  CircleIcon: () => <div data-testid="circle-icon" />,
  CheckIcon: () => <div data-testid="check-icon" />,
}));

describe('Onboarding Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should complete the full onboarding flow', async () => {
    const mockOnComplete = vi.fn();
    const { completeOnboarding } = await import('../src/lib/actions/profile');
    
    // Mock successful onboarding completion
    vi.mocked(completeOnboarding).mockResolvedValue({
      success: true,
      data: {
        userId: 'test-user',
        experienceLevel: 'beginner',
        investmentObjectives: ['learning'],
        riskTolerance: 'low',
        completedOnboarding: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    render(
      <OnboardingFlow 
        onComplete={mockOnComplete}
        allowSkip={true}
      />
    );

    // Step 1: Welcome screen
    expect(screen.getByText('Welcome to Crypto Assistant')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();

    // Click Get Started to proceed to profile form
    fireEvent.click(screen.getByText('Get Started'));

    // Step 2: Profile form should be visible
    await waitFor(() => {
      expect(screen.getByText('Tell us about yourself')).toBeInTheDocument();
    });

    // Fill out the form
    const beginnerRadio = screen.getByLabelText('Beginner');
    fireEvent.click(beginnerRadio);

    const learningCheckbox = screen.getByLabelText('Learning about cryptocurrency');
    fireEvent.click(learningCheckbox);

    const lowRiskRadio = screen.getByLabelText('Conservative (Low Risk)');
    fireEvent.click(lowRiskRadio);

    // Submit the form
    const completeButton = screen.getByText('Complete Setup');
    fireEvent.click(completeButton);

    // Wait for the completion step
    await waitFor(() => {
      expect(screen.getByText('You\'re all set!')).toBeInTheDocument();
    });

    // Verify the server action was called
    expect(completeOnboarding).toHaveBeenCalledWith({
      experienceLevel: 'beginner',
      investmentObjectives: ['learning'],
      riskTolerance: 'low',
      skipOnboarding: false,
    });

    // Complete the onboarding
    const startExploringButton = screen.getByText('Start Exploring');
    fireEvent.click(startExploringButton);

    // Verify onComplete callback was called
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('should handle skip onboarding flow', async () => {
    const mockOnComplete = vi.fn();
    const { skipOnboarding } = await import('../src/lib/actions/profile');
    
    // Mock successful skip
    vi.mocked(skipOnboarding).mockResolvedValue({
      success: true,
      data: {
        userId: 'test-user',
        experienceLevel: 'beginner',
        investmentObjectives: ['learning'],
        riskTolerance: 'low',
        completedOnboarding: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    render(
      <OnboardingFlow 
        onComplete={mockOnComplete}
        allowSkip={true}
      />
    );

    // Find and click the skip button
    const skipButton = screen.getByText('Skip for now - I\'ll set this up later');
    fireEvent.click(skipButton);

    // Wait for the skip action to complete
    await waitFor(() => {
      expect(skipOnboarding).toHaveBeenCalled();
    });

    // Verify onComplete callback was called
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('should handle form validation errors', async () => {
    render(
      <OnboardingFlow 
        onComplete={vi.fn()}
        allowSkip={true}
      />
    );

    // Navigate to profile form
    fireEvent.click(screen.getByText('Get Started'));

    await waitFor(() => {
      expect(screen.getByText('Tell us about yourself')).toBeInTheDocument();
    });

    // Try to submit without filling required fields
    const completeButton = screen.getByText('Complete Setup');
    fireEvent.click(completeButton);

    // Should show validation errors (form won't submit)
    // The form should still be visible
    expect(screen.getByText('Tell us about yourself')).toBeInTheDocument();
  });

  it('should show progress correctly', () => {
    render(
      <OnboardingFlow 
        onComplete={vi.fn()}
        allowSkip={true}
      />
    );

    // Check initial progress
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('33% Complete')).toBeInTheDocument();

    // Navigate to next step
    fireEvent.click(screen.getByText('Get Started'));

    // Check updated progress
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('67% Complete')).toBeInTheDocument();
  });
});