import type { IDepthForwardIterator, ITreeNode } from "../types/interfaces";

export interface TypeNextResult<T = unknown> {
  done: boolean;
  value: undefined | T;
}

class DepthForwardIterator<T> implements IDepthForwardIterator<T> {
  #length: number;

  #binaryTree: null | ITreeNode<T>;

  #arrayNodes: Array<ITreeNode<T>>;

  #auxiliaryTree: null | ITreeNode<T>;

  constructor(tree: null | ITreeNode<T>, length: number) {
    this.#length = length;
    this.#binaryTree = tree;
    this.#arrayNodes = [];
    this.#auxiliaryTree = this.#binaryTree;
  }

  next(): TypeNextResult<T> {
    if (this.#length === 0) {
      return { value: undefined, done: true };
    }

    while (this.#auxiliaryTree ?? this.#arrayNodes.length) {
      if (this.#auxiliaryTree) {
        const valueTargetNode = this.#auxiliaryTree.value;

        this.#arrayNodes.push(this.#auxiliaryTree);

        this.#auxiliaryTree = this.#auxiliaryTree.left;

        return { value: valueTargetNode, done: false };
      } else {
        const treeNode = this.#arrayNodes.pop();

        if (treeNode) {
          this.#auxiliaryTree = treeNode;
          this.#auxiliaryTree = this.#auxiliaryTree.right;
        }
      }
    }

    return { value: undefined, done: true };
  }

  [Symbol.iterator](): IDepthForwardIterator<T> {
    return this;
  }
}

export default DepthForwardIterator;
