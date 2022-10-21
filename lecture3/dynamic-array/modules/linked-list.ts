import type {
  INode,
  ILinkedList,
  IIteratorLinkedList
} from "../types/interfaces";
import Node from "./node";
import IteratorLinkedList from "./iterator-linked-list";

class LinkedList<T> implements ILinkedList<T> {
  first: null | INode<T | T[]>;

  last: null | INode<T | T[]>;

  #total: number;

  [Symbol.iterator](): IIteratorLinkedList<T> {
    return new IteratorLinkedList(this);
  }

  constructor() {
    this.first = null;
    this.last = null;
    this.#total = 0;
  }

  get length(): number {
    return this.#total;
  }

  addFirst(valueForNewNode: T | T[]): number {
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

  add(valueForNewNode: T | T[]): number {
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

  deleteFirst(): INode<T | T[]> {
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

  deleteLast(): INode<T | T[]> {
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

  findNodeByValue(searchValue: T): null | undefined | INode<T | T[]> {
    if (this.#total === 0) {
      throw new Error(
        "LinkedList is Empty, operation `findNodeByValue` is not supported!"
      );
    }

    const iterator = this[Symbol.iterator]();

    for (const node of iterator) {
      if (node!.value === searchValue) return node;
    }

    return null;
  }

  display(): void {
    if (this.#total === 0) {
      throw new Error(
        "LinkedList is Empty, operation `display` is not supported!"
      );
    }

    const iterator = this[Symbol.iterator]();

    for (const node of iterator) node!.displayNode();
  }
}

export default LinkedList;
