export type cbVisit = (...args: any[]) => unknown;

export type cb = (...args: any[]) => any;

export interface IResultVisitor {
	visit(ctx: unknown): void;
};

export interface InViewFnArg {
	delay: number;
	entered(...args: any[]): unknown;
	leaved(...args: any[]): unknown;
};

export interface IEventEmitterPro {
	on(event: string, cb: cb): cb;
	once(event: string, cb: cb): cb;
	off(event: string, cb: cb): void;
	emit(event: string, ...data: any[]): void;
};
