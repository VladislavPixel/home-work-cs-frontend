import { CacheTypes } from "../../lecture12/types";
import { SomeStore } from "../types";

function persistent<T extends CacheTypes, S extends SomeStore>(cache: T, store: S): CacheTypes {
	const modifiedCache: CacheTypes = Object.create(cache);

	const symbolSet = Symbol("set-method-native");

	modifiedCache[symbolSet] = cache.set;

	modifiedCache.set = function<T>(key: string, value: T) {
		const size = this[symbolSet](key, value);

		store.set(key, key);

		return size;
	};

	return modifiedCache;
};

export { persistent };
