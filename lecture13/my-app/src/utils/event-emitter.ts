import { cb, IEventEmitterPro } from "../types";

class EventEmitterPro implements IEventEmitterPro {
	#handlers: Map<PropertyKey, Set<cb>> = new Map();

	on(event: string, cb: cb): cb {
		const store = this.#getHandlersStore(event);

		if (!store.has(cb)) {
			store.add(cb);
		}

		return cb;
	};

	once(event: string, cb: cb): cb {
		const wrapper = (...args: any[]): void => {
			try {
				cb(...args);
			} finally {
				this.off(event, wrapper)
			}
		}

		return this.on(event, wrapper);
	};

	off(event: string, cb: cb): void {
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

	emit(event: string, ...data: any[]): void {
		const store = this.#getHandlersStore(event);

		store.forEach(element => {
			element(...data);
		});
	};

	#getHandlersStore(event: string): Set<cb> {
		let store = this.#handlers.get(event);

		if (store === undefined) {
			store = new Set();

			this.#handlers.set(event, store);
		}

		return store;
	};
};

const eventEmitter: IEventEmitterPro = new EventEmitterPro();

export { eventEmitter };
