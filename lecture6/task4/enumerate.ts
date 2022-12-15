import type { TypeForElementsIterable } from "../types";

function enumerate<T extends Iterable<any>>(iterable: T): IterableIterator<[number, TypeForElementsIterable<T>]> {
	let counter = 0;

	if (iterable === null || iterable === undefined) {
		throw new Error("The first argument of the take function must be iterable.");
	}

	if (iterable[Symbol.iterator] === undefined) {
		throw new Error("An iterable entity must contain a method [Symbol.iterator] that returns an iterator.");
	}

	const iteratorIterable = iterable[Symbol.iterator]();

	return {
		[Symbol.iterator](): IterableIterator<[number, TypeForElementsIterable<T>]> {
			return this;
		},
		next(): { value: [number, TypeForElementsIterable<T>]; done: false } {
			const currentCounter = counter;

			const currentValueForIterable = iteratorIterable.next().value;

			counter++;

			return { value: [currentCounter, currentValueForIterable], done: false };
		}
	};
}

export { enumerate };
