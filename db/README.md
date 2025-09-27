# Database Schema Documentation

## Overview

This directory contains the database schema and configuration for the AI Crypto Assistant application using Drizzle ORM with PostgreSQL (Neon).

## Files

- `schema.ts` - Database schema definitions with tables, relations, and indexes
- `drizzle.ts` - Database connection configuration and Drizzle instance
- `README.md` - This documentation file

## Schema Structure

### Core Tables

#### Users Table
- Primary authentication table from BetterAuth
- Contains user profile information (id, email, name, etc.)
- Referenced by all user-related tables

#### User Profiles Table
- Stores onboarding and personalization data
- Experience level (beginner/intermediate)
- Investment objectives and risk tolerance
- Onboarding completion status

#### Binance Credentials Table
- Encrypted storage of user's Binance API credentials
- Read-only API keys for portfolio synchronization
- Active status and last sync timestamps

#### Portfolio Assets Table
- User's cryptocurrency holdings from Binance
- Symbol, amount, and sync timestamps
- Unique constraint on user_id + symbol combination

#### Chat Messages Table
- AI chat conversation history
- User and assistant messages with metadata
- Support for video recommendations and disclaimers

#### Price Cache Table
- Cached cryptocurrency price data from Binance API
- 24-hour price changes and percentages
- Performance optimization for price display

### Relations

All user-related tables have foreign key relationships with cascade delete:
- `user_profiles.user_id` → `users.id`
- `binance_credentials.user_id` → `users.id`
- `portfolio_assets.user_id` → `users.id`
- `chat_messages.user_id` → `users.id`

### Indexes

Performance indexes are created for:
- User profile experience level and onboarding status
- Binance credentials active status and sync timestamps
- Portfolio assets by user, symbol, and sync time
- Chat messages by user, role, and creation time
- Price cache by last updated timestamp

## Environment Variables

Required environment variables:

```env
DATABASE_URL=postgresql://user:pass@host/database?sslmode=require
DB_POOL_MIN=5          # Minimum connection pool size (optional)
DB_POOL_MAX=20         # Maximum connection pool size (optional)
DB_IDLE_TIMEOUT=30000  # Idle timeout in milliseconds (optional)
```

## Migration Commands

Generate new migration:
```bash
pnpm drizzle-kit generate
```

Apply migrations:
```bash
pnpm drizzle-kit migrate
```

View database schema:
```bash
pnpm drizzle-kit introspect
```

## Testing

Schema validation tests are located in `tests/schema.test.ts`. Run tests with:

```bash
pnpm test:run
```

## Security Considerations

- Binance API credentials are encrypted before storage
- All user data has cascade delete constraints
- Foreign key constraints ensure data integrity
- Proper indexes for performance optimization

## Requirements Coverage

This schema implementation covers the following requirements:
- 2.2: User profile and onboarding data storage
- 5.2: Encrypted Binance API credential storage
- 6.2: Portfolio asset tracking and synchronization
- 8.1: Security through encryption and proper constraints