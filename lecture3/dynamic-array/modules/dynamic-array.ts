import LinkedList from "./linked-list";
import type { IDynamicArray, ILinkedList } from "../types/interfaces";

class DynamicArray<T> implements IDynamicArray<T> {
  #list: ILinkedList<T>;

  #capacityArr: number;

  #counterForTailNode: number;

  #length: number;

  constructor(capacityValue: number = 3) {
    this.#capacityArr = capacityValue;
    this.#length = 0;
    this.#counterForTailNode = -1;
    this.#list = new LinkedList<T>();
    (() => {
      this.#list.add(new Array(this.#capacityArr));
    })();
  }

  add(newValue: T): number {
    if (this.#capacityArr === 0) {
      throw new Error(
        "method `add` is not supported in DynamicArray with 0 capacity value"
      );
    }

    if (this.#counterForTailNode === this.#capacityArr - 1) {
      this.#list.add(new Array(this.#capacityArr));

      this.#counterForTailNode = -1;
    }

    this.#counterForTailNode++;

    if (this.#list.last && Array.isArray(this.#list.last.value)) {
      this.#list.last.value[this.#counterForTailNode] = newValue;

      this.#length++;
    }

    return this.#length;
  }

  get(indexForElement: number): undefined | T {
    if (indexForElement >= this.#length || indexForElement < 0) {
      return undefined;
    }

    const numberNode = Math.floor(indexForElement / this.#capacityArr);

    const targetIndexForArr = indexForElement % this.#capacityArr;

    let startIndex = 0;

    for (const nodeInfo of this.#list) {
      if (startIndex === numberNode && Array.isArray(nodeInfo!.value)) {
        return nodeInfo!.value[targetIndexForArr];
      }

      startIndex++;
    }

    return undefined;
  }

  get length(): number {
    return this.#length;
  }
}

export default DynamicArray;
