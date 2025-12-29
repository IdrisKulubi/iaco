# Design Document: AI Crypto Chat Assistant

## Overview

The AI Crypto Chat Assistant (CryptoCoach) provides an educational conversational interface for beginner crypto investors. The system uses the Vercel AI SDK with streaming responses, persists conversation history in PostgreSQL, and integrates with the existing authentication and user profile system.

The design follows the existing Next.js architecture with:
- Server Actions for data mutations
- API routes for streaming AI responses
- Client components for interactive UI
- Drizzle ORM for database operations
- BetterAuth for session management

## Architecture

### High-Level Component Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────────┐      ┌────────────────────────┐  │
│  │  Chat Bubble     │      │   Chat Interface       │  │
│  │  (Floating UI)   │─────▶│   (Dialog/Drawer)      │  │
│  └──────────────────┘      └────────────────────────┘  │
│                                      │                   │
│                                      ▼                   │
│                            ┌────────────────────────┐   │
│                            │  Message List          │   │
│                            │  Message Input         │   │
│                            │  Streaming Display     │   │
│                            └────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────┐
│                    API Layer                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │  POST /api/chat                                   │  │
│  │  - Validates session                              │  │
│  │  - Loads conversation history                     │  │
│  │  - Loads user profile for context                 │  │
│  │  - Calls Vercel AI SDK with streaming             │  │
│  │  - Saves messages to database                     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────┐
│                  Data Layer                              │
│  ┌──────────────────┐      ┌────────────────────────┐  │
│  │  chat_messages   │      │   user_profiles        │  │
│  │  - id            │      │   - userId             │  │
│  │  - userId        │      │   - experienceLevel    │  │
│  │  - content       │      │   - objectives         │  │
│  │  - role          │      │   - riskTolerance      │  │
│  │  - metadata      │      └────────────────────────┘  │
│  │  - createdAt     │                                   │
│  └──────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: React 19, Next.js 15, TailwindCSS, shadcn/ui
- **AI**: Vercel AI SDK (with OpenAI/Anthropic/Mistral support)
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: BetterAuth (already implemented)
- **State Management**: React hooks (useState, useEffect)
- **Streaming**: Vercel AI SDK streaming with ReadableStream

## Components and Interfaces

### 1. Client Components

#### ChatBubble Component
**Location**: `src/components/chat/chat-bubble.tsx`

A floating action button that provides access to the chat interface from any authenticated page.

```typescript
interface ChatBubbleProps {
  className?: string;
}

export function ChatBubble({ className }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg"
        size="lg"
      >
        <MessageCircleIcon />
      </Button>
      
      <ChatDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
```

**Features**:
- Fixed positioning (bottom-right corner)
- Z-index management to stay above other content
- Unread message indicator (future enhancement)
- Smooth open/close animations

#### ChatDialog Component
**Location**: `src/components/chat/chat-dialog.tsx`

The main chat interface container that adapts between dialog (desktop) and drawer (mobile).

```typescript
interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <ChatInterface onClose={() => onOpenChange(false)} />
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px]">
        <ChatInterface onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
```

**Features**:
- Responsive layout (Dialog on desktop, Drawer on mobile)
- Proper focus management
- Keyboard shortcuts (Escape to close)

#### ChatInterface Component
**Location**: `src/components/chat/chat-interface.tsx`

The core chat UI containing message list, input, and disclaimer.

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Load message history on mount
  useEffect(() => {
    loadMessages();
  }, []);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Send message and handle streaming response
  };
  
  return (
    <div className="flex flex-col h-full">
      <ChatHeader onClose={onClose} />
      <DisclaimerBanner />
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput 
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
}
```

**Features**:
- Message history loading
- Optimistic UI updates
- Auto-scroll to latest message
- Loading states

#### MessageList Component
**Location**: `src/components/chat/message-list.tsx`

Displays the conversation history with proper styling for user and assistant messages.

```typescript
interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <ScrollArea className="flex-1 p-4">
      {messages.length === 0 && <WelcomeMessage />}
      
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isLoading && <TypingIndicator />}
      
      <div ref={scrollRef} />
    </ScrollArea>
  );
}
```

**Features**:
- Auto-scroll behavior
- Empty state with welcome message
- Typing indicator during streaming
- Markdown rendering for assistant messages

#### MessageBubble Component
**Location**: `src/components/chat/message-bubble.tsx`

Individual message display with role-based styling.

```typescript
interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "mb-4 flex",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2",
        isUser 
          ? "bg-blue-600 text-white" 
          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      )}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
```

**Features**:
- Visual distinction between user and assistant
- Markdown rendering for assistant messages
- Responsive width constraints
- Proper text wrapping

#### MessageInput Component
**Location**: `src/components/chat/message-input.tsx`

Text input with send button and keyboard handling.

```typescript
interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled: boolean;
}

