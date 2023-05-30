import { cbVisit, IResultVisitor } from "../types";

export function on(eventName: string, callback: cbVisit): IResultVisitor {
	return {
		visit(ctx: Record<any, any>): void {
			if (typeof ctx === "object" && ctx["eventEmitter"] !== undefined) {
				ctx["eventEmitter"].on(eventName, callback);
			}
		}
	};
};
