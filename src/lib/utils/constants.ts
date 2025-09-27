/**
 * Application Constants
 * 
 * Centralized constants used throughout the application.
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BINANCE_BASE_URL: 'https://api.binance.com',
  PRICE_UPDATE_INTERVAL: 30000, // 30 seconds
  PORTFOLIO_SYNC_INTERVAL: 30000, // 30 seconds
  CHAT_RATE_LIMIT: 10, // messages per minute
} as const;

/**
 * User Experience Levels
 */
export const EXPERIENCE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
} as const;

/**
 * Risk Tolerance Levels
 */
export const RISK_TOLERANCE = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

/**
 * Chat Message Roles
 */
export const CHAT_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;

/**
 * Price Change Thresholds
 */
export const PRICE_THRESHOLDS = {
  SIGNIFICANT_CHANGE: 5, // 5% change threshold for alerts
  MAJOR_CHANGE: 10, // 10% change threshold for major alerts
} as const;

/**
 * Supported Cryptocurrencies for Price Display
 */
export const SUPPORTED_CRYPTOS = [
  'BTC',
  'ETH',
  'BNB',
  'ADA',
  'SOL',
  'XRP',
  'DOT',
  'DOGE',
  'AVAX',
  'MATIC',
] as const;

/**
 * Educational Disclaimers
 */
export const DISCLAIMERS = {
  EDUCATIONAL_ONLY: 'Educational purposes only - not financial advice',
  RISK_WARNING: 'Cryptocurrency investments carry significant risk. Only invest what you can afford to lose.',
  DATA_ACCURACY: 'Price data may be delayed. Always verify on official exchanges before making decisions.',
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to access this feature',
  INVALID_CREDENTIALS: 'Invalid API credentials provided',
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  RATE_LIMITED: 'Too many requests. Please wait before trying again.',
  INVALID_INPUT: 'Invalid input provided',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully',
  CREDENTIALS_SAVED: 'API credentials saved securely',
  PORTFOLIO_SYNCED: 'Portfolio synchronized successfully',
  CREDENTIALS_REMOVED: 'API credentials removed successfully',
} as const;