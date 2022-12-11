import type { IDecQueue } from "../interface/i-dec-queue";

class DecQueue<T> implements IDecQueue<T> {
	#front: number;

	#rear: number;

	#array: T[];

	#total: number;

	constructor() {
		this.#array = new Array(5);
		this.#front = 0;
		this.#rear = -1;
		this.#total = 0;
	}

	push(newValue: T): number {
		if (this.#array.length === this.#total) {
			throw new Error("DecQueue is Full!");
		}

		this.#total++;
		this.#rear++;

		if (this.#rear === this.#array.length) this.#rear = 0;

		this.#array[this.#rear] = newValue;

		return this.#total;
	}

	unshift(newValue: T): number {
		if (this.#array.length === this.#total) {
			throw new Error("DecQueue is Full!");
		}

		this.#total++;
		this.#front--;

		if (this.#front === -1) this.#front = this.#array.length - 1;

		this.#array[this.#front] = newValue;

		return this.#total;
	}

	pop(): T {
		if (this.#total === 0) throw new Error("DecQueue isEmpty!");

		this.#total--;

		if (this.#rear === -1) this.#rear = this.#array.length - 1;

		const deleteValue = this.#array[this.#rear];

		this.#rear--;

		return deleteValue;
	}

	shift(): T {
		if (this.#total === 0) throw new Error("DecQueue isEmpty!");

		this.#total--;

		const deleteValue = this.#array[this.#front];

		this.#front++;

		if (this.#front === this.#array.length) this.#front = 0;

		return deleteValue;
	}
}

export default DecQueue;
