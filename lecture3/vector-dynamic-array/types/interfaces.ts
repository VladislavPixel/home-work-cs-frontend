export interface IVector<T = unknown> {
  add(newValue: T): number;
  get(index: number): undefined | T;
  get length(): number;
}
