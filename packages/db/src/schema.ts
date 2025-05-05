import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export type PathsColumn = {
	path: string;
}[];

export const backups = sqliteTable("backups", {
	id: text("id").primaryKey(),
	type: text("type", { enum: ["cron"] }).notNull(),
	name: text("name").notNull(),
	paths: text("paths", { mode: "json" }).$type<PathsColumn>().notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }),

	// cron specific fields
	expression: text("expression"),
});
