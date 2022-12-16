import type { IIteratorForRange } from "../types";

class BackIteratorForRange<T> implements IIteratorForRange<T> {
	borderLeft: T;

	borderRight: T;

	constructor({ borderLeft, borderRight }: { borderLeft: T; borderRight: T }) {
		this.borderLeft = borderLeft;
		this.borderRight = borderRight;
	}

	[Symbol.iterator](): IIteratorForRange<T> {
		return this;
	}

	next(): { value: undefined | T; done: boolean } {
		if (this.borderLeft > this.borderRight) {
			return { value: undefined, done: true };
		}

		const currentValueRightBorder = this.borderRight;

		if (typeof this.borderRight === "number") {
			this.borderRight--;
		}

		if (typeof this.borderRight === "string") {
			const code = this.borderRight.codePointAt(0);

			if (code === undefined) {
				throw new Error("Code in iterator is not valid type, expect number.");
			}

			this.borderRight = String.fromCodePoint(code - 1) as T;
		}

		return { value: currentValueRightBorder, done: false };
	}
}

export { BackIteratorForRange };
