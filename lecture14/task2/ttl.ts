import { CacheTypes } from "../../lecture12/types";

function ttl<R extends CacheTypes>(cache: R, time: number = 1000): CacheTypes {
	const modifiedCache: CacheTypes = Object.create(cache);

	const symbolSet = Symbol("set-method");

	modifiedCache[symbolSet] = cache.set;

	modifiedCache.set = function<T>(key: string, value: T): number {
		const size = this[symbolSet](key, value);

		setTimeout(() => {
			this.removeByKey(key);
		}, time);

		return size;
	};

	return modifiedCache;
};

export { ttl };
