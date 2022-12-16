import type { IIteratorForRange } from "../types";

class ConsistentIteratorForRange<T> implements IIteratorForRange<T> {
	borderLeft: T;

	borderRight: T;

	constructor({ borderLeft, borderRight }: { borderLeft: T; borderRight: T }) {
		this.borderLeft = borderLeft;
		this.borderRight = borderRight;
	}

	[Symbol.iterator](): IIteratorForRange<T> {
		return this;
	}

	next(): { value: T | undefined; done: boolean } {
		if (this.borderLeft > this.borderRight) {
			return { value: undefined, done: true };
		}

		const currentValueLeftBorder = this.borderLeft;

		if (typeof this.borderLeft === "number") {
			this.borderLeft++;
		}

		if (typeof this.borderLeft === "string") {
			const code = this.borderLeft.codePointAt(0);

			if (code === undefined) {
				throw new Error("Code in iterator is not valid type, expect number.");
			}

			this.borderLeft = String.fromCodePoint(code + 1) as T;
		}

		return { value: currentValueLeftBorder, done: false };
	}
}

export { ConsistentIteratorForRange };
