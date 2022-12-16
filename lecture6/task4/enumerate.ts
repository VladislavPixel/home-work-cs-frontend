import type { TypeForElementsIterable } from "../types";

function enumerate<T extends Iterable<any>>(
	iterable: T
): IterableIterator<[number, TypeForElementsIterable<T> | undefined]> {
	let counter = 0;

	if (iterable === null || iterable === undefined) {
		throw new Error("The first argument of the take function must be iterable.");
	}

	if (iterable[Symbol.iterator] === undefined) {
		throw new Error(
			"An iterable entity must contain a method [Symbol.iterator] that returns an iterator."
		);
	}

	const iteratorIterable = iterable[Symbol.iterator]();

	return {
		/* eslint-disable */
		[Symbol.iterator](): IterableIterator<
			[number, TypeForElementsIterable<T> | undefined]
		> {
			return this;
		},
		/* eslint-enable */
		next(): { value: [number, TypeForElementsIterable<T> | undefined]; done: boolean } {
			const currentCounter = counter;

			const { value, done } = iteratorIterable.next();

			counter++;

			if (done) {
				return { value: [currentCounter, undefined], done: true };
			}

			return { value: [currentCounter, value], done: false };
		}
	};
}

export { enumerate };
