export interface IStack<T = unknown> {
  head: null | T;
  push(newValue: T): boolean;
  pop(): T;
}
