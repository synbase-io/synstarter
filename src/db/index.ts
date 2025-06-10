import { SessionTable, UserTable } from "@/db/db.schema";
import { success } from "@/log";
import { logger } from "@it-astro:logger";
import { createClient } from "@libsql/client";
import { TURSO_DB_AUTH_TOKEN, TURSO_DB_URL } from "astro:env/server";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

export const connection = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_AUTH_TOKEN,
});

export type DB = LibSQLDatabase<{
    User: typeof UserTable;
    Session: typeof SessionTable;
}>;

/**
 * The primary database client of the app.
 */
export const db: DB = drizzle(connection, {
    schema: {
        User: UserTable,
        Session: SessionTable,
    },
});

success(logger, "Database connected");
