export function once(eventName, callback) {
	return {
		visit(ctx) {
			ctx.eventEmitter.once(eventName, callback);
		}
	};
};