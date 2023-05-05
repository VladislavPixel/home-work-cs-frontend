function once(element: HTMLElement, eventName: string) {
	let isWork = true;

	const stack = [];

	const resolversFNArr = [];

	const listener = (event) => {
		if (resolversFNArr.length !== 0) {
			isWork = false;

			while(resolversFNArr.length > 0) {
				const fnResolve = resolversFNArr.shift();

				fnResolve({ value: event, done: false });
			}

			return;
		}

		if (isWork) {
			isWork = false;

			stack.push(Promise.resolve({ value: event, done: false }));
		}
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

			if (!isWork) {
				return this.return();
			}

			return new Promise((resolve) => {
				resolversFNArr.push(resolve);
			});
		},

		return() {
			element.removeEventListener(eventName, listener);

			return Promise.resolve({ value: undefined, done: true });
		}
	};
};

export { once };
