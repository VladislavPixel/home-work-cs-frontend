import type { ITreeNode } from "../types/interfaces";

class TreeNode<T> implements ITreeNode<T> {
  value: T;

  left: null | ITreeNode<T>;

  right: null | ITreeNode<T>;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default TreeNode;
