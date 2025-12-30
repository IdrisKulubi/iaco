"use client";

import { useState, useEffect } from "react";
import { MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatDialog } from "./chat-dialog";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chat-dialog', handleOpen);
    return () => window.removeEventListener('open-chat-dialog', handleOpen);
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg"
        size="icon"
        aria-label="Open CryptoCoach chat assistant"
      >
        <MessageCircleIcon className="size-6" />
      </Button>

      <ChatDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
