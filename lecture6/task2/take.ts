import type { TypeForElementsIterable } from "../types";

function take<T extends Iterable<any>>(
	iterable: T,
	counter: number
): IterableIterator<TypeForElementsIterable<T> | undefined> {
	let currentStateCounter: number = counter;

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
		[Symbol.iterator](): IterableIterator<TypeForElementsIterable<T> | undefined> {
			return this;
		},
		next(): { value: undefined | TypeForElementsIterable<T>; done: boolean } {
			currentStateCounter--;

			if (currentStateCounter < 0) {
				return { value: undefined, done: true };
			}

			const currentValueForIterable = iteratorIterable.next().value;

			return { value: currentValueForIterable, done: false };
		}
	};
}

export { take };
