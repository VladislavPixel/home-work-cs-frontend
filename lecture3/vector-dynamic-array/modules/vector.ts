import type { IVector } from "../types/interfaces";

class Vector<T> implements IVector<T> {
	#capacity: number;

	#length: number;

	#internalArray: T[];

	constructor(capacityValue: number = 3) {
		this.#capacity = capacityValue;
		this.#length = 0;
		this.#internalArray = new Array(capacityValue);
	}

	add(newValue: T): number {
		if (this.#capacity === 0) {
			throw new Error(
				"Operation `add` is not supported in Vector with capacity value 0."
			);
		}

		this.#internalArray[this.#length] = newValue;

		this.#length++;

		if (this.#capacity === this.#length) {
			this.#capacity = this.#capacity * 2;

			const newInternalArray = new Array(this.#capacity);

			for (let m = 0; m < this.#internalArray.length; m++) {
				newInternalArray[m] = this.#internalArray[m];
			}

			this.#internalArray = newInternalArray;
		}

		return this.#length;
	}

	get(index: number): undefined | T {
		if (index < 0 || index >= this.#length) {
			return undefined;
		}

		return this.#internalArray[index];
	}

	get length(): number {
		return this.#length;
	}
}

export default Vector;
