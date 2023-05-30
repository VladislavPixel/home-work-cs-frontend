class EventEmitterPro {
	#handlers = new Map();

	on(event, cb) {
		const store = this.#getHandlersStore(event);

		if (!store.has(cb)) {
			store.add(cb);
		}

		return cb;
	};

	once(event, cb) {
		const wrapper = (...args) => {
			try {
				cb(...args);
			} finally {
				this.off(event, wrapper)
			}
		}

		return this.on(event, wrapper);
	};

	off(event, cb) {
		if (event === undefined || event === null) {
			this.#handlers.clear();

			return;
		}

		const store = this.#getHandlersStore(event);

		if (cb === undefined) {
			store.clear();

			return;
		}

		store.delete(cb);
	};

	emit(event, ...data) {
		const store = this.#getHandlersStore(event);

		store.forEach(element => {
			element(...data);
		});
	};

	#getHandlersStore(event) {
		let store = this.#handlers.get(event);

		if (store === undefined) {
			store = new Set();

			this.#handlers.set(event, store);
		}

		return store;
	};
};

const eventEmitter = new EventEmitterPro();

export { eventEmitter };
