import Iterator from "./iterator";
import Node from "./node";
import type { ILinkedList, INode, IIterator } from "../types/interfaces";

class LinkedList<A> implements ILinkedList<A> {
	#length: number;

	first: null | INode<A>;

	constructor() {
		this.first = null;
		this.#length = 0;
	}

	[Symbol.iterator](): IIterator<A> {
		return new Iterator(this);
	}

	addFirst(key: string, value: A): number {
		const node = new Node(key, value);

		if (this.#length !== 0) {
			node.next = this.first;
		}

		this.first = node;

		this.#length++;

		return this.#length;
	}
}

export default LinkedList;
