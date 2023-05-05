function filterAsync(asyncIterable, callback) {
	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		async next() {
			while(true) {
				const { value, done } = await asyncIterable.next();

				if (done) {
					return { value: undefined, done: true };
				}

				if (callback(value)) {
					return { value, done: false };
				}
			}
		}
	};
};

export { filterAsync };
