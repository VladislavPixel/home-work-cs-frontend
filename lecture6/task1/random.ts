import type { IIterator } from "../types";

function random(minValue: number, maxValue: number): IIterator {
	function getRandomValue(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}

	return {
		[Symbol.iterator](): IIterator {
			return this;
		},
		next(): { value: number; done: boolean } {
			return { value: getRandomValue(minValue, maxValue), done: false };
		}
	};
}

export { random };
