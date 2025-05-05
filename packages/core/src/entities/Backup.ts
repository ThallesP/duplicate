import { AggregateRoot, type Exception } from "@duplicate/shared";
import type { Path } from "./value-objects/Path.ts";

export type BackupProps = {
	name: string;
	paths: Path[];
	createdAt: Date;
	updatedAt: Date | null;
};

export type BackupExceptions = Exception;

export abstract class Backup<
	Props extends BackupProps,
> extends AggregateRoot<Props> {
	public get paths() {
		return this.props.paths;
	}

	public get name() {
		return this.props.name;
	}

	public addPath(path: Path) {
		const pathAlreadyExists = this.props.paths.some((p) => p.equals(path));

		if (pathAlreadyExists) {
			return;
		}

		this.props.paths.push(path);
	}

	public removePath(path: Path) {
		this.props.paths = this.props.paths.filter((p) => !p.equals(path));
	}

	public get createdAt() {
		return this.props.createdAt;
	}

	public get updatedAt() {
		return this.props.updatedAt;
	}
}
