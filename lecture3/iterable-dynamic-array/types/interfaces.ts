import type { TypeResultNextMethod } from "../modules/iterator";

export interface INode<T = unknown> {
  next: null | INode<T>;
  value: T[];
}

export interface ILinkedList<T = unknown> {
  first: INode<T>;
  tail: INode<T>;
  total: number;
  addLast(newValue: T): number;
  findElementByIndex(indexForElement: number): undefined | T;
}

export interface IIteratorDynamicArray<T = unknown> {
  [Symbol.iterator](): IIteratorDynamicArray<T>;
  next(): TypeResultNextMethod<T>;
}

export interface IDynamicArray<T = unknown> {
  list: ILinkedList<T>;
  add(newValue: T): number;
  get length(): number;
  get(indexForElement: number): undefined | T;
  [Symbol.iterator](): IIteratorDynamicArray<T>;
}
