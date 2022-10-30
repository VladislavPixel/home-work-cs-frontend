export interface IData<T = unknown> {
  key: string;
  value: T;
}

export interface INode<T = unknown> {
  childArray: Array<INode<T> | null>;
  dataArray: Array<IData<T> | null>;
  dataLength: number;
  parent: INode<T>;
  insertData(dataObject: IData<T>): number;
  connectChild(node: INode<T>, index?: number): void;
  disconnectChild(index: number): null | INode<T>;
  removeData(indexDeleted: number): null | IData<T>;
}

export interface IBTree<T = unknown> {
  set<A>(key: A, value: T): number;
  get<A>(key: A): T;
}
