import type { INode, ILinkedList } from "../types/interfaces";
import Node from "./node";

class LinkedList<T> implements ILinkedList<T> {
  first: null | INode<T>;

  last: null | INode<T>;

  #total: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.#total = 0;
  }

  addFirst(valueForNewNode: T): number {
    const newNode = new Node(valueForNewNode);

    if (this.#total === 0) {
      this.last = newNode;
    } else if (this.first) {
      this.first.prev = newNode;
      newNode.next = this.first;
    }

    this.first = newNode;
    this.#total++;

    return this.#total;
  }

  add(valueForNewNode: T): number {
    const newNode = new Node(valueForNewNode);

    if (this.#total === 0) {
      this.first = newNode;
    } else if (this.last) {
      newNode.prev = this.last;
      this.last.next = newNode;
    }

    this.last = newNode;
    this.#total++;

    return this.#total;
  }

  deleteFirst(): INode<T> {
    if (this.first === null) {
      throw new Error(
        "LinkedList is Empty, operation `deleteFirst` is not supported!"
      );
    }

    const deletedFirstElement = this.first;

    if (this.first.next) {
      this.first = this.first.next;
      this.first.prev = null;
    } else {
      this.first = null;
      this.last = null;
    }

    this.#total--;

    return deletedFirstElement;
  }

  deleteLast(): INode<T> {
    if (this.last === null) {
      throw new Error(
        "LinkedList is Empty, operation `deleteLast` is not supported!"
      );
    }

    const deletedElement = this.last;

    if (this.last.prev) {
      this.last = this.last.prev;
      this.last.next = null;
    } else {
      this.first = null;
      this.last = null;
    }

    this.#total--;

    return deletedElement;
  }
}

export default LinkedList;
