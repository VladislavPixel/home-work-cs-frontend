import type { IIterator } from "../types";

function take<T>(iterable: IIterator<T>, counter: number): IIterator<T> {
	let currentStateCounter: number = counter;

	return {
		[Symbol.iterator](): IIterator<T> {
			return this;
		},
		next(): { value: T; done: boolean } {
			currentStateCounter--;

			if (currentStateCounter < 0) {
				const result = undefined as T;

				return { value: result, done: true };
			}

			const currentValueForIterable = iterable.next().value;

			return { value: currentValueForIterable, done: false };
		}
	};
}

export { take };
