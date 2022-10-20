import type { INode } from "../types/interfaces";

class Node<T> implements INode<T> {
  next: null | INode<T>;

  value: T[];

  constructor(capacityValue: number) {
    this.next = null;
    this.value = new Array(capacityValue);
  }
}

export default Node;
