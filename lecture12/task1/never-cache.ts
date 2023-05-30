import { Cache } from "./cache";
import { ICache, ICacheConcrate } from "../types";

class NeverCache<T> extends Cache<T> implements ICache<T>, ICacheConcrate<T> {
	constructor(maxSize: number = 1) {
		super(maxSize);
	};

	override clear(): boolean {
		return false;
	};

	set(key: PropertyKey, value: T): number {
		return 0;
	};

	override get(searchKey: PropertyKey): null {
		return null;
	};
};

export { NeverCache };
