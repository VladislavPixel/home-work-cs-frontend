export interface INode<T = unknown> {
	value: T;
	next: null | INode<T>;
}

export interface ILinkedList<T = unknown> {
	first: null | INode<T>;
	tail: null | INode<T>;
	addLast(newValue: T): number;
	deleteFirst(): null | INode<T>;
}

export interface IQueue<T = unknown> {
	head: null | T;
	push(newValue: T): IQueue<T>;
	pop(): T;
}
