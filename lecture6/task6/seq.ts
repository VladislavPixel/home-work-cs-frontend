import type { IIterable, IIterator } from "../types";

function seq(...arrayOfIterableElements: unknown[]): IIterator<undefined | unknown> {
	let index = 0;

	const targetIterable = arrayOfIterableElements[index];

	if (targetIterable === undefined || targetIterable === null) {
		throw new Error("Pass an iterable structure or a set of such iterable structures to the function.");
	}

	let correctTargetIterable = targetIterable as IIterable;

	if (correctTargetIterable[Symbol.iterator] === undefined) {
		throw new Error("You have passed a structure that cannot be iterated.");
	}

	let targetIterator = correctTargetIterable[Symbol.iterator]();

	return {
		[Symbol.iterator](): IIterator<undefined | unknown> {
			return this;
		},
		next(): { value: undefined | unknown; done: boolean } {
			const { value, done } = targetIterator.next();

			if (done) {
				index++;

				for (let m = index; m < arrayOfIterableElements.length; m++) {
					correctTargetIterable = arrayOfIterableElements[m] as IIterable;

					if (correctTargetIterable === undefined) {
						return { value: undefined, done: true };
					}

					if (correctTargetIterable === null || correctTargetIterable[Symbol.iterator] === undefined) {
						throw new Error("You have passed a structure that cannot be iterated.");
					}

					targetIterator = correctTargetIterable[Symbol.iterator]();

					const { value, done } = targetIterator.next();

					if (!done) {
						return { value, done };
					}

					index++;
				}

				return { value: undefined, done: true };
			}

			return { value, done };
		}
	};
};

export { seq };
