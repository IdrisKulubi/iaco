/**
 * Message Formatting Utilities
 * 
 * Helper functions for formatting and processing chat messages.
 */

interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  role: 'user' | 'assistant';
  metadata?: Record<string, unknown>;
  createdAt: Date | null;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Converts database chat messages to AI SDK message format
 * 
 * @param messages - Array of chat messages from the database
 * @returns Array of messages formatted for AI SDK
 */
export function formatMessagesForAI(messages: ChatMessage[]): AIMessage[] {
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}

/**
 * Validates a message before sending to the AI
 * 
 * @param message - The message content to validate
 * @returns Object with isValid flag and optional error message
 */
export function validateMessage(message: string): { 
  isValid: boolean; 
  error?: string 
} {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message must be a non-empty string' };
  }

  const trimmed = message.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (trimmed.length > 4000) {
    return { isValid: false, error: 'Message is too long (max 4000 characters)' };
  }

  return { isValid: true };
}

/**
 * Truncates message history to the most recent N messages
 * 
 * @param messages - Array of chat messages
 * @param limit - Maximum number of messages to keep
 * @returns Truncated array of messages
 */
export function truncateMessageHistory(
  messages: ChatMessage[], 
  limit: number
): ChatMessage[] {
  if (messages.length <= limit) {
    return messages;
  }
  
  return messages.slice(-limit);
}

/**
 * Sanitizes message content for display
 * 
 * @param content - The message content to sanitize
 * @returns Sanitized content
 */
export function sanitizeMessageContent(content: string): string {
  // Basic sanitization - trim whitespace
  return content.trim();
}
