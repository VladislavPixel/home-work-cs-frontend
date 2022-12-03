import type { TypeForResultNextMethod } from "../modules/iterator-linked-list";

export interface INode<T = unknown> {
	next: null | INode<T>;
	prev: null | INode<T>;
	value: T;
	displayNode(): string;
}

export interface IIteratorLinkedList<T = unknown> {
	store: null | INode<T>;
	next(): TypeForResultNextMethod<T>;
	[Symbol.iterator](): IIteratorLinkedList<T>;
}

export interface ILinkedList<T = unknown> {
	first: null | INode<T>;
	last: null | INode<T>;
	[Symbol.iterator](): IIteratorLinkedList<T>;
	addFirst(valueForNewNode: T): number;
	add(valueForNewNode: T): number;
	deleteFirst(): INode<T>;
	deleteLast(): INode<T>;
	findNodeByValue(searchValue: T): null | undefined | INode<T>;
	display(): void;
}
