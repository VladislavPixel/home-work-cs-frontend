function random(minValue: number, maxValue: number): IterableIterator<number> {
	function getRandomValue(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}

	return {
		[Symbol.iterator](): IterableIterator<number> {
			return this;
		},
		next(): { value: number; done: false } {
			return { value: getRandomValue(minValue, maxValue), done: false };
		}
	};
}

export { random };
