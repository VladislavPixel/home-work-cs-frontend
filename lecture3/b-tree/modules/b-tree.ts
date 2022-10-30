import Node from "./node-tree";
import type { IBTree, INode, IData } from "../types/interfaces";

interface TypeResultSplitForDataArray<T> {
  newRightNode: INode<T>;
  index: number;
  middleData: IData<T>;
}

interface TypeResultGgetNextChildForDive<T> {
  child: null | INode<T>;
  index: number;
}

type TypeNodeForSplitData<T, A extends INode<T>> = {
  [G in keyof A]: G extends "dataArray"
    ? Array<IData<T>>
    : G extends "removeData"
    ? (indexDeleted: number) => IData<T>
    : A[G];
};

class BTree<T> implements IBTree<T> {
  #total: number;

  #counterElements: number;

  #root: INode<T>;

  constructor(totalValue: number = 5) {
    this.#total = totalValue;
    this.#counterElements = 0;
    this.#root = new Node(this.#total);
  }

  #splitForDataArray<
    A extends TypeNodeForSplitData<T, INode<T>>,
    B extends IData<T>
  >(node: A, dataObject: B): TypeResultSplitForDataArray<T> {
    const newRightNode: INode<T> = new Node(this.#total);

    const index = (this.#total - 1) / 2;

    const middleData =
      dataObject.key > node.dataArray[index].key
        ? node.removeData(index)
        : dataObject.key < node.dataArray[index - 1].key
        ? node.removeData(index - 1)
        : dataObject;

    if (middleData === dataObject || !node.dataArray[index - 1]) {
      for (let v = index; v < this.#total - 1; v++) {
        newRightNode.insertData(node.removeData(v));
      }

      if (!node.dataArray[index - 1]) {
        node.insertData(dataObject);
      }
    } else if (!node.dataArray[index]) {
      let v = index + 1;

      let isAdd = false;

      while (true) {
        if (dataObject.key < node.dataArray[v].key && !isAdd) {
          newRightNode.insertData(dataObject);

          isAdd = true;
        } else {
          newRightNode.insertData(node.removeData(v));

          v++;
        }

        if (v === this.#total - 1 && newRightNode.dataLength !== index) {
          newRightNode.insertData(dataObject);
        }

        if (newRightNode.dataLength === index) {
          break;
        }
      }
    }

    return { newRightNode, index, middleData };
  }

  #split<
    A extends TypeNodeForSplitData<T, INode<T>>,
    B extends IData<T>,
    C extends number
  >(node: A, dataObject: B, indexSplitChild: C): INode<T> {
    const { newRightNode, index, middleData } = this.#splitForDataArray(
      node,
      dataObject
    );

    if (node === this.#root) {
      const newRoot: INode<T> = new Node(this.#total);

      newRoot.insertData(middleData);

      newRoot.connectChild(node, 0);
      newRoot.connectChild(newRightNode, 1);

      this.#root = newRoot;

      return newRightNode;
    } else if (node.parent.dataLength < this.#total - 1) {
      const insertionIndex = node.parent.insertData(middleData);

      node.parent.connectChild(newRightNode, insertionIndex + 1);

      return newRightNode;
    } else {
      const correctParent = node.parent as TypeNodeForSplitData<T, INode<T>>;

      const newParentRight = this.#split(
        correctParent,
        middleData,
        indexSplitChild
      );

      const isCenter = indexSplitChild === index;

      const isLeft = indexSplitChild < index;

      const isRight = indexSplitChild > index;

      if (isLeft) {
        for (let v = index; v < this.#total; v++) {
          const nodeDisconnected = node.parent.disconnectChild(v);

          if (nodeDisconnected) {
            newParentRight.connectChild(nodeDisconnected, v - index);
          }
        }

        node.parent.connectChild(newRightNode);
      } else if (isCenter) {
        newParentRight.connectChild(newRightNode, 0);

        for (let v = index + 1; v < this.#total; v++) {
          const nodeDisconnected = node.parent.disconnectChild(v);

          if (nodeDisconnected) {
            newParentRight.connectChild(nodeDisconnected, v - index);
          }
        }
      } else if (isRight) {
        for (let v = index + 1; v < this.#total; v++) {
          if (indexSplitChild !== v) {
            const nodeDisconnected = node.parent.disconnectChild(v);

            if (nodeDisconnected) {
              newParentRight.connectChild(nodeDisconnected);
            }
          }
        }

        const nodeDisconnected = node.parent.disconnectChild(indexSplitChild);

        if (nodeDisconnected) {
          newParentRight.connectChild(nodeDisconnected);
        }

        newParentRight.connectChild(newRightNode);
      }

      return newRightNode;
    }
  }

  #getNextChildForDive(
    node: INode<T>,
    key: string
  ): TypeResultGgetNextChildForDive<T> {
    let v;

    for (v = 0; v < node.dataLength; v++) {
      if (node.dataArray[v] && key < node.dataArray[v]!.key) {
        return { child: node.childArray[v], index: v };
      }
    }

    return { child: node.childArray[v], index: v };
  }

  #insert(strKey: string, value: T): number {
    const dataElement: IData<T> = { key: strKey, value };

    let currentNode = this.#root;

    let indexForSplitChild = 0;

    while (true) {
      if (!currentNode.childArray[0]) {
        if (this.#total - 1 === currentNode.dataLength) {
          const correctData = currentNode as TypeNodeForSplitData<T, INode<T>>;

          this.#split(correctData, dataElement, indexForSplitChild);

          this.#counterElements++;

          return this.#counterElements;
        } else {
          break;
        }
      } else {
        const { child, index } = this.#getNextChildForDive(currentNode, strKey);

        if (child === null) {
          throw new Error("Child is not a B-tree node");
        }

        currentNode = child;

        indexForSplitChild = index;
      }
    }

    currentNode.insertData(dataElement);

    this.#counterElements++;

    return this.#counterElements;
  }

  #findByKey(
    strKey: string,
    currentNode: null | INode<T>
  ): -1 | null | IData<T> {
    if (!currentNode) {
      return -1;
    }

    const isLeaf = !currentNode.childArray[0];

    let m;

    for (m = 0; m < currentNode.dataLength; m++) {
      if (!currentNode.dataArray[m]) {
        return -1;
      }

      if (strKey === currentNode.dataArray[m]!.key) {
        return currentNode.dataArray[m];
      }

      if (strKey < currentNode.dataArray[m]!.key && !isLeaf) {
        return this.#findByKey(strKey, currentNode.childArray[m]);
      }

      if (
        (m === currentNode.dataLength - 1 ||
          strKey < currentNode.dataArray[m]!.key) &&
        isLeaf
      ) {
        return -1;
      }
    }

    return this.#findByKey(strKey, currentNode.childArray[m]);
  }

  #convertToString<A>(key: A): string {
    return typeof key === "string" ? key : JSON.stringify(key);
  }

  set<A>(key: A, value: T): number {
    const strKey = this.#convertToString(key);

    return this.#insert(strKey, value);
  }

  get<A>(key: A): T {
    const strKey = this.#convertToString(key);

    if (!this.#root.dataLength) {
      throw new Error("Operation get is not supported in Empty BTree...");
    }

    const result = this.#findByKey(strKey, this.#root);

    if (result === -1 || !result) {
      throw new Error("Element is not found in B-Tree...");
    }

    return result.value;
  }
}

export default BTree;
