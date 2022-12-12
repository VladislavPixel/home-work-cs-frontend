import type { IIterator, TypeFnPredicate } from "../types";

function filter(iterable: IIterator, callback: TypeFnPredicate): IIterator {
	return {
		[Symbol.iterator](): IIterator {
			return this;
		},
		next(): { value: number | undefined; done: false } {
			let currentValueForIterable = iterable.next().value;

			while (!callback(currentValueForIterable)) {
				currentValueForIterable = iterable.next().value;
			}

			return { value: currentValueForIterable, done: false };
		}
	};
}

export { filter };
