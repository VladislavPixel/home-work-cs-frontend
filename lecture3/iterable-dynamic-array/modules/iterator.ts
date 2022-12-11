import type { IIteratorDynamicArray, IDynamicArray, INode } from "../types/interfaces";

export interface TypeResultNextMethod<T> {
	value: undefined | T;
	done: boolean;
}

class Iterator<T> implements IIteratorDynamicArray<T> {
	#store: INode<T>;

	#total: number;

	#counterForTailNode: number;

	#currentIndex: number;

	constructor(dynamicArray: IDynamicArray<T>) {
		this.#store = dynamicArray.list.first;
		this.#total = dynamicArray.length;
		this.#counterForTailNode = 0;
		this.#currentIndex = 0;
	}

	next(): TypeResultNextMethod<T> {
		let result;

		if (this.#total === this.#currentIndex) {
			result = { value: undefined, done: true };
		} else {
			result = {
				value: this.#store.value[this.#counterForTailNode],
				done: false
			};

			this.#counterForTailNode++;

			this.#currentIndex++;

			if (this.#counterForTailNode === this.#store.value.length) {
				this.#counterForTailNode = 0;

				if (this.#store.next) {
					this.#store = this.#store.next;
				}
			}
		}

		return result;
	}

	[Symbol.iterator](): IIteratorDynamicArray<T> {
		return this;
	}
}

export default Iterator;
