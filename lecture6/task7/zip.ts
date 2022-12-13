import type { IIterator } from "../types";

function zip(...arrayIterables: unknown[]): IIterator<undefined | unknown[]> {
	const externalIterator = arrayIterables[Symbol.iterator]();

	const arrayForIterators: Array<IIterator<undefined | unknown>> = [];

	let tuple: unknown[] = [];

	let index = 0;

	function reset(): void {
		tuple = [];

		index = 0;
	}

	return {
		[Symbol.iterator](): IIterator<undefined | unknown[]> {
			return this;
		},
		next(): { value: undefined | unknown[]; done: boolean } {
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
