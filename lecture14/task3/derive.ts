function derive<R extends Function>(classEssence: R): ClassDecorator {
	return function<T extends Function>(target: T): T {
		const trigger: string = "constructor";

		const arrKeys: string[] = Object.getOwnPropertyNames(classEssence.prototype);

		for (const key of arrKeys) {
			const isValid: boolean = trigger !== key && classEssence[key] !== undefined && classEssence.prototype[key] !== undefined && typeof classEssence.prototype[key] === "function" && typeof classEssence[key] === "function";

			if (isValid) {
				target.prototype[key] = classEssence[key].bind(this, classEssence);
			}
		}

		return target;
	};
};

export { derive };