export function MessageInput({ 
  value, 
  onChange, 
  onSubmit, 
  disabled 
}: MessageInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };
  
  return (
    <form onSubmit={onSubmit} className="border-t p-4">
      <div className="flex gap-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about crypto..."
          disabled={disabled}
          rows={1}
          className="resize-none"
        />
        <Button type="submit" disabled={disabled || !value.trim()}>
          <SendIcon />
        </Button>
      </div>
    </form>
  );
}
```

**Features**:
- Enter to send, Shift+Enter for new line
- Auto-resize textarea
- Disabled state during loading
- Send button with icon

### 2. API Routes

#### Chat API Route
**Location**: `src/app/api/chat/route.ts`

Handles chat message submission and AI response streaming.

```typescript
import { auth } from '@/lib/auth';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import db from '@/db/drizzle';
import { chatMessages, userProfiles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // 2. Parse request body
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return new Response('Invalid message', { status: 400 });
    }
    
    // 3. Load user profile for context
    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, session.user.id),
    });
    
    // 4. Load recent conversation history (last 20 messages)
    const history = await db.query.chatMessages.findMany({
      where: eq(chatMessages.userId, session.user.id),
      orderBy: [desc(chatMessages.createdAt)],
      limit: 20,
    });
    
    // 5. Build context messages
    const contextMessages = history
      .reverse()
      .map(msg => ({
        role: msg.role,
        content: msg.content,
      }));
    
    // 6. Add current user message
    contextMessages.push({
      role: 'user',
      content: message,
    });
    
    // 7. Save user message to database
    await db.insert(chatMessages).values({
      userId: session.user.id,
      role: 'user',
      content: message,
    });
    
    // 8. Generate AI response with streaming
    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: buildSystemPrompt(profile),
      messages: contextMessages,
      temperature: 0.7,
      maxTokens: 1000,
    });
    
    // 9. Save assistant response after streaming completes
    let fullResponse = '';
    const stream = result.toAIStream({
      onFinal: async (completion) => {
        fullResponse = completion;
        await db.insert(chatMessages).values({
          userId: session.user.id,
          role: 'assistant',
          content: fullResponse,
        });
      },
    });
    
    // 10. Return streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
```

**Key Design Decisions**:
- Use Vercel AI SDK's `streamText` for streaming responses
- Load last 20 messages for context (balance between context and performance)
- Save messages asynchronously to avoid blocking the stream
- Include user profile data in system prompt for personalization

### 3. Server Actions

#### Load Messages Action
**Location**: `src/lib/actions/chat.ts`

Server action to load conversation history.

```typescript
'use server';

import { auth } from '@/lib/auth';
import db from '@/db/drizzle';
import { chatMessages } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function loadChatMessages(limit: number = 50) {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });
    
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }
    
    const messages = await db.query.chatMessages.findMany({
      where: eq(chatMessages.userId, session.user.id),
      orderBy: [desc(chatMessages.createdAt)],
      limit,
    });
    
    return { 
      success: true, 
      data: messages.reverse() // Return in chronological order
    };
  } catch (error) {
    console.error('Error loading messages:', error);
    return { success: false, error: 'Failed to load messages' };
  }
}
```

### 4. Utility Functions

#### System Prompt Builder
**Location**: `src/lib/chat/system-prompt.ts`

Constructs the AI system prompt with user context.

```typescript
interface UserProfile {
  experienceLevel: string;
  investmentObjectives: string[];
  riskTolerance: string;
}

