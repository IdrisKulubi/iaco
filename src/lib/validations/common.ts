/**
 * Common Validation Schemas
 * 
 * Shared Zod schemas used across multiple parts of the application.
 */

import { z } from 'zod';

/**
 * Common string validation with trimming
 */
export const nonEmptyString = z.string().trim().min(1, 'This field is required');

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Please enter a valid email address');

/**
 * UUID validation schema
 */
export const uuidSchema = z.string().uuid('Invalid ID format');

/**
 * Positive number validation
 */
export const positiveNumber = z.number().positive('Must be a positive number');

/**
 * Decimal string validation for crypto amounts
 */
export const decimalString = z.string().regex(/^\d+(\.\d+)?$/, 'Must be a valid decimal number');

/**
 * Crypto symbol validation (3-10 uppercase letters)
 */
export const cryptoSymbol = z.string().regex(/^[A-Z]{3,10}$/, 'Invalid crypto symbol format');

/**
 * API response wrapper schema
 */
export const apiResponseSchema = <T>(dataSchema: z.ZodSchema<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    timestamp: z.string().datetime(),
  });

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  total: z.number().int().nonnegative().optional(),
});