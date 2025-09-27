# Library Structure

This directory contains the core business logic and utilities for the AI Crypto Assistant application.

## Directory Structure

### `/actions/`
Server actions for Next.js 15. These are async functions that run on the server and can be called from client components.

- **Purpose**: Handle form submissions, data mutations, and server-side operations
- **Pattern**: Each file exports server actions for a specific domain (e.g., `profile.ts`, `chat.ts`)
- **Usage**: Import from `@/lib/actions` for clean imports

### `/services/`
External API integrations and business logic services.

- **Purpose**: Handle external API calls, data transformations, and complex business operations
- **Pattern**: Each service handles a specific external integration or business domain
- **Examples**: Binance API integration, AI service integration, encryption services

### `/validations/`
Zod schemas and input validation utilities.

- **Purpose**: Ensure data integrity and type safety across the application
- **Pattern**: Each file contains validation schemas for a specific domain
- **Usage**: Import from `@/lib/validations` for clean imports

### `/utils/`
Utility functions including encryption, formatting, and helper functions.

- **Purpose**: Provide reusable functionality across the application
- **Pattern**: Pure functions that can be used anywhere in the application
- **Examples**: Encryption utilities, formatting functions, constants

### `/types/`
TypeScript type definitions and interfaces.

- **Purpose**: Centralized type definitions for better type safety
- **Pattern**: Domain-specific type definitions and shared interfaces
- **Usage**: Import from `@/lib/types` for clean imports

## Usage Examples

```typescript
// Server Actions
import { createUserProfile, updateUserProfile } from '@/lib/actions';

// Services
import { binanceService, aiService } from '@/lib/services';

// Validations
import { profileSchema, binanceCredentialsSchema } from '@/lib/validations';

// Utils
import { encryptData, formatCurrency, API_CONFIG } from '@/lib/utils';

// Types
import type { UserProfile, ActionResponse } from '@/lib/types';
```

## Best Practices

1. **Server Actions**: Always validate input using Zod schemas before processing
2. **Services**: Handle errors gracefully and provide meaningful error messages
3. **Validations**: Use common validation patterns from `common.ts`
4. **Utils**: Keep functions pure and testable
5. **Types**: Use TypeScript interfaces for better type safety and IDE support