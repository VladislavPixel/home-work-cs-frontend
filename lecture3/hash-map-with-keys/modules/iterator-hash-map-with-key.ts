import type {
  IIteratorHashMapWithKey,
  ILinkedList,
  INode
} from "../types/interfaces";

export interface TypeResultNextForHashMapIteratorWithKey {
  done: boolean;
  value: undefined | string;
}

class IteratorHashMapWithKey<A> implements IIteratorHashMapWithKey<A> {
  #length: number;

  #arrayWithLists: Array<ILinkedList<A>>;

  #currentIndexArray: number;

  #targetList: null | INode<A>;

  constructor(arrayWithLists: Array<ILinkedList<A>>, length: number) {
    this.#length = length;
    this.#arrayWithLists = arrayWithLists;
    this.#currentIndexArray = 0;
    this.#targetList = this.#arrayWithLists[this.#currentIndexArray].first;
  }

  next(): TypeResultNextForHashMapIteratorWithKey {
    if (
      this.#length === 0 ||
      this.#arrayWithLists.length === this.#currentIndexArray
    ) {
      return { value: undefined, done: true };
    }

    if (this.#targetList === null) {
      this.#currentIndexArray++;

      if (this.#currentIndexArray < this.#arrayWithLists.length) {
        this.#targetList = this.#arrayWithLists[this.#currentIndexArray].first;
      }

      return this.next();
    }

    const value = this.#targetList.key;

    this.#targetList = this.#targetList.next;

    return { value, done: false };
  }

  [Symbol.iterator](): IIteratorHashMapWithKey<A> {
    return this;
  }
}

export default IteratorHashMapWithKey;
