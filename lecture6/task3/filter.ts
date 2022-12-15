import type { TypeForElementsIterable, TypeFnPredicate } from "../types";

function filter<T extends Iterable<any>>(
	iterable: T,
	callback: TypeFnPredicate<T>
): IterableIterator<TypeForElementsIterable<T>> {
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
		[Symbol.iterator](): IterableIterator<TypeForElementsIterable<T>> {
			return this;
		},
		next(): { value: TypeForElementsIterable<T>; done: false } {
			let currentValueForIterable = iteratorIterable.next().value;

			while (!callback(currentValueForIterable)) {
				currentValueForIterable = iteratorIterable.next().value;
			}

			return { value: currentValueForIterable, done: false };
		}
	};
}

export { filter };
