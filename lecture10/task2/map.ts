function mapAsync(asyncIterator, callback) {
	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		async next() {
			const { value, done } = await asyncIterator.next();

			if (done) {
				return { value: undefined, done: true };
			}

			const updateValue = callback(value);

			return { value: updateValue, done: false };
		}
	}
};

export { mapAsync };
