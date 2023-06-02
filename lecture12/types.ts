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
	moveToBeginning(node: INode<T>): INode<T>;
};

export interface ICache<T = unknown> {
	store: IDoubleLinkedList<IValueCache<T>>;
	length: number;
	maxSize: number;
	hashTable: Map<PropertyKey, INode<IValueCache<T>>>;
	clear(): boolean;
	get(searchKey: PropertyKey): null | T;
	isFully(): boolean;
	getSize(): number;
	getMaxSize(): number;
	getHead(): null | INode<IValueCache<T>>;
	getTail(): null | INode<IValueCache<T>>;
};

export interface ICacheConcrate<T = unknown> {
	set(key: PropertyKey, value: T): number;
};

export interface IResponseEssence {
	response: Response;
	decoding(): Promise<Response>;
	jsonUnpacking(): Promise<any>;
	textUnpacking(): Promise<string>;
	arraybufferUnpacking(): Promise<ArrayBuffer>;
	blobUnpacking(): Promise<Blob>;
	formDataUnpacking(): Promise<Response>;
	documentUnpacking(): Promise<Response>;
};

export type CacheTypes<T = unknown> = ICache<T> & ICacheConcrate<T>;

export type EngineRequestFNType = (url: string, params: RequestInit) => Promise<Response>;
