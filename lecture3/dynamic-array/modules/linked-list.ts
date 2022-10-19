import Node from "./node";
import type { ILinkedList, INode } from "../types/interfaces";

interface TypeForResultNextMethod<T> {
  value: undefined | T;
  currentIndex: number;
}

interface TypeForResultGetIteratorMethod<T> {
  next(): TypeForResultNextMethod<T>;
}

class LinkedList<T> implements ILinkedList<T> {
  #capacityArr: number;

  #counterForTailNode: number;

  total: number;

  first: INode<T>;

  tail: INode<T>;

  constructor(capacityValueForArr: number) {
    this.#capacityArr = capacityValueForArr;
    this.#counterForTailNode = -1;
    this.total = 0;
    this.first = new Node(capacityValueForArr);
    this.tail = this.first;
  }

  addLast(newValue: T): number {
    if (this.#capacityArr === 0) {
      throw new Error(
        "method `addLast` is not supported in LinkedList with 0 capacity array"
      );
    }

    if (this.#counterForTailNode === this.#capacityArr - 1) {
      const newNode = new Node<T>(this.#capacityArr);

      this.tail.next = newNode;

      this.tail = newNode;

      this.#counterForTailNode = -1;
    }

    this.#counterForTailNode++;

    this.tail.value[this.#counterForTailNode] = newValue;

    this.total++;

    return this.total;
  }

  #getIterator(): TypeForResultGetIteratorMethod<T> {
    let currentNode = this.first;

    let indexForArr = 0;

    let currentIndex = 0;

    const next = (): TypeForResultNextMethod<T> => {
      let result;

      if (currentIndex < this.total) {
        result = { value: currentNode.value[indexForArr], currentIndex };

        currentIndex++;

        indexForArr++;

        if (indexForArr === this.#capacityArr) {
          if (this.first.next) currentNode = this.first.next;

          indexForArr = 0;
        }
      } else {
        result = { value: undefined, currentIndex };
      }

      return result;
    };

    return { next };
  }

  findElementByIndex(indexForElement: number): undefined | T {
    const iterator = this.#getIterator();

    for (let m = 0; m < this.total; m++) {
      const result = iterator.next();

      if (result.currentIndex === indexForElement) {
        return result.value;
      }
    }

    return undefined;
  }
}

export default LinkedList;
