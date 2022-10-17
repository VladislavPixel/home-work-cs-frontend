export interface IStructure<T = unknown> {
  get(keyStructure: string): T;
  set(keyStructure: string, value: T): IStructure<T>;
}
