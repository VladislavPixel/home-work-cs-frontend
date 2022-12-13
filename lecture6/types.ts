export interface IIterator<T = undefined | number> {
	[Symbol.iterator](): IIterator<T>;
	next(): { value: T; done: boolean };
}

export type TypeFnPredicate = (el: unknown) => boolean;

export interface IMyRange<T = unknown> {
	borderLeft: T;
	borderRight: T;
	getConfigSameTypes(): { status: boolean; type: string };
	isValidData(status: boolean, type: string): boolean;
	[Symbol.iterator](): IIteratorForRange<T>;
	reverse(): IIteratorForRange<T>;
}

export interface IIteratorForRange<T> {
	borderLeft: T;
	borderRight: T;
	[Symbol.iterator](): IIteratorForRange<T>;
	next(): { value: T | undefined; done: boolean };
}

export interface IIterable<T = any> {
	[Symbol.iterator](): IIterator<T>;
	[key: PropertyKey]: unknown;
}
