import type { IIterator } from "../types";

function enumerate(iterable: IIterator): IIterator<[number, number | undefined]> {
	let counter = 0;

	return {
		[Symbol.iterator](): IIterator<[number, number | undefined]> {
			return this;
		},
		next(): { value: [number, number | undefined]; done: boolean } {
			const currentCounter = counter;

			const currentValueForIterable = iterable.next().value;

			counter++;

			return { value: [currentCounter, currentValueForIterable], done: false };
		}
	};
}

export { enumerate };
