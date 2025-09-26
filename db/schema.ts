import { relations, sql } from "drizzle-orm";
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
  userId: text("user_id").references(() => users.id).notNull(),
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
  userId: text("user_id").references(() => users.id).notNull(),
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
