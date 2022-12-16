import type { TypeForElementsIterable, TypeFnPredicate } from "../types";

function filter<T extends Iterable<any>>(
	iterable: T,
	callback: TypeFnPredicate<T>
): IterableIterator<undefined | TypeForElementsIterable<T>> {
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
		[Symbol.iterator](): IterableIterator<undefined | TypeForElementsIterable<T>> {
			return this;
		},
		next(): { value: undefined | TypeForElementsIterable<T>; done: boolean } {
			const result = iteratorIterable.next();

			if (result.done) {
				return { value: undefined, done: true };
			}

			let currentValueForIterable = result.value;

			while (!callback(currentValueForIterable)) {
				const { value, done } = iteratorIterable.next();

				if (done) {
					return { value: undefined, done: true };
				}

				currentValueForIterable = value;
			}

			return { value: currentValueForIterable, done: false };
		}
	};
}

export { filter };
