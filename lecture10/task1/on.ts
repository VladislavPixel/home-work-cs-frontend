function on(element: HTMLElement | Element, eventName: string) {
	const stack = [];

	const resolversFn = [];

	const listener = (event) => {
		if (resolversFn.length !== 0) {

			while(resolversFn.length > 0) {
				const fn = resolversFn.shift();

				fn({ value: event, done: false });
			}

			return;
		}

		stack.push(Promise.resolve({ value: event, done: false }));
	};

	element.addEventListener(eventName, listener);

	return {
		[Symbol.asyncIterator]() {
			return this;
		},

		next() {
			if (stack.length !== 0) {
				const pr = stack.shift();

				return pr;
			}

			return new Promise((resolve) => {
				resolversFn.push(resolve);
			});
		},

		return() {
			element.removeEventListener(eventName, listener);
		}
	};
};

export { on };
