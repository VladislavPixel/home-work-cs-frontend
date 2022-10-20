import type { INode } from "../types/interfaces";

class Node<A> implements INode<A> {
  key: string;

  value: A;

  next: null | INode<A>;

  constructor(key: string, value: A) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

export default Node;
