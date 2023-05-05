function takeAsync(asyncIterator, limit: number) {
	let current = 0;

	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		next() {
			if (current < limit) {
				current++;

				return asyncIterator.next();
			}

			return Promise.resolve({ value: undefined, done: true });
		}
	}
};

export { takeAsync };