export function buildSystemPrompt(profile?: UserProfile | null): string {
  const basePrompt = `You are CryptoCoach, an educational AI assistant for beginner crypto investors.

Your role:
- Provide clear, simple explanations of crypto concepts
- Help users understand blockchain, wallets, exchanges, and trading basics
- Offer educational guidance, NOT financial advice
- Be supportive, patient, and encouraging
- Use analogies and examples to explain complex topics
- Always emphasize the importance of research and caution

Important guidelines:
- Never provide specific investment recommendations
- Always include disclaimers about risk
- Encourage users to do their own research (DYOR)
- Explain technical terms in simple language
- Be honest about what you don't know
- Recommend educational resources when appropriate

Tone: Friendly, supportive, educational, and non-judgmental.`;

  if (!profile) {
    return basePrompt;
  }

  const contextPrompt = `

User Context:
- Experience Level: ${profile.experienceLevel}
- Investment Objectives: ${profile.investmentObjectives.join(', ')}
- Risk Tolerance: ${profile.riskTolerance}

Tailor your responses to match their experience level and objectives.`;

  return basePrompt + contextPrompt;
}
```

#### Video Catalog
**Location**: `public/data/video-catalog.json`

JSON file containing curated educational videos.

```json
{
  "videos": [
    {
      "id": "intro-to-crypto",
      "title": "What is Cryptocurrency?",
      "description": "A beginner-friendly introduction to cryptocurrency and blockchain technology",
      "url": "https://youtube.com/watch?v=...",
      "duration": "10:30",
      "level": "beginner",
      "topics": ["basics", "blockchain", "bitcoin"]
    },
    {
      "id": "wallets-explained",
      "title": "Crypto Wallets Explained",
      "description": "Learn about hot wallets, cold wallets, and how to keep your crypto safe",
      "url": "https://youtube.com/watch?v=...",
      "duration": "8:45",
      "level": "beginner",
      "topics": ["wallets", "security", "storage"]
    }
  ]
}
```

## Data Models

The chat system uses the existing `chat_messages` table from the schema:

```typescript
export const chatMessages = pgTable(
  "chat_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    content: text("content").notNull(),
    role: text("role").notNull().$type<"user" | "assistant">(),
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    userIdIdx: index("chat_messages_user_id_idx").on(table.userId),
    roleIdx: index("chat_messages_role_idx").on(table.role),
    createdAtIdx: index("chat_messages_created_at_idx").on(table.createdAt),
  })
);
```

**Metadata Field Usage** (future enhancements):
- Video recommendations: `{ videoId: "intro-to-crypto" }`
- Feedback: `{ helpful: true, rating: 5 }`
- Context tags: `{ topics: ["wallets", "security"] }`

## Error Handling

### Client-Side Error Handling

1. **Network Errors**: Display toast notification with retry option
2. **Streaming Interruption**: Show partial message with "Response incomplete" indicator
3. **Session Expiration**: Redirect to sign-in page with return URL
4. **Validation Errors**: Show inline error messages

```typescript
try {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      router.push('/sign-in?returnUrl=/');
      return;
    }
    throw new Error('Failed to send message');
  }
  
  // Handle streaming...
} catch (error) {
  toast.error('Failed to send message. Please try again.');
  console.error('Chat error:', error);
}
```

### Server-Side Error Handling

1. **Authentication Errors**: Return 401 with clear message
2. **Database Errors**: Log error, return 500, don't expose details
3. **AI API Errors**: Log error, return graceful fallback message
4. **Rate Limiting**: Return 429 with retry-after header

```typescript
try {
  const result = await streamText({...});
  return result.toAIStream();
} catch (error) {
  if (error.code === 'rate_limit_exceeded') {
    return new Response('Rate limit exceeded. Please try again in a moment.', {
      status: 429,
      headers: { 'Retry-After': '60' },
    });
  }
  
  console.error('AI API error:', error);
  return new Response('Unable to generate response. Please try again.', {
    status: 500,
  });
}
```

## Testing Strategy

### Unit Tests

1. **System Prompt Builder**
   - Test with and without user profile
   - Verify correct formatting
   - Test edge cases (missing fields)

2. **Message Formatting**
   - Test markdown rendering
   - Test long messages
   - Test special characters

3. **Validation Logic**
   - Test message length limits
   - Test empty messages
   - Test malformed input

### Integration Tests

1. **Chat API Route**
   - Test authenticated requests
   - Test unauthenticated requests
   - Test message persistence
   - Test streaming response format

2. **Server Actions**
   - Test message loading with pagination
   - Test error handling
   - Test session validation

### Component Tests

1. **ChatInterface**
   - Test message submission
   - Test message display
   - Test loading states
   - Test error states

2. **MessageList**
   - Test auto-scroll behavior
   - Test empty state
   - Test message rendering

3. **MessageInput**
   - Test keyboard shortcuts
   - Test disabled state
   - Test validation

### E2E Tests

1. **Complete Chat Flow**
   - User opens chat bubble
   - User sends message
   - Assistant responds with streaming
   - Message persists in history
   - User closes and reopens chat (history preserved)

2. **Mobile Experience**
   - Chat opens as drawer on mobile
   - Input remains accessible with keyboard
   - Scrolling works correctly

## Performance Considerations

### Optimization Strategies

1. **Context Window Management**
   - Limit to 20 most recent messages
   - Prevents excessive token usage
   - Maintains conversation coherence

2. **Database Query Optimization**
   - Use indexes on userId, createdAt
   - Limit query results
   - Consider caching user profile

3. **Streaming Benefits**
   - Reduces perceived latency
   - Better user experience
   - Allows for early cancellation

4. **Client-Side Optimization**
   - Lazy load older messages
   - Virtualize message list for long conversations
   - Debounce typing indicators

### Caching Strategy

1. **User Profile**: Cache in memory during chat session
2. **System Prompt**: Build once per session
3. **Video Catalog**: Static file, cached by CDN

## Security Considerations

1. **Authentication**: All API routes validate session
2. **Authorization**: Users can only access their own messages
3. **Input Sanitization**: Validate and sanitize user input
4. **Rate Limiting**: Implement per-user rate limits (future)
5. **Content Filtering**: Monitor for abuse/inappropriate content (future)
6. **API Key Security**: Store AI API keys in environment variables

## Future Enhancements

1. **Message Reactions**: Allow users to mark messages as helpful
2. **Conversation Threads**: Support multiple conversation topics
3. **Voice Input**: Add speech-to-text for mobile users
4. **Image Support**: Allow users to upload screenshots for help
5. **Suggested Questions**: Show common questions for beginners
6. **Export Conversation**: Allow users to download chat history
7. **Multi-language Support**: Detect and respond in user's language
8. **Advanced Context**: Include portfolio data in AI context
