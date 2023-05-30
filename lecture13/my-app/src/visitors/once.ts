import { cbVisit, IResultVisitor } from "../types";

export function once(eventName: string, callback: cbVisit): IResultVisitor {
	return {
		visit(ctx: Record<any, any>): void {
			if (typeof ctx === "object" && ctx["eventEmitter"] !== undefined) {
				ctx["eventEmitter"].once(eventName, callback);
			}
		}
	};
};