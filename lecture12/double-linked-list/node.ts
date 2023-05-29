import { INode } from "../types";

class Node<T> implements INode<T> {
	value: T;

	prev: null | INode<T>;

	next: null | INode<T>;

	constructor(value: T) {
		this.value = value;
		this.prev = null;
		this.next = null;
	};
};

export { Node };
