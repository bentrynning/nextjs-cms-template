import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/libsql/migrator";

const client = createClient({
  url: process.env.DATABASE_URL ?? "file:local.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

client.execute("PRAGMA journal_mode = WAL;");
client.execute("PRAGMA synchronous = NORMAL;");
client.execute("PRAGMA cache_size = -100000;");
client.execute("PRAGMA foreign_keys = true;");
client.execute("PRAGMA temp_store = memory;");
// Retry writes for up to 5 s before erroring when the DB is locked under concurrency
client.execute("PRAGMA busy_timeout = 5000;");

export const db = drizzle(client, { schema });

migrate(db, { migrationsFolder: "./drizzle" });
