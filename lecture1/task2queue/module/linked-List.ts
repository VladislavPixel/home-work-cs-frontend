import type { ILinkedList, INode } from "../types/interfaces";
import Node from "./node";

class LinkedList<T> implements ILinkedList<T> {
  first: null | INode<T>;

  tail: null | INode<T>;

  #counterElements: number;

  constructor() {
    this.first = null;
    this.tail = this.first;
    this.#counterElements = 0;
  }

  addLast(newValue: T): number {
    const newNode = new Node(newValue);

    if (this.#counterElements === 0) {
      this.first = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.#counterElements++;

    return this.#counterElements;
  }

  deleteFirst(): null | INode<T> {
    if (this.#counterElements === 0) return null;

    const deleteElement = this.first;

    this.first = deleteElement!.next;

    if (this.first === null) this.tail = this.first;

    this.#counterElements--;

    return deleteElement;
  }
}

export default LinkedList;
