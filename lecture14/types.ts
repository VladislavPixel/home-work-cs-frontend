export interface SomeStore<T = unknown> {
	set(key: string, value: T): void;
	get(key: string): T;
	remove(key: string): void;
	clear(): void;
	key(index: number): string;
	get length(): number;
};

export type Trait<T extends Function, R extends T["prototype"] = T["prototype"]> = {
	[K in Extract<keyof T, keyof R>]: R[K];
};

export type AddSelf<T extends (...args: any[]) => any, R extends Object> = T extends (...args: infer H) => any ? (self: R, ...args: H) => any : never;
