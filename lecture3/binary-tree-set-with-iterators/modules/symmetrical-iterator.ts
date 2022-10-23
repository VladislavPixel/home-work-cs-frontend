import type { ITreeNode, ITraversalIterator, TypeNextResultForIterators } from "../types/interfaces";

class SymmetricalIterator<T> implements ITraversalIterator<T> {
	#binaryTree: null | ITreeNode<T>;

	#length: number;

	#auxiliaryTree: null | ITreeNode<T>;

	#arrayNodes: Array<ITreeNode<T>>;

	constructor(tree: null | ITreeNode<T>, length: number) {
		this.#binaryTree = tree;
		this.#length = length;
		this.#arrayNodes = [];
		this.#auxiliaryTree = this.#binaryTree;
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
				const nodeTree = this.#arrayNodes.pop();

				if (nodeTree) {
					this.#auxiliaryTree = nodeTree.right;

					return { value: nodeTree.value, done: false };
				}
			}
		}

		return { value: undefined, done: true };
	}

	[Symbol.iterator](): ITraversalIterator<T> {
		return this;
	}
}

export default SymmetricalIterator;
