import type { TypeForResultNextMethod } from "../modules/iterator-linked-list";

export interface INode<T = unknown> {
  next: null | INode<T>;
  prev: null | INode<T>;
  value: T;
  displayNode(): string;
}

export interface IIteratorLinkedList<T = unknown> {
  store: null | INode<T | T[]>;
  next(): TypeForResultNextMethod<T>;
  [Symbol.iterator](): IIteratorLinkedList<T>;
}

export interface ILinkedList<T = unknown> {
  first: null | INode<T | T[]>;
  last: null | INode<T | T[]>;
  get length(): number;
  [Symbol.iterator](): IIteratorLinkedList<T>;
  addFirst(valueForNewNode: T | T[]): number;
  add(valueForNewNode: T | T[]): number;
  deleteFirst(): INode<T | T[]>;
  deleteLast(): INode<T | T[]>;
  findNodeByValue(searchValue: T): null | undefined | INode<T | T[]>;
  display(): void;
}

export interface IDynamicArray<T = unknown> {
  add(newValue: T): number;
  get length(): number;
  get(indexForElement: number): undefined | T;
}
