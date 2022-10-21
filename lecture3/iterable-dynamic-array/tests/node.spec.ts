import type { INode } from "../types/interfaces";
import Node from "../modules/node";

describe("Проверяю модуль узла - Node: ", () => {
  test("Создаю экземпляр узла.", () => {
    const node: INode = new Node(3);

    expect(node.next).toBeNull();
    expect(node.value).toBeInstanceOf(Array);
    expect(node.value.length).toBe(3);
  });
});
