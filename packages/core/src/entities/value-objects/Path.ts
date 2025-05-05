import {
	type Exception,
	ValueObject,
	ok,
	type Result,
} from "@duplicate/shared";

type PathProps = {
	value: string;
};

export type PathExceptions = Exception;

export class Path extends ValueObject<PathProps> {
	public get value() {
		return this.props.value;
	}

	public static create(value: string): Result<Path, PathExceptions> {
		return ok(new Path({ value }));
	}

	public static restore(value: string): Path {
		return new Path({ value });
	}
}
