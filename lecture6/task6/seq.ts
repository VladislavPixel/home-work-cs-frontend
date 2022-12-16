import type { TypeForElementsArrayIterable } from "../types";

function seq<T extends Array<Iterable<any>>>(
	...arrayOfIterableElements: T
): IterableIterator<TypeForElementsArrayIterable<T> | undefined> {
	let index = 0;

	let targetIterable = arrayOfIterableElements[index];

	if (targetIterable === undefined || targetIterable === null) {
		throw new Error(
			"Pass an iterable structure or a set of such iterable structures to the function."
		);
	}

	if (targetIterable[Symbol.iterator] === undefined) {
		throw new Error("You have passed a structure that cannot be iterated.");
	}

	let targetIterator = targetIterable[Symbol.iterator]();

	return {
		[Symbol.iterator](): IterableIterator<TypeForElementsArrayIterable<T> | undefined> {
			return this;
		},
		next(): { done: boolean; value: TypeForElementsArrayIterable<T> | undefined } {
			const { value, done } = targetIterator.next();

			if (done) {
				index++;

				for (let m = index; m < arrayOfIterableElements.length; m++) {
					targetIterable = arrayOfIterableElements[m];

					if (targetIterable === undefined) {
						return { value: undefined, done: true };
					}

					if (targetIterable === null || targetIterable[Symbol.iterator] === undefined) {
						throw new Error("You have passed a structure that cannot be iterated.");
					}

					targetIterator = targetIterable[Symbol.iterator]();

					const { value, done } = targetIterator.next();

					if (!done) {
						return { value, done: false };
					}

					index++;
				}

				return { value: undefined, done: true };
			}

			return { value, done: false };
		}
	};
}

export { seq };
