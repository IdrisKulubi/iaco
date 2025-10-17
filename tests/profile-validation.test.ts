import { describe, it, expect } from 'vitest';
import {
  createUserProfileSchema,
  updateUserProfileSchema,
  completeOnboardingSchema,
  experienceLevelSchema,
  riskToleranceSchema,
  investmentObjectivesSchema,
} from '../src/lib/validations/profile';

describe('Profile Validation Schemas', () => {
  describe('experienceLevelSchema', () => {
    it('should accept valid experience levels', () => {
      expect(experienceLevelSchema.parse('beginner')).toBe('beginner');
      expect(experienceLevelSchema.parse('intermediate')).toBe('intermediate');
    });

    it('should reject invalid experience levels', () => {
      expect(() => experienceLevelSchema.parse('advanced')).toThrow();
      expect(() => experienceLevelSchema.parse('expert')).toThrow();
      expect(() => experienceLevelSchema.parse('')).toThrow();
    });
  });

  describe('riskToleranceSchema', () => {
    it('should accept valid risk tolerance levels', () => {
      expect(riskToleranceSchema.parse('low')).toBe('low');
      expect(riskToleranceSchema.parse('medium')).toBe('medium');
      expect(riskToleranceSchema.parse('high')).toBe('high');
    });

    it('should reject invalid risk tolerance levels', () => {
      expect(() => riskToleranceSchema.parse('very-low')).toThrow();
      expect(() => riskToleranceSchema.parse('extreme')).toThrow();
      expect(() => riskToleranceSchema.parse('')).toThrow();
    });
  });

  describe('investmentObjectivesSchema', () => {
    it('should accept valid investment objectives array', () => {
      const objectives = ['learning', 'long-term growth'];
      expect(investmentObjectivesSchema.parse(objectives)).toEqual(objectives);
    });

    it('should require at least one objective', () => {
      expect(() => investmentObjectivesSchema.parse([])).toThrow();
    });

    it('should limit to maximum 5 objectives', () => {
      const tooManyObjectives = ['a', 'b', 'c', 'd', 'e', 'f'];
      expect(() => investmentObjectivesSchema.parse(tooManyObjectives)).toThrow();
    });

    it('should reject empty strings in objectives', () => {
      expect(() => investmentObjectivesSchema.parse(['learning', ''])).toThrow();
      expect(() => investmentObjectivesSchema.parse(['   '])).toThrow();
    });
  });

  describe('createUserProfileSchema', () => {
    const validInput = {
      experienceLevel: 'beginner' as const,
      investmentObjectives: ['learning', 'long-term growth'],
      riskTolerance: 'low' as const,
    };

    it('should accept valid profile data', () => {
      const result = createUserProfileSchema.parse(validInput);
      expect(result).toEqual(validInput);
    });

    it('should require all fields', () => {
      expect(() => createUserProfileSchema.parse({})).toThrow();
      expect(() => createUserProfileSchema.parse({
        experienceLevel: 'beginner',
        investmentObjectives: ['learning'],
      })).toThrow();
    });

    it('should validate nested schemas', () => {
      expect(() => createUserProfileSchema.parse({
        ...validInput,
        experienceLevel: 'invalid',
      })).toThrow();

      expect(() => createUserProfileSchema.parse({
        ...validInput,
        investmentObjectives: [],
      })).toThrow();

      expect(() => createUserProfileSchema.parse({
        ...validInput,
        riskTolerance: 'invalid',
      })).toThrow();
    });
  });

  describe('updateUserProfileSchema', () => {
    it('should accept partial updates', () => {
      const partialUpdate = { experienceLevel: 'intermediate' as const };
      const result = updateUserProfileSchema.parse(partialUpdate);
      expect(result).toEqual(partialUpdate);
    });

    it('should accept empty object for no updates', () => {
      const result = updateUserProfileSchema.parse({});
      expect(result).toEqual({});
    });

    it('should validate provided fields', () => {
      expect(() => updateUserProfileSchema.parse({
        experienceLevel: 'invalid',
      })).toThrow();
    });
  });

  describe('completeOnboardingSchema', () => {
    const validInput = {
      experienceLevel: 'beginner' as const,
      investmentObjectives: ['learning'],
      riskTolerance: 'low' as const,
    };

    it('should accept valid onboarding data', () => {
      const result = completeOnboardingSchema.parse(validInput);
      expect(result).toEqual({
        ...validInput,
        skipOnboarding: false,
      });
    });

    it('should handle skipOnboarding flag', () => {
      const withSkip = { ...validInput, skipOnboarding: true };
      const result = completeOnboardingSchema.parse(withSkip);
      expect(result.skipOnboarding).toBe(true);
    });

    it('should default skipOnboarding to false', () => {
      const result = completeOnboardingSchema.parse(validInput);
      expect(result.skipOnboarding).toBe(false);
    });
  });
});