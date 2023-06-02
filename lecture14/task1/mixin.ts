function mixin(target: Record<PropertyKey, any>, ...sourcesIterable: Record<PropertyKey, any>[]): Record<PropertyKey, any> {
	for (const source of sourcesIterable) {
		for (const [key, value] of Object.entries(source)) {
			if (!target.hasOwnProperty(key) || typeof value !== "object" || typeof target[key] !== "object") {
				target[key] = value;
			} else {
				if (typeof target[key] === "object") {
					mixin(target[key], source[key]);
				}
			}
		}
	}

	return target;
};

export { mixin };
