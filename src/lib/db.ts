import "server-only";
import postgres from "postgres";
import { env } from "./env";

declare global {
  var __sql: postgres.Sql | undefined;
}

// One shared connection pool per server instance. `prepare: false` keeps it
// compatible with Supabase's transaction pooler (port 6543).
export function sql(): postgres.Sql {
  globalThis.__sql ??= postgres(env.databaseUrl(), { prepare: false, max: 5 });
  return globalThis.__sql;
}
