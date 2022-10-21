import type { IStack } from "../interface/i-stack";

class Stack<T> implements IStack<T> {
  #array: T[];

  #top: number;

  head: null | T;

  constructor() {
    this.#array = new Array(10);
    this.#top = -1;
    this.head = null;
  }

  push(newValue: T): boolean {
    if (this.#top === this.#array.length - 1) {
      throw new Error("Stack is Full!!!");
    }

    this.#top++;

    this.#array[this.#top] = newValue;

    this.head = newValue;

    return true;
  }

  pop(): T {
    if (this.#top === -1) {
      throw new Error("Stack is Empty!!!");
    }

    const deleteElement = this.#array[this.#top];

    this.#top--;

    this.head = this.#top === -1 ? null : this.#array[this.#top];

    return deleteElement;
  }
}

export default Stack;
