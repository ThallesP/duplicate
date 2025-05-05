import { err, ok, type PromiseResult } from "@duplicate/shared";
import type { BackupExceptions } from "../entities/Backup.ts";
import { CronBackup } from "../entities/CronBackup.ts";
import { Path, type PathExceptions } from "../entities/value-objects/Path.ts";
import type { CronBackupsRepository } from "../repositories/CronBackupsRepository.ts";
import type { CronScheduler } from "../schedulers/CronScheduler.ts";

export type CreateCronBackupInput = {
	name: string;
	paths: string[];
	expression: string;
};

export type CreateCronBackupUseCaseOutput = {
	backup: CronBackup;
};

export type CreateCronBackupUseCaseExceptions =
	| BackupExceptions
	| PathExceptions;

export class CreateCronBackupUseCase {
	constructor(
		private readonly cronBackupsRepository: CronBackupsRepository,
		private readonly cronScheduler: CronScheduler,
	) {}

	public async execute({
		name,
		expression,
		paths,
	}: CreateCronBackupInput): PromiseResult<
		CreateCronBackupUseCaseOutput,
		CreateCronBackupUseCaseExceptions
	> {
		const pathsResult = paths
			.map((path) => Path.create(path))
			.filter((result) => result.isOk());

		const pathsExceptions = pathsResult.filter((result) => result.isErr());
		if (pathsExceptions.length !== 0 && pathsExceptions[0]?.value) {
			return err(pathsExceptions[0].value);
		}

		const backupResult = CronBackup.create({
			name,
			paths: pathsResult.map((result) => result.value),
			expression,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		if (backupResult.isErr()) {
			return err(backupResult.value);
		}

		const backup = backupResult.value;

		await this.cronBackupsRepository.create(backup);
		const cronSchedulerResult = await this.cronScheduler.schedule(backup);

		if (cronSchedulerResult.isErr()) {
			return err(cronSchedulerResult.value);
		}

		return ok({ backup });
	}
}
