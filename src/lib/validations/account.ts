import { z } from 'zod';
import { nonEmptyString } from './common';

export const updateUserDetailsSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\-()\s]{7,20}$/i, 'Enter a valid phone number')
    .optional(),
});
export type UpdateUserDetailsInput = z.infer<typeof updateUserDetailsSchema>;

export const binanceCredentialsSchema = z.object({
  apiKey: nonEmptyString.min(10, 'API key looks too short'),
  apiSecret: nonEmptyString.min(10, 'API secret looks too short'),
});
export type BinanceCredentialsInput = z.infer<typeof binanceCredentialsSchema>;

export const toggleBinanceSchema = z.object({ isActive: z.boolean() });
export type ToggleBinanceInput = z.infer<typeof toggleBinanceSchema>;