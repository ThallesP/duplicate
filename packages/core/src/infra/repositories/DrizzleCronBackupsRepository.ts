import type { CronBackup } from "../../entities/CronBackup.ts";
import { CronBackupsRepository } from "../../repositories/CronBackupsRepository.ts";
import { db, schemas } from "@duplicate/db";
import { CronBackupMapper } from "../mappers/CronBackupMapper.ts";

export class DrizzleCronBackupsRepository extends CronBackupsRepository {
	async create(cronBackup: CronBackup): Promise<void> {
		await db
			.insert(schemas.backups)
			.values(CronBackupMapper.toPersistence(cronBackup));
	}
}
