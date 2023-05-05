function every(asyncIterator, predicateFN) {
	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		async next() {
			const { value, done } = await asyncIterator.next();

			if (done) {
				return { value: undefined, done: true };
			}

			if (predicateFN(value) === false) {
				return { value: undefined, done: true };
			}

			return { value, done: false };
		}
	}
};

export { every };
