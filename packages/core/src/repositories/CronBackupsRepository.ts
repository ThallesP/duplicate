import type { CronBackup } from "../entities/CronBackup.ts";

export abstract class CronBackupsRepository {
	abstract create(cronBackup: CronBackup): Promise<void>;
}
