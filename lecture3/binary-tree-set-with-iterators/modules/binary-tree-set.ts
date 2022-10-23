import type {
  IBinaryTreeSet,
  ITreeNode,
	ITraversalIterator
} from "../types/interfaces";
import TreeNode from "./tree-node";
import DepthForwardIterator from "./depth-forward-iterator";
import IteratorToWidth from "./iterator-to-width";
import SymmetricalIterator from "./symmetrical-iterator";
import ReverseIterator from "./reverse-iterator";

class BinaryTreeSet<T> implements IBinaryTreeSet<T> {
  #length: number;

  #root: null | ITreeNode<T>;

  constructor(arr: T[]) {
    this.#length = 0;
    this.#root = null;
    this.#builder(arr);
  }

  #builder(arr: T[]): void {
    const stack = [];

    for (let m = 0; m < arr.length; m++) {
      if (this.#length === 0) {
        const newNode = new TreeNode(arr[m]);

        this.#root = newNode;

        stack.push(this.#root);

        this.#length++;
      } else {
        if (!this.has(arr[m])) {
          const newNode = new TreeNode(arr[m]);

          stack.push(newNode);

          const firstElement = stack[0];

          if (!firstElement.left) {
            firstElement.left = newNode;
          } else if (!firstElement.right) {
            firstElement.right = newNode;
          } else {
            stack.shift();

            const newFirstEl = stack[0];

            newFirstEl.left = newNode;
          }

          this.#length++;
        }
      }
    }
	}

	getIteratorForBreadthTraversal(): ITraversalIterator<T> {
		return new IteratorToWidth(this.#root, this.#length);
	}

  getIteratorForDirectDepthTraversal(): ITraversalIterator<T> {
    return new DepthForwardIterator(this.#root, this.#length);
	}
	
	getIteratorForSymmetricalTraversal(): ITraversalIterator<T> {
		return new SymmetricalIterator(this.#root, this.#length);
	}

	getIteratorForReverseTraversal(): ITraversalIterator<T> {
		return new ReverseIterator(this.#root, this.#length);
	}

  has(searchValue: T): boolean {
    if (this.#length === 0) {
      return false;
    }

    for (const value of this.getIteratorForDirectDepthTraversal()) {
      if (value === searchValue) {
        return true;
      }
    }

    return false;
  }
}

export default BinaryTreeSet;
