import type { Config } from "drizzle-kit";

/**
 * This file defines the `drizzle-kit` configuration.
 *
 * Use it to run migrations or generate type definitions.
 */

const DB_URL = process.env.TURSO_DB_URL;
const DB_AUTH_TOKEN = process.env.TURSO_DB_AUTH_TOKEN;

export default {
  schema: "./src/db/db.schema.ts",
  out: "./src/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: DB_URL,
    authToken: DB_AUTH_TOKEN,
  },
} satisfies Config;
