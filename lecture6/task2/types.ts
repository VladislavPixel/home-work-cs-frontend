export interface IIterator {
	[Symbol.iterator](): IIterator;
	next(): { value: undefined | number; done: boolean };
}
