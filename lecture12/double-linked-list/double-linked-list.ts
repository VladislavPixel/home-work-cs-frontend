import { Node } from "./node";
import { IDoubleLinkedList, INode } from "../types";

class DoubleLinkedList<T> implements IDoubleLinkedList<T> {
	#tail: null | INode<T> = null;

	#head: null | INode<T> = null;

	#length: number = 0;

	isEmpty(): boolean {
		return this.#length === 0;
	};

	getSize(): number {
		return this.#length;
	};

	getHead(): null | INode<T> {
		return this.#head;
	};

	getTail(): null | INode<T> {
		return this.#tail;
	};

	addLast(newValue: T): number {
		const node: INode<T> = new Node(newValue);

		if (this.isEmpty()) {
			this.#head = node;
		} else {
			this.#tail.next = node;

			node.prev = this.#tail;
		}

		this.#tail = node;

		this.#length += 1;

		return this.getSize();
	};

	addFirst(newValue: T): number {
		const node: INode<T> = new Node(newValue);

		if (this.isEmpty()) {
			this.#tail = node;
		} else {
			this.#head.prev = node;

			node.next = this.#head;
		}

		this.#head = node;

		this.#length += 1;

		return this.getSize();
	};

	removeLast(): INode<T> {
		if (this.isEmpty()) {
			throw new Error("DoubleLinkedList is empty. Operation removeLast() is not supported.");
		}

		const deleteNode = this.#tail;

		this.#tail = deleteNode.prev;

		if (this.#tail === null) {
			this.#head = null;
		} else {
			this.#tail.next = null;
		}

		this.#length -= 1;

		return deleteNode;
	};

	removeFirst(): INode<T> {
		if (this.isEmpty()) {
			throw new Error("DoubleLinkedList is empty. Operation removeFirst() is not supported");
		}

		const deleteNode = this.#head;

		this.#head = deleteNode.next;

		if (this.#head === null) {
			this.#tail = null;
		} else {
			this.#head.prev = null;
		}

		this.#length -= 1;

		return deleteNode;
	};

	removeByNode(node: INode<T>): INode<T> {
		if (node === this.getHead()) {
			this.#head = node.next;

			if (this.#head !== null) {
				this.#head.prev = null;
			} else {
				this.#tail = null;
			}
		} else if (node === this.getTail()) {
			this.#tail = node.prev;

			if (this.#tail !== null) {
				this.#tail.next = null;
			} else {
				this.#head = null;
			}
		} else {
			node.prev.next = node.next;
			node.next.prev = node.prev;
		}

		this.#length -= 1;

		return node;
	};

	moveToBeginning<A>(node: INode<A>): INode<A> {
		if (node === this.getHead()) {
			return node;
		}

		if (node === this.getTail()) {
			node.prev.next = null;

			this.#tail = node.prev;

			node.next = this.#head;

			node.prev = null;

			this.#head.prev = node;

			if (this.#head.next === null) {
				this.#tail = this.#head;
			}

			this.#head = node;

			return node;
		}

		node.prev.next = node.next;
		node.next.prev = node.prev;

		node.next = this.#head;
		node.prev = null;

		this.#head.prev = node;

		this.#head = node;

		return node;
	};
};

export { DoubleLinkedList };
