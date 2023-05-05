function anyAsync(...asyncIterables) {
	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		async next() {
			while(true) {
				const result = await Promise.race(asyncIterables.map((asyncIterator) => asyncIterator.next()));

				return result;
			}
		}
	};
};

export { anyAsync };
