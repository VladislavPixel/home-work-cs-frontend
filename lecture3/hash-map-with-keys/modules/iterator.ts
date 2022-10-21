import type { IIterator, ILinkedList, INode } from "../types/interfaces";

export interface TypeResultNext<A> {
  done: boolean;
  value: {
    key: undefined | string;
    value: undefined | A;
  };
}

class Iterator<A> implements IIterator<A> {
  #store: null | INode<A>;

  constructor(targetObj: ILinkedList<A>) {
    this.#store = targetObj.first;
  }

  next(): TypeResultNext<A> {
    let result;

    if (this.#store) {
      result = {
        value: { value: this.#store.value, key: this.#store.key },
        done: false
      };

      this.#store = this.#store.next;
    } else {
      result = { value: { value: undefined, key: undefined }, done: true };
    }

    return result;
  }

  [Symbol.iterator](): IIterator<A> {
    return this;
  }
}

export default Iterator;
