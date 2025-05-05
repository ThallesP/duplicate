import type { CronBackup } from "../entities/CronBackup.ts";
import type { Exception, PromiseResult } from "@duplicate/shared";

export type CronSchedulerExceptions = Exception;

export abstract class CronScheduler {
	abstract schedule(
		backup: CronBackup,
	): PromiseResult<void, CronSchedulerExceptions>;
}
