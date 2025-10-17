import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  createUserProfileSchema,
  updateUserProfileSchema,
  completeOnboardingSchema 
} from '../src/lib/validations/profile';

// Mock the auth module
vi.mock('../src/lib/auth', () => ({
  auth: vi.fn(),
}));

// Mock the database
vi.mock('../db/drizzle', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock Next.js cache revalidation
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('Profile Server Actions Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Input Validation', () => {
    it('should validate createUserProfile input schema', () => {
      const validInput = {
        experienceLevel: 'beginner' as const,
        investmentObjectives: ['learning', 'long-term growth'],
        riskTolerance: 'low' as const,
      };

      expect(() => createUserProfileSchema.parse(validInput)).not.toThrow();
      expect(() => createUserProfileSchema.parse({})).toThrow();
      expect(() => createUserProfileSchema.parse({
        ...validInput,
        experienceLevel: 'invalid',
      })).toThrow();
    });

    it('should validate updateUserProfile input schema', () => {
      const validPartialInput = {
        experienceLevel: 'intermediate' as const,
      };

      expect(() => updateUserProfileSchema.parse(validPartialInput)).not.toThrow();
      expect(() => updateUserProfileSchema.parse({})).not.toThrow();
      expect(() => updateUserProfileSchema.parse({
        experienceLevel: 'invalid',
      })).toThrow();
    });

    it('should validate completeOnboarding input schema', () => {
      const validInput = {
        experienceLevel: 'beginner' as const,
        investmentObjectives: ['learning'],
        riskTolerance: 'low' as const,
        skipOnboarding: false,
      };

      expect(() => completeOnboardingSchema.parse(validInput)).not.toThrow();
      expect(() => completeOnboardingSchema.parse({
        ...validInput,
        investmentObjectives: [],
      })).toThrow();
    });
  });

  describe('Data Transformation', () => {
    it('should properly transform experience levels', () => {
      const input = { experienceLevel: 'beginner' as const };
      const result = updateUserProfileSchema.parse(input);
      expect(result.experienceLevel).toBe('beginner');
    });

    it('should properly transform investment objectives array', () => {
      const objectives = ['learning', 'diversification', 'growth'];
      const input = { investmentObjectives: objectives };
      const result = updateUserProfileSchema.parse(input);
      expect(result.investmentObjectives).toEqual(objectives);
    });

    it('should properly transform risk tolerance', () => {
      const input = { riskTolerance: 'medium' as const };
      const result = updateUserProfileSchema.parse(input);
      expect(result.riskTolerance).toBe('medium');
    });
  });

  describe('Edge Cases', () => {
    it('should handle trimmed investment objectives', () => {
      const input = {
        experienceLevel: 'beginner' as const,
        investmentObjectives: ['  learning  ', 'growth  '],
        riskTolerance: 'low' as const,
      };
      
      // The schema should handle trimming
      expect(() => createUserProfileSchema.parse(input)).not.toThrow();
    });

    it('should reject empty investment objectives after trimming', () => {
      const input = {
        experienceLevel: 'beginner' as const,
        investmentObjectives: ['   ', 'learning'],
        riskTolerance: 'low' as const,
      };
      
      expect(() => createUserProfileSchema.parse(input)).toThrow();
    });

    it('should handle maximum investment objectives limit', () => {
      const maxObjectives = ['a', 'b', 'c', 'd', 'e'];
      const tooManyObjectives = ['a', 'b', 'c', 'd', 'e', 'f'];
      
      const validInput = {
        experienceLevel: 'beginner' as const,
        investmentObjectives: maxObjectives,
        riskTolerance: 'low' as const,
      };
      
      const invalidInput = {
        experienceLevel: 'beginner' as const,
        investmentObjectives: tooManyObjectives,
        riskTolerance: 'low' as const,
      };
      
      expect(() => createUserProfileSchema.parse(validInput)).not.toThrow();
      expect(() => createUserProfileSchema.parse(invalidInput)).toThrow();
    });
  });

  describe('Type Safety', () => {
    it('should enforce correct experience level types', () => {
      const validLevels = ['beginner', 'intermediate'];
      const invalidLevels = ['advanced', 'expert', 'novice'];
      
      validLevels.forEach(level => {
        expect(() => createUserProfileSchema.parse({
          experienceLevel: level,
          investmentObjectives: ['learning'],
          riskTolerance: 'low',
        })).not.toThrow();
      });
      
      invalidLevels.forEach(level => {
        expect(() => createUserProfileSchema.parse({
          experienceLevel: level,
          investmentObjectives: ['learning'],
          riskTolerance: 'low',
        })).toThrow();
      });
    });

    it('should enforce correct risk tolerance types', () => {
      const validTolerances = ['low', 'medium', 'high'];
      const invalidTolerances = ['very-low', 'extreme', 'conservative'];
      
      validTolerances.forEach(tolerance => {
        expect(() => createUserProfileSchema.parse({
          experienceLevel: 'beginner',
          investmentObjectives: ['learning'],
          riskTolerance: tolerance,
        })).not.toThrow();
      });
      
      invalidTolerances.forEach(tolerance => {
        expect(() => createUserProfileSchema.parse({
          experienceLevel: 'beginner',
          investmentObjectives: ['learning'],
          riskTolerance: tolerance,
        })).toThrow();
      });
    });
  });
});