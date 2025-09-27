import { sql } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  integer,
  boolean,
  uuid,
  json,
  primaryKey,
  index,
  uniqueIndex,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  phone: text("phone"),
  email: text("email").notNull(),
  emailVerified: boolean("email_verified").default(false),
  name: text("name"),
  image: text("image"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Sessions table - required by better-auth (singular name to match existing DB)
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

// Accounts table - required for OAuth (singular name to match existing DB)
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Verification table - required by better-auth
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// User profiles for onboarding data
export const userProfiles = pgTable(
  "user_profiles",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    experienceLevel: text("experience_level").notNull().default("beginner"),
    investmentObjectives: text("investment_objectives")
      .array()
      .default([]),
    riskTolerance: text("risk_tolerance").default("low"),
    completedOnboarding: boolean("completed_onboarding").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    experienceLevelIdx: index("user_profiles_experience_level_idx").on(
      table.experienceLevel
    ),
    completedOnboardingIdx: index("user_profiles_completed_onboarding_idx").on(
      table.completedOnboarding
    ),
  })
);

// Encrypted Binance API credentials
export const binanceCredentials = pgTable(
  "binance_credentials",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    apiKeyEncrypted: text("api_key_encrypted").notNull(),
    apiSecretEncrypted: text("api_secret_encrypted").notNull(),
    isActive: boolean("is_active").default(true),
    lastSync: timestamp("last_sync"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    isActiveIdx: index("binance_credentials_is_active_idx").on(table.isActive),
    lastSyncIdx: index("binance_credentials_last_sync_idx").on(table.lastSync),
  })
);

// Portfolio holdings
export const portfolioAssets = pgTable(
  "portfolio_assets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    symbol: text("symbol").notNull(),
    amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
    lastSync: timestamp("last_sync").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userSymbolIdx: uniqueIndex("portfolio_assets_user_symbol_idx").on(
      table.userId,
      table.symbol
    ),
    userIdIdx: index("portfolio_assets_user_id_idx").on(table.userId),
    symbolIdx: index("portfolio_assets_symbol_idx").on(table.symbol),
    lastSyncIdx: index("portfolio_assets_last_sync_idx").on(table.lastSync),
  })
);

// Chat message history
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

// Price cache for performance
export const priceCache = pgTable(
  "price_cache",
  {
    symbol: text("symbol").primaryKey(),
    price: decimal("price", { precision: 20, scale: 8 }).notNull(),
    change24h: decimal("change_24h", { precision: 20, scale: 8 }).notNull(),
    changePercent24h: decimal("change_percent_24h", {
      precision: 10,
      scale: 4,
    }).notNull(),
    lastUpdated: timestamp("last_updated").defaultNow(),
  },
  (table) => ({
    lastUpdatedIdx: index("price_cache_last_updated_idx").on(table.lastUpdated),
  })
);

// Note: Relations are commented out due to TypeScript compatibility issues with current Drizzle version
// The foreign key constraints in the schema provide the necessary database-level relationships
// Relations can be added back when using Drizzle queries if needed

// export const usersRelations = relations(users, ({ one, many }) => ({
//   profile: one(userProfiles),
//   binanceCredentials: one(binanceCredentials),
//   portfolioAssets: many(portfolioAssets),
//   chatMessages: many(chatMessages),
//   sessions: many(session),
//   accounts: many(account),
// }));

// export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
//   user: one(users, {
//     fields: [userProfiles.userId],
//     references: [users.id],
//   }),
// }));

// export const binanceCredentialsRelations = relations(
//   binanceCredentials,
//   ({ one }) => ({
//     user: one(users, {
//       fields: [binanceCredentials.userId],
//       references: [users.id],
//     }),
//   })
// );

// export const portfolioAssetsRelations = relations(
//   portfolioAssets,
//   ({ one }) => ({
//     user: one(users, {
//       fields: [portfolioAssets.userId],
//       references: [users.id],
//     }),
//   })
// );

// export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
//   user: one(users, {
//     fields: [chatMessages.userId],
//     references: [users.id],
//   }),
// }));

// export const sessionRelations = relations(session, ({ one }) => ({
//   user: one(users, {
//     fields: [session.userId],
//     references: [users.id],
//   }),
// }));

// export const accountRelations = relations(account, ({ one }) => ({
//   user: one(users, {
//     fields: [account.userId],
//     references: [users.id],
//   }),
// }));
