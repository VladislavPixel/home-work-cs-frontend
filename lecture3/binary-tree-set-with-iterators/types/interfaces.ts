export interface ITreeNode<T = unknown> {
  value: T;
  left: null | ITreeNode<T>;
  right: null | ITreeNode<T>;
}

export interface TypeNextResultForIterators<T = unknown> {
  done: boolean;
  value: undefined | T;
}

export interface ITraversalIterator<T = unknown> {
  [Symbol.iterator](): ITraversalIterator<T>;
  next(): TypeNextResultForIterators<T>;
}

export interface IBinaryTreeSet<T = unknown> {
  has(searchValue: T): boolean;
  getIteratorForDirectDepthTraversal(): ITraversalIterator<T>;
  getIteratorForBreadthTraversal(): ITraversalIterator<T>;
  getIteratorForSymmetricalTraversal(): ITraversalIterator<T>;
  getIteratorForReverseTraversal(): ITraversalIterator<T>;
}
