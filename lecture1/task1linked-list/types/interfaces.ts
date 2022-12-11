export interface INode<T = unknown> {
	next: null | INode<T>;
	prev: null | INode<T>;
	value: T;
	displayNode(): string;
}

export interface ILinkedList<T = unknown> {
	first: null | INode<T>;
	last: null | INode<T>;
	addFirst(valueForNewNode: T): number;
	add(valueForNewNode: T): number;
	deleteFirst(): INode<T>;
	deleteLast(): INode<T>;
}
