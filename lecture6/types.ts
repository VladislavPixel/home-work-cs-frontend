export type TypeFnPredicate<T extends Iterable<any>> = (el: IterableElementsType<T>) => boolean;

export type IterableElementsType<T extends Iterable<any>> = T extends Iterable<infer H> ? H : unknown;

export interface IMyRange<T = unknown> {
	borderLeft: T;
	borderRight: T;
	getConfigSameTypes(): { status: boolean; type: string };
	isValidData(status: boolean, type: string): void;
	[Symbol.iterator](): IIteratorForRange<T>;
	reverse(): IIteratorForRange<T>;
}

export interface IIteratorForRange<T> {
	borderLeft: T;
	borderRight: T;
	[Symbol.iterator](): IIteratorForRange<T>;
	next(): { value: T | undefined; done: boolean };
}
