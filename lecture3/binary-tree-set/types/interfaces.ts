import type { TypeNextResult } from "../modules/depth-forward-iterator";

export interface ITreeNode<T = unknown> {
  value: T;
  left: null | ITreeNode<T>;
  right: null | ITreeNode<T>;
}

export interface IDepthForwardIterator<T = unknown> {
  [Symbol.iterator](): IDepthForwardIterator<T>;
  next(): TypeNextResult<T>;
}

export interface IBinaryTreeSet<T = unknown> {
  has(searchValue: T): boolean;
}
