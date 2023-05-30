export function on(eventName, callback) {
	return {
		visit(ctx) {
			ctx.eventEmitter.on(eventName, callback);
		}
	};
};
