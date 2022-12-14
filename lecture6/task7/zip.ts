import type { IterableElementsType } from "../types";

function zip<T extends Iterable<any>>(...arrayIterables: T[]): IterableIterator<undefined | Array<IterableElementsType<T>>> {
	const externalIterator = arrayIterables[Symbol.iterator]();

	const arrayForIterators: Array<IterableIterator<undefined | IterableElementsType<T>>> = [];

	let tuple: Array<IterableElementsType<T>> = [];

	let index = 0;

	function reset(): void {
		tuple = [];

		index = 0;
	}

	return {
		[Symbol.iterator](): IterableIterator<undefined | Array<IterableElementsType<T>>> {
			return this;
		},
		next(): IteratorResult<undefined | Array<IterableElementsType<T>>> {
			for (let m = 0; m < arrayIterables.length; m++) {
				if (arrayForIterators[index] === undefined) {
					const { value } = externalIterator.next();

					if (value === null || value === undefined) {
						throw new Error("Pass an iterable structure or a set of such iterable structures to the function.");
					}

					if (value[Symbol.iterator] === undefined) {
						throw new Error("You have passed a structure that cannot be iterated.");
					}

					arrayForIterators[index] = value[Symbol.iterator]();
				}

				const { value, done } = arrayForIterators[index].next();

				if (index === 0 && done) {
					return { value: undefined, done: true };
				}

				tuple.push(value);

				index++;
			}

			const saveTuple = tuple;

			reset();

			return { value: saveTuple, done: false };
		}
	};
};

export { zip };
