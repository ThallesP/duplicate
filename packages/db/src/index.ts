import "dotenv/config";
import * as schemas from "./schema.ts";
import { drizzle } from "drizzle-orm/bun-sqlite";

export const db = drizzle<typeof schemas>(`${import.meta.dir}/../data/app.db`);
export { schemas };
