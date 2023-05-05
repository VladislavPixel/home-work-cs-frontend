function seqAsync(...asyncIterable) {
	let currentIndex = 0;

	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		async next() {
			const targetAsyncIterator = asyncIterable[currentIndex];

			if (targetAsyncIterator === undefined) {
				return { value: undefined, done: true };
			}

			const { value, done } = await targetAsyncIterator.next();

			if (done) {
				currentIndex++;

				return this.next();
			}

			return { value: value, done: false };
		}
	};
};

export { seqAsync };
