import type { INode } from "../types/interfaces";
import Node from "../modules/node-tree";

describe("Проверяю класс узла Б-дерева (Node): ", () => {
  test("Создаю экземпляр узла.", () => {
    const node: INode = new Node(5);

    expect(node.childArray).toBeDefined();
    expect(node.childArray.length).toBe(5);
    expect(node.dataArray).toBeDefined();
    expect(node.dataArray.length).toBe(4);
    expect(node.dataLength).toBeDefined();
    expect(node.dataLength).toBe(0);
    expect(node.parent).toBeDefined();
    expect(node.parent).toEqual(node);
    expect(node.insertData).toBeDefined();
    expect(node.connectChild).toBeDefined();
    expect(node.disconnectChild).toBeDefined();
    expect(node.removeData).toBeDefined();
  });

  test("Проверяю метод insertData.", () => {
    const node: INode = new Node(5);

    expect(node.insertData({ key: "120", value: "pixel" })).toBe(0);
    expect(node.insertData({ key: "111", value: { age: 24 } })).toBe(0);
    expect(node.dataArray[1]).toEqual({ key: "120", value: "pixel" });
    expect(node.insertData({ key: "150", value: 777 })).toBe(2);
    expect(node.insertData({ key: "130", value: 10000 })).toBe(2);
    expect(node.dataArray[3]).toEqual({ key: "150", value: 777 });
  });

  test("Проверяю метод removeData.", () => {
    const node: INode = new Node(5);

    node.insertData({ key: "120", value: "pixel" });
    node.insertData({ key: "111", value: { age: 24 } });
    node.insertData({ key: "150", value: 777 });
    node.insertData({ key: "130", value: 10000 });

    expect(node.removeData(0)).toEqual({ key: "111", value: { age: 24 } });
    expect(node.dataArray[0]).toBeNull();
    expect(node.removeData(3)).toEqual({ key: "150", value: 777 });
    expect(node.dataArray[3]).toBeNull();
    expect(node.dataLength).toBe(2);
  });

  test("Проверяю метод disconnectChild.", () => {
    const nodeRoot: INode = new Node(5);

    const node1: INode = new Node(5);
    const node2: INode = new Node(5);

    node1.insertData({ key: "10", value: 155 });
    node1.insertData({ key: "11", value: 256 });

    node2.insertData({ key: "foo", value: "bar" });
    node2.insertData({ key: "www", value: "color" });

    nodeRoot.connectChild(node1);
    nodeRoot.connectChild(node2);

    expect(nodeRoot.disconnectChild(1)).toEqual(node2);
    expect(nodeRoot.disconnectChild(0)).toEqual(node1);
    expect(nodeRoot.childArray[0]).toBeNull();
  });

  test("Проверяю метод connectChild с использованием индекса", () => {
    const nodeRoot: INode = new Node(5);

    const node1: INode = new Node(5);
    const node2: INode = new Node(5);

    node1.insertData({ key: "10", value: 155 });
    node1.insertData({ key: "11", value: 256 });

    node2.insertData({ key: "foo", value: "bar" });
    node2.insertData({ key: "www", value: "color" });

    nodeRoot.connectChild(node2, 0);
    nodeRoot.connectChild(node1, 1);

    expect(nodeRoot.childArray[0]).toEqual(node2);
    expect(nodeRoot.childArray[1]).toEqual(node1);
  });

  test("Проверяю метод connectChild без использования индекса. Узлы должны вставляться по порядку в зависимости от ключа 0 узла", () => {
    const nodeRoot: INode = new Node(5);

    const node1: INode = new Node(5);
    const node2: INode = new Node(5);

    node1.insertData({ key: "10", value: 155 });
    node1.insertData({ key: "11", value: 256 });

    node2.insertData({ key: "foo", value: "bar" });
    node2.insertData({ key: "www", value: "color" });

    nodeRoot.connectChild(node2);
    nodeRoot.connectChild(node1);

    expect(nodeRoot.childArray[0]).toEqual(node1);
    expect(nodeRoot.childArray[1]).toEqual(node2);
  });
});
