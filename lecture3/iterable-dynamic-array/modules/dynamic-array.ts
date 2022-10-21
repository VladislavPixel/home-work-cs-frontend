import LinkedList from "./linked-list";
import type {
  IDynamicArray,
  ILinkedList,
  IIteratorDynamicArray
} from "../types/interfaces";
import Iterator from "./iterator";

class DynamicArray<T> implements IDynamicArray<T> {
  list: ILinkedList<T>;

  [Symbol.iterator](): IIteratorDynamicArray<T> {
    return new Iterator(this);
  }

  constructor(capacityValue: number = 3) {
    this.list = new LinkedList<T>(capacityValue);
  }

  add(newValue: T): number {
    try {
      this.list.addLast(newValue);
    } catch (err) {
      throw new Error(
        "method `add` is not supported in DynamicArray with 0 capacity value"
      );
    }

    return this.list.total;
  }

  get(indexForElement: number): undefined | T {
    if (indexForElement >= this.list.total || indexForElement < 0) {
      return undefined;
    }

    return this.list.findElementByIndex(indexForElement);
  }

  get length(): number {
    return this.list.total;
  }
}

export default DynamicArray;
