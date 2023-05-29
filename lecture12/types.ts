export interface IValueCache<T = unknown> {
	key: PropertyKey;
	value: T;
};

export interface INode<T = unknown> {
	value: T;
	prev: null | INode<T>;
	next: null | INode<T>;
};

export interface IDoubleLinkedList<T = unknown> {
	isEmpty(): boolean;
	getSize(): number;
	getHead(): null | INode<T>;
	getTail(): null | INode<T>;
	addLast(newValue: T): number;
	addFirst(newValue: T): number;
	removeLast(): INode<T>;
	removeFirst(): INode<T>;
	removeByNode(node: INode<T>): INode<T>;
	moveToBeginning<A>(node: INode<A>): INode<A>;
};

export interface ICache<T = unknown> {
	store: IDoubleLinkedList<T>;
	length: number;
	maxSize: number;
	hashTable: Map<PropertyKey, INode<IValueCache<INode<T>>>>;
	clear(): boolean;
	get(searchKey: PropertyKey): INode<T>;
	isFully(): boolean;
	getSize(): number;
	getMaxSize(): number;
	getHead(): null | INode<T>;
	getTail(): null | INode<T>;
};
