export interface IDecQueue<T = unknown> {
	push(newValue: T): number;
	unshift(newValue: T): number;
	pop(): T;
	shift(): T;
}
