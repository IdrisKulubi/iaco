# Implementation Plan: AI Crypto Chat Assistant

- [x] 1. Set up AI SDK and environment configuration





  - Install Vercel AI SDK and AI provider packages (OpenAI/Anthropic)
  - Add AI_API_KEY to environment variables
  - Create AI SDK configuration file
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 2. Create system prompt and utility functions





  - Implement buildSystemPrompt function with user profile context
  - Create video catalog JSON file with sample educational videos
  - Add helper functions for message formatting
  - _Requirements: 3.2, 3.3, 7.1, 7.4_

- [x] 3. Implement chat API route with streaming

- [x] 3.1 Create POST /api/chat route with authentication
  - Validate user session using BetterAuth
  - Parse and validate incoming message
  - Return 401 for unauthenticated requests
  - _Requirements: 3.1, 8.3_

- [x] 3.2 Load conversation history and user profile
  - Query last 20 messages from chat_messages table
  - Load user profile for context personalization
  - Build context messages array
  - _Requirements: 5.3, 5.4, 3.3, 10.1_

- [x] 3.3 Integrate Vercel AI SDK with streaming
  - Call streamText with OpenAI model
  - Include system prompt and conversation history
  - Configure temperature and max tokens
  - Return streaming response with proper headers
  - _Requirements: 3.1, 3.2, 4.1_

- [x] 3.4 Implement message persistence

  - Save user message to database before AI call
  - Save assistant response after streaming completes
  - Handle database errors gracefully
  - _Requirements: 5.1, 5.2, 8.2_

- [x] 3.5 Add error handling and rate limiting






  - Catch and log AI API errors
  - Handle rate limit errors with retry-after
  - Return user-friendly error messages
  - _Requirements: 8.1, 8.4_

- [x] 4. Create server action for loading messages





  - Implement loadChatMessages server action
  - Validate session and user authorization
  - Query messages with pagination support
  - Return messages in chronological order
  - _Requirements: 5.3, 5.4, 5.5_

- [x] 5. Build core chat UI components





- [x] 5.1 Create ChatBubble component


  - Implement floating action button with fixed positioning
  - Add open/close state management
  - Style with proper z-index and shadow
  - Add icon and accessibility labels
  - _Requirements: 1.1, 1.2_

- [x] 5.2 Create ChatDialog component with responsive layout


  - Implement Dialog for desktop (max-w-2xl, h-600px)
  - Implement Drawer for mobile (full-screen bottom sheet)
  - Add media query hook for responsive switching
  - Handle open/close state and keyboard shortcuts
  - _Requirements: 1.2, 1.3, 9.2_


- [x] 5.3 Create ChatInterface component

  - Set up message state and loading state
  - Implement message history loading on mount
  - Create layout with header, disclaimer, message list, and input
  - Add close handler
  - _Requirements: 1.4, 2.1, 6.1_


- [x] 5.4 Create MessageList component

  - Display messages in chronological order
  - Implement auto-scroll to latest message
  - Add empty state with welcome message
  - Show typing indicator during loading
  - _Requirements: 2.1, 2.6_

- [x] 5.5 Create MessageBubble component


  - Style user messages (right-aligned, blue background)
  - Style assistant messages (left-aligned, gray background)
  - Integrate ReactMarkdown for assistant messages
  - Add proper text wrapping and max-width
  - _Requirements: 2.1, 4.2_


- [x] 5.6 Create MessageInput component

  - Implement textarea with auto-resize
  - Add send button with icon
  - Handle Enter to send, Shift+Enter for new line
  - Disable input during loading
  - _Requirements: 2.2, 2.3, 2.4_


- [x] 5.7 Create DisclaimerBanner component

  - Display educational disclaimer prominently
  - Style with appropriate colors and positioning
  - Make it non-dismissible but unobtrusive
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 6. Implement chat message submission and streaming





- [x] 6.1 Add message submission handler


  - Implement optimistic UI update (show user message immediately)
  - Call /api/chat with POST request
  - Handle authentication errors with redirect
  - _Requirements: 2.2, 2.3, 8.3_

- [x] 6.2 Implement streaming response handling

  - Parse streaming response from API
  - Update UI progressively as text streams
  - Show typing indicator during streaming
  - Handle stream completion
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 6.3 Add error handling for chat submission

  - Display toast notifications for errors
  - Provide retry option on failure
  - Handle partial responses from interrupted streams
  - _Requirements: 8.1, 8.4, 4.5_

- [x] 7. Integrate chat bubble into main layout





  - Add ChatBubble to authenticated pages layout
  - Ensure proper z-index stacking
  - Test on homepage, account page, and portfolio page
  - _Requirements: 1.1, 1.4_

- [ ] 8. Add mobile optimizations
  - Test drawer layout on mobile devices
  - Ensure input stays above keyboard
  - Verify touch targets are appropriately sized
  - Test scrolling behavior on mobile
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 9. Implement welcome message and initial state
  - Create welcome message component for empty chat
  - Include educational disclaimer in welcome
  - Add suggested starter questions
  - _Requirements: 6.3, 2.1_

- [ ]* 10. Add video recommendation support
  - Parse video recommendations from AI responses
  - Render video links as interactive cards
  - Open videos in new tab
  - Style video recommendations distinctly
  - _Requirements: 7.1, 7.2, 7.3_

- [ ]* 11. Write integration tests for chat API
  - Test authenticated chat requests
  - Test message persistence
  - Test streaming response format
  - Test error scenarios
  - _Requirements: All_

- [ ]* 12. Write component tests
  - Test ChatInterface message submission
  - Test MessageList rendering and auto-scroll
  - Test MessageInput keyboard shortcuts
  - Test responsive layout switching
  - _Requirements: All_

- [ ] 13. Performance optimization and polish
  - Add loading skeletons for message history
  - Implement message list virtualization for long conversations
  - Add smooth animations for message appearance
  - Optimize re-renders with React.memo
  - _Requirements: 10.2, 10.3_
