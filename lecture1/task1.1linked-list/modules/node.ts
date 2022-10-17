import type { INode } from "../types/interfaces";

class Node<T> implements INode<T> {
  next: null | INode<T>;

  prev: null | INode<T>;

  value: T;

  constructor(newValue: T) {
    this.next = null;
    this.prev = this.next;
    this.value = newValue;
  }

  displayNode(): string {
    const message = `element value: ${this.value};`;

    console.log(message);

    return message;
  }
}

export default Node;
