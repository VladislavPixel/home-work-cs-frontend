import { DoubleLinkedList } from "../double-linked-list/double-linked-list";
import { ICache, IDoubleLinkedList, INode, IValueCache } from "../types";

class Cache<T> implements ICache<T> {
	store: IDoubleLinkedList<IValueCache<T>> = new DoubleLinkedList();

	length: number = 0;

	maxSize: number = 1;

	hashTable: Map<PropertyKey, INode<IValueCache<T>>> = new Map();

	constructor(maxSize: number = 1) {
		this.maxSize = Math.abs(maxSize);
	};

	clear(): boolean {
		this.length = 0;

		this.hashTable = new Map();

		this.store = new DoubleLinkedList();

		return true;
	};

	get(searchKey: PropertyKey): null | T {
		const element = this.hashTable.get(searchKey);

		if (!element) {
			return null;
		}

		const result = element.value.value;

		this.store.moveToBeginning(element);

		return result;
	};

	isFully(): boolean {
		return this.length === this.maxSize;
	};

	getSize(): number {
		return this.length;
	};

	getMaxSize(): number {
		return this.maxSize;
	};

	getHead(): null | INode<IValueCache<T>> {
		return this.store.getHead();
	};

	getTail(): null | INode<IValueCache<T>> {
		return this.store.getTail();
	};
};

export { Cache };
