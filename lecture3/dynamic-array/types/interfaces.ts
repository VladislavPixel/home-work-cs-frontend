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

export interface IDynamicArray<T = unknown> {
  add(newValue: T): number;
  get length(): number;
  get(indexForElement: number): undefined | T;
}
