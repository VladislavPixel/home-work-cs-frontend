import type { IIterator } from "./types";

function take(iterable: IIterator, counter: number): IIterator {
	let currentStateCounter: number = counter;

	return {
		[Symbol.iterator](): IIterator {
			return this;
		},
		next: (): { value: undefined | number; done: boolean } => {
			currentStateCounter--;

			if (currentStateCounter < 0) {
				return { value: undefined, done: true };
			}

			const currentValueForIterable = iterable.next().value;

			return { value: currentValueForIterable, done: false };
		}
	};
}

export { take };
