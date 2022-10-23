import type { ITraversalIterator, ITreeNode, TypeNextResultForIterators } from "../types/interfaces";

class IteratorToWidth<T> implements ITraversalIterator<T> {
	#binaryTree: null | ITreeNode<T>;

	#length: number;

	#arrayNodes: Array<ITreeNode<T>>;

	constructor(tree: null | ITreeNode<T>, length: number) {
		this.#binaryTree = tree;
		this.#length = length;
		this.#arrayNodes = [];
		(() => {
			if (this.#binaryTree) {
				this.#arrayNodes.push(this.#binaryTree);
			}
		})()
	}

	next(): TypeNextResultForIterators<T> {
		if (this.#length === 0) {
			return { value: undefined, done: true };
		}

		while (this.#arrayNodes.length !== 0) {
			const targetElement = this.#arrayNodes.shift();

			if (targetElement) {
				if (targetElement.left) {
					this.#arrayNodes.push(targetElement.left);
				}

				if (targetElement.right) {
					this.#arrayNodes.push(targetElement.right);
				}

				return { value: targetElement.value, done: false };
			}
		}

		return { value: undefined, done: true };
	}

	[Symbol.iterator](): ITraversalIterator<T> {
		return this;
	}
}

export default IteratorToWidth;
