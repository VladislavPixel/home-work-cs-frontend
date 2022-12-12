import type { IMyRange, IIteratorForRange } from "../types";
import { ConsistentIteratorForRange } from "./consistent-iterator-for-range";
import { BackIteratorForRange } from "./back-iterator-for-range";

class MyRange<T> implements IMyRange<T> {
	borderLeft: T;

	borderRight: T;

	constructor(borderLeft: T, borderRight: T) {
		this.borderLeft = borderLeft;
		this.borderRight = borderRight;
	}

	getConfigSameTypes(): { status: boolean; type: string } {
		const statusCheck = typeof this.borderLeft === typeof this.borderRight;

		return {
			status: statusCheck,
			type: statusCheck ? typeof this.borderLeft : "error"
		};
	}

	isValidData(status: boolean, type: string): boolean {
		if (!status) {
			throw new Error("The type of borderLeft and borderRight are not the same.");
		}

		if (type !== "number" && type !== "string") {
			throw new Error("Argument types are not numbers or strings.");
		}

		if (this.borderLeft > this.borderRight) {
			throw new Error("BorderLeft > BorderRight.");
		}

		return true;
	}

	[Symbol.iterator](): IIteratorForRange<T> {
		const { status, type } = this.getConfigSameTypes();

		this.isValidData(status, type);

		return new ConsistentIteratorForRange(this);
	}

	reverse(): IIteratorForRange<T> {
		const { status, type } = this.getConfigSameTypes();

		this.isValidData(status, type);

		return new BackIteratorForRange(this);
	}
}

export { MyRange };
