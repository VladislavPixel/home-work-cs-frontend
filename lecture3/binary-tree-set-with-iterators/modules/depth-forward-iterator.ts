import type { ITraversalIterator, ITreeNode, TypeNextResultForIterators } from "../types/interfaces";

class DepthForwardIterator<T> implements ITraversalIterator<T> {
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

  next(): TypeNextResultForIterators<T> {
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

  [Symbol.iterator](): ITraversalIterator<T> {
    return this;
  }
}

export default DepthForwardIterator;
