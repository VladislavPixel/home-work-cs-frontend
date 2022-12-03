import type { TypeResultNext } from "../modules/iterator";

export interface INode<A = unknown> {
	key: string;
	value: A;
	next: null | INode<A>;
}

export interface IIterator<A = unknown> {
	[Symbol.iterator](): IIterator<A>;
	next(): TypeResultNext<A>;
}

export interface ILinkedList<A = unknown> {
	first: null | INode<A>;
	[Symbol.iterator](): IIterator<A>;
	addFirst(key: string, value: A): number;
}

export interface IHashMap<A = unknown> {
	get length(): number;
	set(key: unknown, value: A): number;
	get(key: unknown): undefined | A;
}
