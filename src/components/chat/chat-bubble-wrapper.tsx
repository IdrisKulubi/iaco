"use client";

import { authClient } from "@/lib/auth-client";
import { ChatBubble } from "./chat-bubble";

/**
 * Wrapper component that conditionally renders ChatBubble for authenticated users
 */
export function ChatBubbleWrapper() {
  const { data: session, isPending } = authClient.useSession();

  // Don't render anything while loading or if user is not authenticated
  if (isPending || !session?.user) {
    return null;
  }

  return <ChatBubble />;
}
