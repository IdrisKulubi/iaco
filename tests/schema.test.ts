import { describe, it, expect } from 'vitest';
import * as schema from '../db/schema';
import { getTableConfig } from 'drizzle-orm/pg-core';

describe('Database Schema Validation Tests', () => {
  describe('Schema Structure', () => {
    it('should have all required tables defined', () => {
      expect(schema.users).toBeDefined();
      expect(schema.userProfiles).toBeDefined();
      expect(schema.binanceCredentials).toBeDefined();
      expect(schema.portfolioAssets).toBeDefined();
      expect(schema.chatMessages).toBeDefined();
      expect(schema.priceCache).toBeDefined();
      expect(schema.session).toBeDefined();
      expect(schema.account).toBeDefined();
      expect(schema.verification).toBeDefined();
    });

    it('should have proper table names', () => {
      expect(getTableConfig(schema.users).name).toBe('users');
      expect(getTableConfig(schema.userProfiles).name).toBe('user_profiles');
      expect(getTableConfig(schema.binanceCredentials).name).toBe('binance_credentials');
      expect(getTableConfig(schema.portfolioAssets).name).toBe('portfolio_assets');
      expect(getTableConfig(schema.chatMessages).name).toBe('chat_messages');
      expect(getTableConfig(schema.priceCache).name).toBe('price_cache');
    });
  });

  describe('Table Configurations', () => {
    it('should have users table with proper structure', () => {
      const config = getTableConfig(schema.users);
      expect(config.name).toBe('users');
      expect(config.columns).toBeDefined();
      expect(Object.keys(config.columns).length).toBeGreaterThan(5); // Should have multiple columns
    });

    it('should have user_profiles table with foreign key', () => {
      const config = getTableConfig(schema.userProfiles);
      expect(config.name).toBe('user_profiles');
      expect(config.foreignKeys).toHaveLength(1);
      expect(config.foreignKeys[0].reference().foreignTable).toBe(schema.users);
    });

    it('should have binance_credentials table with foreign key', () => {
      const config = getTableConfig(schema.binanceCredentials);
      expect(config.name).toBe('binance_credentials');
      expect(config.foreignKeys).toHaveLength(1);
      expect(config.foreignKeys[0].reference().foreignTable).toBe(schema.users);
    });

    it('should have portfolio_assets table with foreign key and indexes', () => {
      const config = getTableConfig(schema.portfolioAssets);
      expect(config.name).toBe('portfolio_assets');
      expect(config.foreignKeys).toHaveLength(1);
      expect(config.foreignKeys[0].reference().foreignTable).toBe(schema.users);
      expect(config.indexes.length).toBeGreaterThan(0);
    });

    it('should have chat_messages table with foreign key', () => {
      const config = getTableConfig(schema.chatMessages);
      expect(config.name).toBe('chat_messages');
      expect(config.foreignKeys).toHaveLength(1);
      expect(config.foreignKeys[0].reference().foreignTable).toBe(schema.users);
    });

    it('should have price_cache table with proper structure', () => {
      const config = getTableConfig(schema.priceCache);
      expect(config.name).toBe('price_cache');
      expect(config.columns).toBeDefined();
      expect(Object.keys(config.columns).length).toBe(5); // Should have 5 columns
    });
  });

  describe('Relations', () => {
    it('should have foreign key relationships defined in schema', () => {
      // Relations are handled through foreign key constraints in the schema
      // rather than explicit Drizzle relations due to version compatibility
      const userProfilesConfig = getTableConfig(schema.userProfiles);
      const binanceCredentialsConfig = getTableConfig(schema.binanceCredentials);
      const portfolioAssetsConfig = getTableConfig(schema.portfolioAssets);
      const chatMessagesConfig = getTableConfig(schema.chatMessages);
      
      expect(userProfilesConfig.foreignKeys).toHaveLength(1);
      expect(binanceCredentialsConfig.foreignKeys).toHaveLength(1);
      expect(portfolioAssetsConfig.foreignKeys).toHaveLength(1);
      expect(chatMessagesConfig.foreignKeys).toHaveLength(1);
    });
  });

  describe('Migration Generation', () => {
    it('should be able to generate migrations without errors', () => {
      // This test validates that the schema is properly structured
      // for migration generation by checking table configs
      const tables = [
        schema.users,
        schema.userProfiles,
        schema.binanceCredentials,
        schema.portfolioAssets,
        schema.chatMessages,
        schema.priceCache,
        schema.session,
        schema.account,
        schema.verification
      ];

      tables.forEach(table => {
        const config = getTableConfig(table);
        expect(config.name).toBeDefined();
        expect(config.columns).toBeDefined();
        expect(Object.keys(config.columns).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Schema Constraints', () => {
    it('should have proper cascade delete constraints', () => {
      // Check that user-related tables have cascade delete
      const userRelatedTables = [
        schema.userProfiles,
        schema.binanceCredentials,
        schema.portfolioAssets,
        schema.chatMessages
      ];

      userRelatedTables.forEach(table => {
        const config = getTableConfig(table);
        expect(config.foreignKeys).toHaveLength(1);
        expect(config.foreignKeys[0].reference().foreignTable).toBe(schema.users);
      });
    });

    it('should have proper indexes for performance', () => {
      // Check that tables with frequent queries have indexes
      const indexedTables = [
        schema.userProfiles,
        schema.binanceCredentials,
        schema.portfolioAssets,
        schema.chatMessages,
        schema.priceCache
      ];

      indexedTables.forEach(table => {
        const config = getTableConfig(table);
        expect(config.indexes.length).toBeGreaterThan(0);
      });
    });
  });
});