import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
import { env } from "@/env";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle({
	client: pool,
	// logger: true,
	casing: "snake_case",
	schema,
});
