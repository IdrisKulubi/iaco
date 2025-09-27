import * as schema from "./schema";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

// Get pool configuration from environment variables
const poolConfig = {
  connectionString: process.env.DATABASE_URL!,
  min: Number(process.env.DB_POOL_MIN || 5),
  max: Number(process.env.DB_POOL_MAX || 20),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT || 30000),
  connectionTimeoutMillis: 5000, // 5 seconds
  maxUses: 10000, // Number of times a connection can be used before being destroyed
};

// Create connection pool
const pool = new Pool(poolConfig);

// Create drizzle instance with the pool
const db = drizzle(pool, { schema });

// Export the db instance and pool for potential direct usage
export { pool };
export default db;
