# Requirements Document: AI Crypto Chat Assistant

## Introduction

The AI Crypto Chat Assistant (CryptoCoach) is an educational conversational interface that helps beginner crypto investors understand concepts, get personalized guidance, and access curated learning resources. The assistant uses the Vercel AI SDK to provide streaming responses with a focus on education rather than financial advice.

## Glossary

- **CryptoCoach**: The AI assistant system that provides educational crypto guidance
- **Chat Interface**: The user-facing conversational UI component
- **System Prompt**: The foundational instructions that define the AI's behavior and personality
- **Streaming Response**: Real-time text generation displayed progressively to the user
- **Message History**: The persistent record of user-assistant conversations stored in the database
- **Educational Disclaimer**: A visible notice that clarifies the assistant provides education, not financial advice
- **Video Catalog**: A curated JSON collection of educational crypto video resources
- **Chat Bubble**: A floating UI element that provides quick access to the chat interface
- **Context Window**: The amount of conversation history included in each AI request

## Requirements

### Requirement 1: Chat Interface Access

**User Story:** As a beginner crypto investor, I want to easily access the AI chat assistant from anywhere in the application, so that I can get help whenever I need it.

#### Acceptance Criteria

1. WHEN the user is authenticated, THE Chat Interface SHALL display a floating chat bubble on all authenticated pages
2. WHEN the user clicks the chat bubble, THE Chat Interface SHALL open a chat dialog or drawer
3. THE Chat Interface SHALL provide a close button to dismiss the chat view
4. WHEN the user navigates between pages, THE Chat Interface SHALL maintain the current conversation state
5. THE Chat Interface SHALL display a clear title identifying it as "CryptoCoach" or similar

### Requirement 2: Message Display and Input

**User Story:** As a user, I want to see my conversation history and type new messages, so that I can have a natural back-and-forth dialogue with the assistant.

#### Acceptance Criteria

1. THE Chat Interface SHALL display all messages in chronological order with user messages and assistant messages visually distinguished
2. WHEN the user types a message, THE Chat Interface SHALL provide a text input field with a send button
3. WHEN the user presses Enter in the input field, THE Chat Interface SHALL submit the message
4. THE Chat Interface SHALL disable the input field and send button while a response is being generated
5. THE Chat Interface SHALL display a loading indicator when the assistant is generating a response
6. WHEN the message history exceeds the visible area, THE Chat Interface SHALL provide scrolling with auto-scroll to the latest message

### Requirement 3: AI Response Generation

**User Story:** As a user, I want to receive helpful educational responses from the AI assistant, so that I can learn about crypto concepts and get personalized guidance.

#### Acceptance Criteria

1. WHEN the user sends a message, THE CryptoCoach SHALL generate a response using the Vercel AI SDK
2. THE CryptoCoach SHALL use a system prompt that defines its role as an educational assistant for crypto beginners
3. THE CryptoCoach SHALL include the user's profile data (experience level, objectives, risk tolerance) in the context
4. THE CryptoCoach SHALL avoid providing specific financial advice or investment recommendations
5. THE CryptoCoach SHALL respond in a friendly, supportive, and educational tone
6. WHEN generating responses, THE CryptoCoach SHALL include the last 20 messages from the conversation history as context

### Requirement 4: Streaming Response Display

**User Story:** As a user, I want to see the AI's response appear in real-time as it's being generated, so that I get immediate feedback and a more engaging experience.

#### Acceptance Criteria

1. WHEN the assistant generates a response, THE Chat Interface SHALL display the text progressively as it streams
2. THE Chat Interface SHALL render markdown formatting in assistant responses (bold, italic, lists, code blocks)
3. WHEN streaming is in progress, THE Chat Interface SHALL display a typing indicator or cursor
4. WHEN streaming completes, THE Chat Interface SHALL mark the message as complete
5. IF streaming fails or is interrupted, THE Chat Interface SHALL display an error message and allow the user to retry

### Requirement 5: Message Persistence

**User Story:** As a user, I want my conversation history to be saved, so that I can continue previous conversations and review past advice.

#### Acceptance Criteria

1. WHEN the user sends a message, THE CryptoCoach SHALL save the message to the chat_messages table with role "user"
2. WHEN the assistant completes a response, THE CryptoCoach SHALL save the response to the chat_messages table with role "assistant"
3. WHEN the user opens the chat interface, THE Chat Interface SHALL load and display the user's message history from the database
4. THE CryptoCoach SHALL order messages by creation timestamp in ascending order
5. THE CryptoCoach SHALL associate all messages with the authenticated user's ID

### Requirement 6: Educational Disclaimer

**User Story:** As a user, I want to understand that the assistant provides educational content and not financial advice, so that I can use the information appropriately.

#### Acceptance Criteria

1. THE Chat Interface SHALL display a visible disclaimer banner stating "Educational purposes only. Not financial advice."
2. THE Chat Interface SHALL position the disclaimer prominently near the top of the chat interface
3. WHEN the user first opens the chat, THE Chat Interface SHALL display a welcome message that includes the educational disclaimer
4. THE CryptoCoach SHALL include disclaimer language in its system prompt to reinforce educational focus

### Requirement 7: Video Resource Recommendations

**User Story:** As a user, I want the assistant to recommend relevant educational videos, so that I can learn through multiple formats.

#### Acceptance Criteria

1. WHEN appropriate for the conversation context, THE CryptoCoach SHALL recommend educational videos from the video catalog
2. THE CryptoCoach SHALL format video recommendations with title, description, and clickable link
3. THE Chat Interface SHALL render video links as interactive elements that open in a new tab
4. THE CryptoCoach SHALL access video metadata from a JSON catalog file
5. THE CryptoCoach SHALL recommend videos that match the user's experience level and current topic

### Requirement 8: Error Handling

**User Story:** As a user, I want to receive clear feedback when something goes wrong, so that I know what happened and can try again.

#### Acceptance Criteria

1. IF the AI API request fails, THE Chat Interface SHALL display an error message explaining the issue
2. IF the database save operation fails, THE CryptoCoach SHALL log the error and notify the user
3. IF the user's session expires during chat, THE Chat Interface SHALL prompt the user to sign in again
4. WHEN an error occurs, THE Chat Interface SHALL provide a retry button or clear next action
5. THE CryptoCoach SHALL handle rate limiting gracefully with appropriate user messaging

### Requirement 9: Mobile Responsiveness

**User Story:** As a mobile user, I want the chat interface to work well on my phone, so that I can get help on the go.

#### Acceptance Criteria

1. THE Chat Interface SHALL adapt its layout for mobile screen sizes (below 768px width)
2. WHEN on mobile, THE Chat Interface SHALL use a full-screen or bottom-sheet drawer layout
3. THE Chat Interface SHALL ensure the input field remains accessible above the mobile keyboard
4. THE Chat Interface SHALL provide touch-friendly tap targets for all interactive elements
5. THE Chat Interface SHALL maintain readability with appropriate font sizes and spacing on mobile devices

### Requirement 10: Performance and Context Management

**User Story:** As a user, I want the chat to respond quickly and efficiently, so that I have a smooth conversational experience.

#### Acceptance Criteria

1. THE CryptoCoach SHALL limit the context window to the most recent 20 messages to optimize API performance
2. THE Chat Interface SHALL implement optimistic UI updates showing user messages immediately
3. THE CryptoCoach SHALL use streaming to reduce perceived latency
4. THE Chat Interface SHALL lazy-load older messages if the conversation history is very long
5. THE CryptoCoach SHALL cache the system prompt and user profile data to avoid redundant database queries
