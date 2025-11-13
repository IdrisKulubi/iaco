/**
 * AI SDK Configuration
 * 
 * This file configures the AI providers and models used throughout the application.
 * Currently supports OpenAI with the ability to add other providers (Anthropic, Mistral, etc.)
 */

import { openai } from '@ai-sdk/openai';

/**
 * Default AI model configuration
 */
export const AI_CONFIG = {
  // Primary model for chat responses
  chatModel: openai('gpt-4-turbo'),
  
  // Model parameters
  temperature: 0.7,
  maxTokens: 1000,
  
  // Context window settings
  maxHistoryMessages: 20,
} as const;

/**
 * Validate that required environment variables are set
 */
export function validateAIConfig() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
}

/**
 * Get the configured chat model
 */
export function getChatModel() {
  validateAIConfig();
  return AI_CONFIG.chatModel;
}
