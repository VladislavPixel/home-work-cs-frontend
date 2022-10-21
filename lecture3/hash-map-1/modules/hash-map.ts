import type { IHashMap, ILinkedList } from "../types/interfaces";
import LinkedList from "./linked-list";

class HashMap<A> implements IHashMap<A> {
  #capacityInternalArray: number;

  #length: number;

  #internalArray: Array<ILinkedList<A>>;

  constructor() {
    this.#capacityInternalArray = 59;
    this.#length = 0;
    this.#internalArray = new Array(this.#capacityInternalArray);
    for (let m = 0; m < this.#capacityInternalArray; m++) {
      this.#internalArray[m] = new LinkedList();
    }
  }

  get length(): number {
    return this.#length;
  }

  #hashFn(strKey: string): number {
    let hashValue = 0;

    for (let m = 0; m < strKey.length; m++) {
      const charCode = strKey.charCodeAt(m);

      hashValue = (hashValue * 65535 + charCode) % this.#capacityInternalArray;
    }

    return hashValue;
  }

  #convertToString(key: unknown): string {
    return typeof key !== "string" ? JSON.stringify(key) : key;
  }

  set(key: unknown, value: A): number {
    const stringKey = this.#convertToString(key);

    const hashValue = this.#hashFn(stringKey);

    this.#internalArray[hashValue].addFirst(stringKey, value);

    this.#length++;

    return this.#length;
  }

  get(key: unknown): undefined | A {
    const stringKey = this.#convertToString(key);

    const hashValue = this.#hashFn(stringKey);

    for (const nodeInfo of this.#internalArray[hashValue]) {
      if (nodeInfo.key === stringKey) {
        return nodeInfo.value;
      }
    }

    return undefined;
  }
}

export default HashMap;
