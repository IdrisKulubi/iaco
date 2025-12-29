/**
 * Profile Validation Schemas
 * 
 * Zod schemas for validating user profile data and onboarding form inputs.
 */

import { z } from 'zod';

/**
 * Experience level validation
 */
export const experienceLevelSchema = z.union([
  z.literal('beginner'),
  z.literal('intermediate')
]);

/**
 * Risk tolerance validation
 */
export const riskToleranceSchema = z.union([
  z.literal('low'),
  z.literal('medium'),
  z.literal('high')
]);

/**
 * Investment objectives validation
 */
export const investmentObjectivesSchema = z
  .array(z.string().trim().min(1))
  .min(1, 'Please select at least one investment objective')
  .max(5, 'Please select no more than 5 investment objectives');

/**
 * Create user profile schema for onboarding
 */
export const createUserProfileSchema = z.object({
  experienceLevel: experienceLevelSchema,
  investmentObjectives: investmentObjectivesSchema,
  riskTolerance: riskToleranceSchema,
});

/**
 * Update user profile schema (all fields optional for partial updates)
 */
export const updateUserProfileSchema = z.object({
  experienceLevel: experienceLevelSchema.optional(),
  investmentObjectives: investmentObjectivesSchema.optional(),
  riskTolerance: riskToleranceSchema.optional(),
});

/**
 * User profile response schema
 */
export const userProfileSchema = z.object({
  userId: z.string(),
  experienceLevel: experienceLevelSchema,
  investmentObjectives: investmentObjectivesSchema,
  riskTolerance: riskToleranceSchema,
  completedOnboarding: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Onboarding completion schema
 */
export const completeOnboardingSchema = z.object({
  experienceLevel: experienceLevelSchema,
  investmentObjectives: investmentObjectivesSchema,
  riskTolerance: riskToleranceSchema,
  skipOnboarding: z.boolean().optional().default(false),
});

/**
 * Type inference for validation schemas
 */
export type CreateUserProfileInput = z.infer<typeof createUserProfileSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;
export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;