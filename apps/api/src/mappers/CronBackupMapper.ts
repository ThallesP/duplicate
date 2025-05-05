import type { CronBackup } from "@duplicate/core/src/entities/CronBackup";

export class CronBackupMapper {
	public static toDomain({
		id,
		expression,
		name,
		paths,
		updatedAt,
		createdAt,
	}: CronBackup) {
		return {
			id: id.toString(),
			expression,
			name,
			paths,
			updatedAt: updatedAt?.toISOString() ?? null,
			createdAt: createdAt.toISOString(),
		};
	}
}
