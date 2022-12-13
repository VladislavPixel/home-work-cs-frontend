import type { IIterator, IIterable } from "../types";

function mapSeq(iterable: any, iterableWithFNs: IIterable<(el: T) => T>): IIterator<undefined | T> {
	const isIterable = (data: IIterable): boolean => {
		if (data === null || data === undefined) {
			return false;
		}

		if (data[Symbol.iterator] === undefined) {
			return false;
		}

		return true;
	}

	if (!isIterable(iterable) || !isIterable(iterableWithFNs)) {
		throw new Error("Both arguments must be iterable structures. The second argument is an iterable structure with functions.");
	}

	const iteratorForIterable = iterable[Symbol.iterator]();

	let iteratorForIterableWithFNs = iterableWithFNs[Symbol.iterator]();

	return {
		[Symbol.iterator](): IIterator<undefined | T> {
			return this;
		},
		next(): { value: undefined | T; done: boolean } {
			let { value, done } = iteratorForIterable.next();

			if (done) {
				return { value, done };
			}

			while(true) {
				const { value: valueIter, done: doneStatus } = iteratorForIterableWithFNs.next();

				if (doneStatus) {
					break;
				}

				if (typeof valueIter !== "function") {
					throw new Error("The second argument must be an iterable entity that contains functions.");
				}

				value = valueIter(value);
			}

			iteratorForIterableWithFNs = iterableWithFNs[Symbol.iterator]();

			return { value, done: false };
		}
	}
}

export { mapSeq };
