import type { ILinkedList, INode, IIteratorLinkedList } from "../types/interfaces";

export interface TypeForResultNextMethod<T> {
	value: null | INode<T | T[]> | undefined;
	done: boolean;
}

class IteratorLinkedList<T> implements IIteratorLinkedList<T> {
	store: null | INode<T | T[]>;

	constructor(list: ILinkedList<T>) {
		this.store = list.first;
	}

	next(): TypeForResultNextMethod<T> {
		let result: TypeForResultNextMethod<T>;

		if (this.store) {
			result = { value: this.store, done: false };
			this.store = this.store.next;
		} else {
			result = { value: undefined, done: true };
		}

		return result;
	}

	[Symbol.iterator](): IIteratorLinkedList<T> {
		return this;
	}
}

export default IteratorLinkedList;
