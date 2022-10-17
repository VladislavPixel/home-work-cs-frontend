import type { IQueue, ILinkedList } from "../types/interfaces";
import LinkedList from "./linked-List";

class Queue<T> implements IQueue<T> {
  head: null | T;

  #linkedList: ILinkedList<T>;

  #auxiliary: number;

  constructor() {
    this.#linkedList = new LinkedList();
    this.head = null;
    this.#auxiliary = -1;
  }

  push(newValue: T): IQueue<T> {
    if (this.#auxiliary === -1) {
      this.head = newValue;
      this.#auxiliary = 0;
    }

    this.#linkedList.addLast(newValue);

    return this;
  }

  pop(): T {
    const deletedElement = this.#linkedList.deleteFirst();

    if (deletedElement === null) {
      throw new Error("Operation `pop` is not supported in Empty Queue!");
    }

    if (deletedElement.next) {
      this.head = deletedElement.next.value;
    } else {
      this.head = null;
      this.#auxiliary = -1;
    }

    return deletedElement.value;
  }
}

export default Queue;
