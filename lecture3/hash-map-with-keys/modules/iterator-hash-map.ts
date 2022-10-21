import type { IIteratorHashMap, ILinkedList, INode } from "../types/interfaces";

export interface TypeResultNextForHashMapIterator<A> {
  done: boolean;
  value: undefined | string | { value: A; key: string };
}

class IteratorHashMap<A> implements IIteratorHashMap<A> {
  #length: number;

  #arrayWithLists: Array<ILinkedList<A>>;

  #status: string | undefined;

  #currentIndexArray: number;

  #targetList: null | INode<A>;

  constructor(
    arrayWithLists: Array<ILinkedList<A>>,
    length: number,
    status: string | undefined
  ) {
    this.#length = length;
    this.#arrayWithLists = arrayWithLists;
    this.#status = status;
    this.#currentIndexArray = 0;
    this.#targetList = this.#arrayWithLists[this.#currentIndexArray].first;
  }

  next(): TypeResultNextForHashMapIterator<A> {
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

    let value;

    switch (this.#status) {
      case "onlyKeys":
        value = this.#targetList.key;
        break;
      default:
        value = { value: this.#targetList.value, key: this.#targetList.key };
        break;
    }

    this.#targetList = this.#targetList.next;

    return { value, done: false };
  }

  [Symbol.iterator](): IIteratorHashMap<A> {
    return this;
  }
}

export default IteratorHashMap;
