import { beforeAll, afterAll } from 'vitest';
import * as schema from '../db/schema';

// Mock database setup for schema validation tests
export const mockDb = {
  users: [] as any[],
  userProfiles: [] as any[],
  binanceCredentials: [] as any[],
  portfolioAssets: [] as any[],
  chatMessages: [] as any[],
  priceCache: [] as any[],
};

beforeAll(() => {
  // Initialize mock database
  console.log('Setting up mock database for schema tests');
});

afterAll(() => {
  // Clean up
  console.log('Cleaning up mock database');
});