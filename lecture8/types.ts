export type FlatMapTypeResult<R> = R extends IResult<infer T> ? T : R;

export interface IResult<T> {
	readonly error?: Error | undefined;
	readonly ok?: T;
	unwrap(): T;
	map<R>(callback: (data: T) => R): IResult<R>;
	flatMap<R>(callback: (data: T) => R): IResult<FlatMapTypeResult<R>>;
	catch<R>(callback: (err: Error) => R): IResult<T>;
	then<R>(callback: (data: T) => R): IResult<R>;
};
