import {
	EventEmitterContainerEvent,
	AsyncIterableIteratorEmitter,
	AsyncIterableIteratorEmitterOnce
} from "./event-emitter";

export type FN = (args: any) => void;

export interface IItem<T = unknown> {
	done: boolean;
	value: T;
};

export type ResolveFN<T = unknown> = (value: IItem<T> | PromiseLike<IItem<T>>) => void;

export interface IAsyncIterableIteratorEmitter<T = unknown> {
	resolversArr: Array<ResolveFN<T>>;
	[Symbol.asyncIterator](): IAsyncIterableIteratorEmitter<T>;
	next(payload: T): Promise<IItem<T>>;
};

export interface IAsyncIterableIteratorEmitterOnce<T = unknown> {
	resolversArr: Array<ResolveFN<T>>;
	counterCalls: number;
	[Symbol.asyncIterator](): IAsyncIterableIteratorEmitterOnce<T>;
	next(payload: T): Promise<IItem<T>>;
};

export interface IEventEmitter<T = unknown> {
	off(eventName?: string, cb?: FN): void;
	emit(eventName: string, payload?: T): void;
	on(eventName: string, cb?: FN): void | AsyncIterableIteratorEmitter<EventEmitterContainerEvent<T>>;
	once(eventName: string, cb?: FN): void | AsyncIterableIteratorEmitterOnce<EventEmitterContainerEvent<T>>;
};

export interface IEventEmitterContainerEvent<T = unknown> {
	target: null | IEventEmitter<T>;
	data: T;
	stopPropagation(): boolean;
};
