import { UniqueEntityID } from "@duplicate/shared";
import { CronBackup } from "../../entities/CronBackup.ts";
import type { schemas } from "@duplicate/db";
import { PathMapper } from "./PathMapper.ts";
export class CronBackupMapper {
	public static toPersistence({
		id,
		name,
		paths,
		createdAt,
		updatedAt,
		expression,
	}: CronBackup): typeof schemas.backups.$inferInsert {
		return {
			id: id.toString(),
			name,
			type: "cron",
			expression,
			paths: paths.map(PathMapper.toPersistence),
			createdAt,
			updatedAt,
		};
	}

	public static toDomain({
		id,
		name,
		paths,
		createdAt,
		updatedAt,
		expression,
	}: typeof schemas.backups.$inferSelect): CronBackup {
		return CronBackup.restore(
			{
				name,
				paths: paths.map(PathMapper.toDomain),
				createdAt,
				updatedAt,
				expression: expression as string,
			},
			new UniqueEntityID(id),
		);
	}
}
