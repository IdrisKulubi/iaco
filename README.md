# IACO - AI Crypto Assistant for Beginners

An intelligent cryptocurrency assistant designed to help beginners learn, track portfolios, and get personalized guidance through AI-powered conversations.

## 🚀 Features

- **AI-Powered Chat Assistant**: Get educational guidance and crypto insights through conversational AI
- **Portfolio Tracking**: Connect Binance API to track your cryptocurrency holdings
- **User Onboarding**: Personalized experience based on investment goals and risk tolerance  
- **Google Authentication**: Secure login with Google OAuth via Better Auth
- **Real-time Price Data**: Live cryptocurrency prices and market data
- **Dark/Light Mode**: Toggle between themes for optimal viewing experience
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with Google OAuth
- **AI**: Vercel AI SDK (OpenAI/Mistral/Anthropic)
- **Exchange Integration**: Binance API
- **UI Components**: Radix UI with shadcn/ui
- **Hosting**: Vercel
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Neon Database account
- Google OAuth credentials
- Binance API credentials (optional, for portfolio tracking)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/IdrisKulubi/iaco.git
   cd iaco
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="your_neon_database_url"
   
   # Better Auth
   BETTER_AUTH_SECRET="your_auth_secret"
   BETTER_AUTH_BASE_URL="http://localhost:3000"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   
   # AI (choose one)
   OPENAI_API_KEY="your_openai_key"
   # MISTRAL_API_KEY="your_mistral_key"
   # ANTHROPIC_API_KEY="your_anthropic_key"
   
   # Binance API (optional)
   BINANCE_API_KEY="your_binance_api_key"
   BINANCE_SECRET_KEY="your_binance_secret_key"
   ```

4. **Set up the database**

   ```bash
   # Generate database migrations
   pnpm drizzle-kit generate
   
   # Apply migrations
   pnpm drizzle-kit migrate
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```text
iaco/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   ├── onboarding/        # User onboarding flow
│   │   └── ...
│   ├── components/            # Reusable UI components
│   │   ├── themes/            # Theme-related components
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utilities, auth, and services
├── db/                        # Database schema and config
├── drizzle/                   # Database migrations
├── public/                    # Static assets
└── tests/                     # Test files
```

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: User accounts with authentication data
- **userProfiles**: Onboarding data and preferences
- **binanceCredentials**: Encrypted API credentials
- **portfolioAssets**: User's cryptocurrency holdings
- **chatMessages**: AI conversation history
- **priceCache**: Cached cryptocurrency prices

## 🤖 AI Assistant Features

The AI assistant provides:

- Educational content about cryptocurrency
- Portfolio analysis and insights
- Market trend explanations
- Risk assessment guidance
- Beginner-friendly explanations
- **Important**: Not financial advice - educational purposes only

## 🔐 Security Features

- Encrypted API credentials storage
- Secure authentication with Better Auth
- Environment variable protection
- Database security with Neon
- Read-only Binance API integration


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for educational purposes only. The AI assistant provides educational content about cryptocurrency but does not provide financial advice. Always do your own research and consult with financial professionals before making investment decisions.

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/IdrisKulubi/iaco/issues) section
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the problem

## 🗺️ Roadmap

- [ ] Advanced portfolio analytics
- [ ] Multi-exchange support (Coinbase, Kraken)
- [ ] Mobile app with React Native
- [ ] Advanced AI features with custom models
- [ ] Social features and community
- [ ] Educational content library
- [ ] Automated portfolio rebalancing suggestions
