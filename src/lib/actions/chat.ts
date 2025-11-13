/**
 * Chat Server Actions
 *
 * Server actions for chat message operations with proper validation.
 * These actions handle loading conversation history for the AI chat assistant.
 */

"use server";

import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import db from "../../../db/drizzle";
import { chatMessages } from "../../../db/schema";
import { ActionResponse } from "../types";
import { auth } from "../auth";

/**
 * Load chat messages for the authenticated user
 * 
 * @param limit - Maximum number of messages to load (default: 50)
 * @returns ActionResponse with messages in chronological order
 */
export async function loadChatMessages(
  limit: number = 50
): Promise<ActionResponse> {
  try {
    // Get current user from session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Validate limit parameter
    if (limit < 1 || limit > 200) {
      return {
        success: false,
        error: "Invalid limit parameter. Must be between 1 and 200.",
      };
    }

    // Query messages for the authenticated user
    // Order by createdAt descending to get most recent first, then reverse
    const messages = await db
      .select({
        id: chatMessages.id,
        userId: chatMessages.userId,
        content: chatMessages.content,
        role: chatMessages.role,
        metadata: chatMessages.metadata,
        createdAt: chatMessages.createdAt,
      })
      .from(chatMessages)
      .where(eq(chatMessages.userId, session.user.id))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);

    // Reverse to return in chronological order (oldest first)
    const chronologicalMessages = messages.reverse();

    return {
      success: true,
      data: chronologicalMessages,
      message: `Loaded ${chronologicalMessages.length} messages`,
    };
  } catch (error) {
    console.error("Error loading chat messages:", error);
    return {
      success: false,
      error: "Failed to load messages",
    };
  }
}
