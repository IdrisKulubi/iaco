"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { Message } from "./chat-interface";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  streamingContent?: string;
}

function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8">
      <div className="max-w-md space-y-4">
        <h3 className="text-xl font-semibold">Welcome to CryptoCoach! 👋</h3>
        <p className="text-muted-foreground">
          I'm here to help you learn about cryptocurrency and blockchain technology.
          Ask me anything about crypto basics, wallets, exchanges, or trading concepts.
        </p>
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium">Try asking:</p>
          <ul className="space-y-1 text-left">
            <li>• What is cryptocurrency?</li>
            <li>• How do crypto wallets work?</li>
            <li>• What's the difference between Bitcoin and Ethereum?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3">
        <div className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
        <div className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
        <div className="size-2 rounded-full bg-gray-400 animate-bounce" />
      </div>
    </div>
  );
}

export function MessageList({ messages, isLoading, streamingContent }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading, streamingContent]);

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {messages.length === 0 && !isLoading ? (
            <WelcomeMessage />
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {streamingContent && (
                <MessageBubble
                  message={{
                    id: "streaming",
                    role: "assistant",
                    content: streamingContent,
                    createdAt: new Date(),
                  }}
                />
              )}
              {isLoading && !streamingContent && <TypingIndicator />}
            </>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
