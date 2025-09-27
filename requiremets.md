# Requirements: AI Crypto Assistant for Beginners

## 1. Project Overview
We are building an **AI Crypto Assistant** for Beginners. This application is designed to help new crypto investors learn, track their portfolios, and get guidance from an AI coach.

* **Frontend**: Next.js (SSR, PWA) hosted on Vercel.
* **Backend**: API routes within Next.js (no separate server).
* **Database**: Neon (Postgres) with Drizzle ORM.
* **Authentication**: BetterAuth (Google OAuth for MVP).
* **AI**: Vercel AI SDK (OpenAI/Mistral/Anthropic models).
* **Exchange Integration**: Binance API (public prices + user portfolio read-only).
* **Hosting**: Vercel.

---

## 2. Core MVP Features

### 2.1 Authentication & Onboarding
* Google Login only (via BetterAuth).
* User profile stored in Neon DB.
* Onboarding questions to personalize the AI coach and recommendations.

### 2.2 Conversational AI Chat
* Powered by the Vercel AI SDK.
* System prompt: "CryptoCoach" (educational, not financial advice).
* **Features**:
    * Simple explanations of crypto concepts (e.g., staking, stablecoins).
    * Disclaimer banner: "Educational purposes only."
    * Curated video resources from a JSON catalog.
    * Streaming responses in the chat UI.

### 2.3 Homepage
* Portfolio overview: total balance, distribution, and alerts.
* Live crypto prices from the Binance public API.
* Alerts for price changes (e.g., BTC down 5%).
* Non-binding educational recommendations.
* A floating chat bubble to access the AI coach.

### 2.4 Portfolio Page
* Detailed breakdown per crypto asset (amount, value, 24-hour change).
* Data sourced from the Binance API.
* Clean UI with a list view and optional pie chart.

### 2.5 Binance API Integration
* Read-only API key input by the user.
* Keys stored encrypted in the DB.
* Balances synced every ~30 seconds.
* Option to disconnect the Binance account.
* Error handling for invalid keys or network issues.

---

## 3. Non-MVP Features (Future Roadmap)
* Auto-trading ("Autopilot mode").
* Advanced video lessons and gamification.
* Multimodal support (images, graphs).
* RAG integration for a comprehensive glossary/knowledge base.
* Notifications and alerts (email/push).

---

## 4. Technical Stack
* **Frontend/Backend**: Next.js 15.
* **Database**: Neon (Postgres) with Drizzle ORM.
* **Authentication**: BetterAuth.
* **AI**: Vercel AI SDK.
* **API Integration**: Axios + SWR.
* **Styling**: TailwindCSS, shadcn/ui, lucide-react.

---

## 5. Data Model (Simplified)

* **`Users` Table**
    * `id` (UUID, PK)
    * `email` (unique)
    * `name`
    * `created_at`
    * `last_login`

* **`Profiles` Table**
    * `user_id` (FK)
    * `level` (beginner / intermediate)
    * `objective` (learn / invest / diversify)

* **`Portfolios` Table**
    * `user_id` (FK)
    * `crypto_symbol`
    * `amount`
    * `last_synced`

* **`BinanceKeys` Table**
    * `user_id` (FK)
    * `api_key` (encrypted)
    * `api_secret` (encrypted)

---

## 6. Environment Variables
```ini
DATABASE_URL=postgresql://user:pass@neon.tech/db?sslmode=require
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
AUTH_SECRET=xxxx
AI_API_KEY=xxxx