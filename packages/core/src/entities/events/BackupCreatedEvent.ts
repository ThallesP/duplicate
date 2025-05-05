import type { CronBackup } from "../CronBackup.ts";
import type { DomainEvent, UniqueEntityID } from "@duplicate/shared";

export class BackupCreatedEvent implements DomainEvent {
	ocurredAt: Date;
	constructor(public readonly backup: CronBackup) {
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueEntityID {
		return this.backup.id;
	}
}
