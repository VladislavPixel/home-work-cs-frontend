import type { ILinkedList, INode } from "../types/interfaces";
import LinkedList from "../modules/linked-list";
import Node from "../modules/node";

describe("Проверяю модуль связанного списка - LinkedList: ", () => {
  test("Создаю экземпляр.", () => {
    const list: ILinkedList = new LinkedList(3);

    const node: INode = new Node(3);

    expect(list.total).toBe(0);
    expect(list.addLast).toBeDefined();
    expect(list.findElementByIndex).toBeDefined();
    expect(list.first).toBeDefined();
    expect(list.tail).toBeDefined();
    expect(list.first).toEqual(node);
    expect(list.tail).toEqual(node);
  });

  test("Добавляю элементы в список с 0 capacityValueForArr.", () => {
    const list: ILinkedList = new LinkedList(0);

    expect(() => list.addLast(100)).toThrow(
      "method `addLast` is not supported in LinkedList with 0 capacity array"
    );
  });

  test("Добавляю элементы в список не с нулевым capacityValueForArr.", () => {
    const list: ILinkedList = new LinkedList(3);

    const node: INode = new Node(3);
    [500, 1000, 3].forEach((value, index) => {
      node.value[index] = value;
    });

    const node2: INode = new Node(3);
    [5, 13, 22].forEach((value, index) => {
      node2.value[index] = value;
    });

    const node3: INode = new Node(3);
    node3.value[0] = 777;

    expect(list.addLast(500)).toBe(1);
    expect(list.addLast(1000)).toBe(2);
    expect(list.addLast(3)).toBe(3);

    expect(list.first).toEqual(node);
    expect(list.tail).toEqual(node);

    expect(list.addLast(5)).toBe(4);
    expect(list.addLast(13)).toBe(5);
    expect(list.addLast(22)).toBe(6);

    expect(list.tail).toEqual(node2);
    node.next = node2;
    expect(list.first).toEqual(node);

    expect(list.addLast(777)).toBe(7);

    expect(list.tail).toEqual(node3);
    node2.next = node3;
    expect(list.first).toEqual(node);

    expect(list.total).toBe(7);
  });

  test("Получаю значение из LinkedList по индексу.", () => {
    const list: ILinkedList = new LinkedList(3);

    list.addLast(500);
    list.addLast(1000);
    list.addLast(3);
    list.addLast(5);
    list.addLast(13);
    list.addLast(22);

    expect(list.total).toBe(6);

    expect(list.findElementByIndex(5)).toBe(22);
    expect(list.findElementByIndex(4)).toBe(13);
    expect(list.findElementByIndex(3)).toBe(5);
    expect(list.findElementByIndex(2)).toBe(3);
    expect(list.findElementByIndex(1)).toBe(1000);
    expect(list.findElementByIndex(0)).toBe(500);

    expect(list.findElementByIndex(100)).toBeUndefined();
    expect(list.findElementByIndex(-1)).toBeUndefined();
    expect(list.findElementByIndex(6)).toBe(undefined);

    expect(list.findElementByIndex(3)).toBe(5);
  });
});
