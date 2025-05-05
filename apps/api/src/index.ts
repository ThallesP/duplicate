import { Elysia } from "elysia";
import { HTTPException } from "@duplicate/shared";
import { createCronBackupController } from "./controllers/CreateCronBackupController";

const app = new Elysia({ prefix: "/api" })
	.onError(({ code, error, set }) => {
		console.log(error);
		if (error instanceof HTTPException) {
			set.status = error.statusCode;
			return {
				message: error.message,
				code: error.code,
			};
		}

		if (code === "VALIDATION") {
			set.status = 400;
			return {
				message: "Validation error",
				code: "VALIDATION_ERROR",
				errors: error.all,
			};
		}

		set.status = 500;
		return {
			message: "Internal server error",
			code: "INTERNAL_SERVER_ERROR",
		};
	})
	.use(createCronBackupController)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
