function repeat(asyncIterable) {
	if (typeof asyncIterable !== "object" && typeof asyncIterable !== "function") {
		throw new Error("element is not async iterable");
	}

	if (typeof asyncIterable === "function" && asyncIterable[Symbol.asyncIterator] === undefined) {
		asyncIterable[Symbol.asyncIterator] = function() {
			return asyncIterable();
		};
	}

	let currentAsyncIterator = asyncIterable[Symbol.asyncIterator]();

	let isWork = true;

	let lastEvent = null;

	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		async next() {
			if (!isWork) {
				isWork = true;

				currentAsyncIterator = asyncIterable[Symbol.asyncIterator]();
			}

			const { value, done } = await currentAsyncIterator.next();

			if (value !== undefined) {
				lastEvent = value;
			}

			if (done) {
				isWork = false;

				return { value: lastEvent, done: false };
			}

			return { value, done };
		}
	};
};

export { repeat };
