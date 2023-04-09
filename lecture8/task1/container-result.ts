import { IResult, FlatMapTypeResult } from "../types";

abstract class ResultStatic {
	static error<R>(data: R): Result<R> {
		return new Result(() => {
			const errorMessage = typeof data === "string"
				? data
				: String(data);

			throw new Error(errorMessage);
		});
	}
}

export class Result<T> extends ResultStatic implements IResult<T> {
	readonly error?: Error | undefined;

	readonly ok?: T;

	constructor(callback: () => T) {
		super();

		try {
			const result = callback();

			this.ok = result;
		} catch (err) {
			const correctTypeError = err as Error;

			this.error = correctTypeError;
		}
	}

	unwrap(): T {
		if (this.error !== undefined) {
			throw this.error;
		}

		return this.ok!;
	}

	map<R>(callback: (data: T) => R): Result<R> {
		return new Result(() => {
			if (this.error !== undefined) {
				throw this.error;
			}

			return callback(this.ok!);
		});
	}

	flatMap<R>(callback: (data: T) => R): Result<FlatMapTypeResult<R>> {
		return new Result(() => {
			if (this.error !== undefined) {
				throw this.error;
			}

			try {
				const result = callback(this.ok!);

				if (result instanceof Result) {
					if (result.error) {
						throw result.error;
					}

					return result.unwrap();
				} else {
					return result;
				}
			} catch (err) {
				throw err;
			}
		});
	}

	catch<R>(callback: (err: Error) => R): Result<T> {
		return new Result(() => {
			if (this.error !== undefined) {
				try {
					const resultErr = callback(this.error);

					if (resultErr === undefined) {
						throw this.error;
					}

					throw resultErr;
				} catch (err) {
					throw err;
				}
			}

			return this.ok!;
		});
	}

	then<R>(callback: (data: T) => R): Result<R> {
		return new Result(() => {
			if (this.error) {
				throw this.error;
			}

			try {
				const result = callback(this.ok!);

				if (result instanceof Result) {
					if (result.error) {
						throw result.error;
					}

					return result.unwrap();
				} else {
					return result;
				}
			} catch (err) {
				throw err;
			}
		});
	}
}
