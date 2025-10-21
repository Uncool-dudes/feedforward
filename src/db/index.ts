import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
import { env } from "@/env";

export const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
		ssl: false,
	},
	// logger: true,
	casing: "snake_case",
	schema,
});
