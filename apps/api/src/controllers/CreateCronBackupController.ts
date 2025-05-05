import {
	CreateCronBackupUseCase,
	DrizzleCronBackupsRepository,
} from "@duplicate/core";
import type { CronScheduler } from "@duplicate/core/src/schedulers/CronScheduler";
import Elysia, { t } from "elysia";
import { CronBackupMapper } from "../mappers/CronBackupMapper";

export const createCronBackupController = new Elysia()
	.decorate(
		"createCronBackupUseCase",
		new CreateCronBackupUseCase(
			new DrizzleCronBackupsRepository(),
			{} as CronScheduler,
		),
	)
	.post(
		"/backups",
		async ({ body, createCronBackupUseCase }) => {
			const result = await createCronBackupUseCase.execute({
				name: body.name,
				paths: body.paths,
				expression: body.expression,
			});

			return {
				backup: CronBackupMapper.toDomain(result.unwrap().backup),
			};
		},
		{
			body: t.Object({
				name: t.String(),
				paths: t.Array(t.String()),
				expression: t.String(),
			}),
		},
	);
