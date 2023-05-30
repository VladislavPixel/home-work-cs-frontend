import { Cache } from "./cache";
import { ICache, ICacheConcrate } from "../types";

class MRUCache<T> extends Cache<T> implements ICache<T>, ICacheConcrate<T> {
	constructor(maxSize: number = 1) {
		super(maxSize);
	};

	set(key: PropertyKey, value: T): number {
		const element = this.hashTable.get(key);

		if (!element) {
			if (this.isFully()) {
				const deleteNode = this.store.removeFirst();

				this.hashTable.delete(deleteNode.value.key);
			}
		} else {
			this.store.removeByNode(element);
		}

		this.store.addFirst({ key, value });

		this.hashTable.set(key, this.store.getHead());

		this.length = this.store.getSize();

		return this.getSize();
	};
};

export { MRUCache };
