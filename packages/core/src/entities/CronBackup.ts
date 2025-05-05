import {
	ok,
	type UniqueEntityID,
	type Exception,
	type Result,
} from "@duplicate/shared";
import type { Path } from "./value-objects/Path.ts";
import { Backup } from "./Backup.ts";
import { BackupCreatedEvent } from "./events/BackupCreatedEvent.ts";

export type CronBackupProps = {
	name: string;
	paths: Path[];
	expression: string;
	createdAt: Date;
	updatedAt: Date | null;
};

export type CronBackupExceptions = Exception;

export class CronBackup extends Backup<CronBackupProps> {
	public get expression(): string {
		return this.props.expression;
	}

	public static create(
		props: CronBackupProps,
	): Result<CronBackup, CronBackupExceptions> {
		const cronBackup = new CronBackup(props);

		cronBackup.addDomainEvent(new BackupCreatedEvent(cronBackup));

		return ok(cronBackup);
	}

	public static restore(
		props: CronBackupProps,
		id: UniqueEntityID,
	): CronBackup {
		return new CronBackup(props, id);
	}
}
