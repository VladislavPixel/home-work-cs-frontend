import {
	IEventEmitter,
	IEventEmitterContainerEvent,
	IAsyncIterableIteratorEmitter,
	ResolveFN,
	IItem,
	IAsyncIterableIteratorEmitterOnce,
	FN
} from "./types";

export class EventEmitterContainerEvent<T> implements IEventEmitterContainerEvent<T> {
	target: null | IEventEmitter<T>;

	data: T;

	isStopPropagation: boolean;

	constructor(target: null | IEventEmitter<T>, payload: T) {
		this.target = target;
		this.data = payload;
		this.isStopPropagation = false;
	};

	stopPropagation(): boolean {
		this.isStopPropagation = true;

		return this.isStopPropagation;
	};
};

export class AsyncIterableIteratorEmitter<T> implements IAsyncIterableIteratorEmitter<T> {
	resolversArr: Array<ResolveFN<T>> = [];

	[Symbol.asyncIterator](): IAsyncIterableIteratorEmitter<T> {
		return this;
	};

	next(payload: T): Promise<IItem<T>> {
		if (this.resolversArr.length && (payload !== null || payload !== undefined)) {
			for (const resolveFN of this.resolversArr) {
				resolveFN({ done: false, value: payload });
			}

			this.resolversArr = [];
		}

		return new Promise((resolve): void => {
			if (payload === undefined || payload === null) {
				this.resolversArr.push(resolve);
			} else {
				resolve({ done: false, value: payload });
			}
		});
	};
};

export class AsyncIterableIteratorEmitterOnce<T> implements IAsyncIterableIteratorEmitterOnce<T> {
	resolversArr: Array<ResolveFN<T>> = [];

	counterCalls: number = 0;

	[Symbol.asyncIterator](): IAsyncIterableIteratorEmitterOnce<T> {
		return this;
	};

	next(payload: T): Promise<IItem<T>> {
		if ((payload !== undefined || payload !== null) && this.resolversArr.length && this.counterCalls < 1) {
			for (const resolveFN of this.resolversArr) {
				resolveFN({ done: false, value: payload });
			}

			this.resolversArr = [];
		}

		return new Promise((resolve): void => {
			if (this.counterCalls >= 1) {
				resolve({ done: true, value: undefined });
			}

			if (payload) {
				this.counterCalls += 1;

				resolve({ done: false, value: payload });
			} else {
				this.resolversArr.push(resolve);
			}
		});
	};
};

class EventEmitter<T> implements IEventEmitter<T> {
	#hashTable: Map<string, Set<FN | AsyncIterableIteratorEmitter<EventEmitterContainerEvent<T>> | AsyncIterableIteratorEmitterOnce<EventEmitterContainerEvent<T>>>> = new Map();

	#eventEmitterParent: null | IEventEmitter<T> = null;

	constructor(eventEmitter?: IEventEmitter<T>) {
		this.#eventEmitterParent = eventEmitter || null;
	};

	off(eventName?: string, cb?: FN): void {
		if (eventName === undefined || eventName === null) {
			this.#hashTable.clear();

			return;
		}

		if (cb === undefined || cb === null) {
			this.#hashTable.delete(eventName);

			return;
		}

		const store = this.#getStore(eventName);

		store.delete(cb);
	};

	#getStore(eventName: string): Set<FN | AsyncIterableIteratorEmitter<EventEmitterContainerEvent<T>> | AsyncIterableIteratorEmitterOnce<EventEmitterContainerEvent<T>>> {
		let store = this.#hashTable.get(eventName);

		if (store === null || store === undefined) {
			store = new Set();

			this.#hashTable.set(eventName, store);
		}

		return store;
	};

	emit(eventName: string, payload?: T): void {
		const store = this.#getStore(eventName);

		const payloadContainer = payload instanceof EventEmitterContainerEvent ? payload : new EventEmitterContainerEvent(this, payload);

		store.forEach((dataActive) => {
			if (dataActive instanceof AsyncIterableIteratorEmitter || dataActive instanceof AsyncIterableIteratorEmitterOnce) {
				setTimeout(() => {
					if (!payloadContainer.isStopPropagation) {
						dataActive.next(payloadContainer);
					}
				}, 0);
			} else {
				if (!payloadContainer.isStopPropagation) {
					dataActive(payloadContainer);
				}
			}
		});

		if (this.#eventEmitterParent !== null && this.#eventEmitterParent instanceof EventEmitter && !payloadContainer.isStopPropagation) {
			this.#eventEmitterParent.emit(eventName, payloadContainer);
		}
	};

	on(eventName: string): AsyncIterableIteratorEmitter<EventEmitterContainerEvent<T>>;

	on(eventName: string, cb: FN): void;

	on(eventName: string, cb?: FN): AsyncIterableIteratorEmitter<EventEmitterContainerEvent<T>> | void {
		const store = this.#getStore(eventName);

		if (cb !== null && cb !== undefined && typeof cb === "function") {
			store.add(cb);
		} else {
			const asyncIterator = new AsyncIterableIteratorEmitter<EventEmitterContainerEvent<T>>();

			store.add(asyncIterator);

			return asyncIterator;
		}
	};

	once(eventName: string): AsyncIterableIteratorEmitterOnce<EventEmitterContainerEvent<T>>;

	once(eventName: string, cb: FN): void;

	once(eventName: string, cb?: FN): AsyncIterableIteratorEmitterOnce<EventEmitterContainerEvent<T>> | void {
		if (cb !== null && cb !== undefined && typeof cb === "function") {
			const wrapperFN = (payload: EventEmitterContainerEvent<T>): void => {
				try {
					cb(payload);
				} finally {
					this.off(eventName, wrapperFN);
				}
			};

			this.on(eventName, wrapperFN);
		} else {
			const store = this.#getStore(eventName);

			const asyncIteratorOnce = new AsyncIterableIteratorEmitterOnce<EventEmitterContainerEvent<T>>();

			store.add(asyncIteratorOnce);

			return asyncIteratorOnce;
		}
	};
};

export { EventEmitter };
