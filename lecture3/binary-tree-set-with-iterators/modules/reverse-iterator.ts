import type {
  ITraversalIterator,
  ITreeNode,
  TypeNextResultForIterators
} from "../types/interfaces";

class ReverseIterator<T> implements ITraversalIterator<T> {
  #binaryTree: null | ITreeNode<T>;

  #length: number;

  #auxiliaryTree: null | ITreeNode<T>;

  #arrayNodes: Array<ITreeNode<T>>;

  #lastWorkTreeNode: null | ITreeNode<T>;

  constructor(tree: null | ITreeNode<T>, length: number) {
    this.#binaryTree = tree;
    this.#length = length;
    this.#arrayNodes = [];
    this.#auxiliaryTree = this.#binaryTree;
    this.#lastWorkTreeNode = null;
  }

  next(): TypeNextResultForIterators<T> {
    if (this.#length === 0) {
      return { value: undefined, done: true };
    }

    while (this.#auxiliaryTree ?? this.#arrayNodes.length) {
      if (this.#auxiliaryTree) {
        this.#arrayNodes.push(this.#auxiliaryTree);

        this.#auxiliaryTree = this.#auxiliaryTree.left;
      } else {
        const auxiliaryLastElement =
          this.#arrayNodes[this.#arrayNodes.length - 1];

        if (
          auxiliaryLastElement?.right &&
          auxiliaryLastElement.right !== this.#lastWorkTreeNode
        ) {
          this.#auxiliaryTree = auxiliaryLastElement.right;
        } else {
          const treeNode = this.#arrayNodes.pop();

          if (treeNode) {
            this.#lastWorkTreeNode = treeNode;

            return { value: this.#lastWorkTreeNode.value, done: false };
          }
        }
      }
    }

    return { value: undefined, done: true };
  }

  [Symbol.iterator](): ITraversalIterator<T> {
    return this;
  }
}

export default ReverseIterator;
