export interface IIteratorForRandomFn {
	[Symbol.iterator](): IIteratorForRandomFn;
	next(): { value: undefined | number; done: boolean };
}

function random(minValue: number, maxValue: number): IIteratorForRandomFn {
	let currentValue: number = minValue;

	function getRandomValue(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}

	return {
		[Symbol.iterator](): IIteratorForRandomFn {
			return this;
		},
		next: () => {
			currentValue++;

			if (currentValue > maxValue) {
				return { value: undefined, done: true };
			}

			return { value: getRandomValue(minValue, maxValue), done: false };
		}
	};
}

export { random };
