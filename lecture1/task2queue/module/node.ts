import type { INode } from "../types/interfaces";

class Node<T> implements INode<T> {
	value: T;

	next: null | INode<T>;

	constructor(newValue: T) {
		this.value = newValue;
		this.next = null;
	}
}

export default Node;
