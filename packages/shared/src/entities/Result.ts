export class Err<O, E extends Error> {
	readonly value: E;

	constructor(value: E) {
		this.value = value;
	}

	isOk(): this is Ok<O, E> {
		return false;
	}

	isErr(): this is Err<O, E> {
		return true;
	}

	unwrap(): never {
		throw this.value;
	}

	unwrapOr<T>(defaultValue: T): T {
		return defaultValue;
	}
}

export class Ok<O, E extends Error> {
	readonly value: O;

	constructor(value: O) {
		this.value = value;
	}

	isOk(): this is Ok<O, E> {
		return true;
	}

	isErr(): this is Err<O, E> {
		return false;
	}

	unwrap(): O {
		return this.value;
	}

	unwrapOr<T>(_defaultValue: T): O {
		return this.value;
	}
}

/**
 * A type that represents a result of a computation.
 * It can be either an `Ok` or an `Err`.
 *
 * @template O The type of the value if the computation is successful.
 * @template E The type of the error if the computation fails.
 */
export type Result<O, E extends Error> = Ok<O, E> | Err<O, E>;

/**
 * A type that represents a result of a computation that returns a promise.
 * It can be either an `Ok` or an `Err`.
 *
 * @template O The type of the value if the computation is successful.
 * @template E The type of the error if the computation fails.
 */
export type PromiseResult<O, E extends Error> = Promise<Result<O, E>>;

/**
 * Creates a new `Ok` result with the given value.
 *
 * @param value The value to wrap in the `Ok` result.
 * @returns A new `Ok` result with the given value.
 */
export const ok = <O, E extends Error>(value: O): Result<O, E> => {
	return new Ok(value);
};

/**
 * Creates a new `Err` result with the given value.
 *
 * @param value The value to wrap in the `Err` result.
 * @returns A new `Err` result with the given value.
 */
export const err = <O, E extends Error>(value: E): Result<O, E> => {
	return new Err(value);
};

/**
 * Extracts the error types from a function that returns a Result or PromiseResult
 *
 * @param function The function to extract the Error types
 * @returns The Error types from the Result or PromiseResult
 */
export type ExtractError<
	F extends (
		...args: unknown[]
	) => Result<unknown, Error> | PromiseResult<unknown, Error>,
> = ReturnType<F> extends Result<unknown, infer E1>
	? E1
	: ReturnType<F> extends PromiseResult<unknown, infer E2>
		? E2
		: never;
