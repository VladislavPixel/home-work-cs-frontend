import type { INode, IData } from "../types/interfaces";

class Node<T> implements INode<T> {
  childArray: Array<INode<T> | null>;

  dataArray: Array<IData<T> | null>;

  dataLength: number;

  parent: INode<T>;

  constructor(totalValue: number) {
    this.childArray = new Array(totalValue);
    this.dataArray = new Array(totalValue - 1);
    this.dataLength = 0;
    this.parent = this;
  }

  insertData(dataObject: IData<T>): number {
    this.dataLength++;

    for (let v = this.dataArray.length - 1; v >= 0; v--) {
      if (!this.dataArray[v]) {
        continue;
      } else {
        const targetKey = this.dataArray[v]!.key;

        if (targetKey > dataObject.key) {
          this.dataArray[v + 1] = this.dataArray[v];
        } else {
          this.dataArray[v + 1] = dataObject;

          return v + 1;
        }
      }
    }

    this.dataArray[0] = dataObject;

    return 0;
  }

  connectChild(node: INode<T>, index?: number): void {
    if (node) {
      node.parent = this;
    }

    if (index !== undefined) {
      if (!this.childArray[index]) {
        this.childArray[index] = node;

        return;
      }

      for (let v = this.childArray.length - 1; v >= 0; v--) {
        if (!this.childArray[v]) {
          continue;
        } else {
          this.childArray[v + 1] = this.childArray[v];

          if (index === v) {
            this.childArray[v] = node;

            break;
          }
        }
      }
    } else {
      for (let v = (this.childArray.length - 1) / 2; v >= 0; v--) {
        if (!this.childArray[v]) {
          if (v === 0) {
            this.childArray[v] = node;
          }

          continue;
        } else {
          const isData = (data: unknown): data is IData<T> => {
            if (!data) {
              return false;
            }

            return typeof data === "object" && "key" in data && "value" in data;
          };

          if (
            isData(node.dataArray[0]) &&
            isData(this.childArray[v]!.dataArray[0]) &&
            node.dataArray[0].key < this.childArray[v]!.dataArray[0]!.key
          ) {
            this.childArray[v + 1] = this.childArray[v];
          } else {
            this.childArray[v + 1] = node;

            break;
          }

          if (v === 0) {
            this.childArray[v] = node;
          }
        }
      }
    }
  }

  disconnectChild(index: number): null | INode<T> {
    const deleteNode = this.childArray[index];

    this.childArray[index] = null;

    return deleteNode;
  }

  removeData(indexDeleted: number): null | IData<T> {
    const deleteData = this.dataArray[indexDeleted];

    this.dataArray[indexDeleted] = null;

    this.dataLength--;

    return deleteData;
  }
}

export default Node;
