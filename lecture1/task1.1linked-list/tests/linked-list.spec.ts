import type { ILinkedList } from "../types/interfaces";
import LinkedList from "../modules/linked-list";
import Node from "../modules/node";
import IteratorLinkedList from "../modules/iterator-linked-list";

describe("Проверка модуля - LinkedList:", () => {
  test("Создаю экземпляр.", () => {
    const list: ILinkedList = new LinkedList();

    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
    expect(list.add).toBeDefined();
    expect(list.addFirst).toBeDefined();
    expect(list.deleteFirst).not.toBe(undefined);
    expect(list.deleteLast).toBeDefined();
    expect(list.findNodeByValue).toBeDefined();
    expect(list.display).toBeDefined();
  });

  test("Добавляю элемент в начало.", () => {
    const list: ILinkedList = new LinkedList();

    expect(list.addFirst(255)).toBe(1);
    expect(list.addFirst(600)).toBe(2);
    expect(list.first!.value).toBe(600);
    expect(list.first!.next!.value).toBe(255);
  });

  test("Добавляю элемент в конец.", () => {
    const list: ILinkedList = new LinkedList();

    expect(list.add(777)).toBe(1);
    expect(list.add(888)).toBe(2);
    expect(list.add(10000)).toBe(3);
    expect(list.first!.value).toBe(777);
    expect(list.first!.next!.value).toBe(888);
  });

  test("Удаляю первый элемент.", () => {
    const list: ILinkedList = new LinkedList();

    expect(() => list.deleteFirst()).toThrow(
      "LinkedList is Empty, operation `deleteFirst` is not supported!"
    );

    list.add(155);
    list.add(200);

    expect(list.deleteFirst().value).toBe(155);
    expect(list.deleteFirst().value).toBe(200);
  });

  test("Удаляю последний элемент.", () => {
    const list: ILinkedList = new LinkedList();

    expect(() => list.deleteLast()).toThrow(
      "LinkedList is Empty, operation `deleteLast` is not supported!"
    );

    list.add(900);
    list.addFirst(25);

    expect(list.deleteLast().value).toBe(900);
    expect(list.deleteLast().value).toBe(25);
  });

  test("Ищу узел со значением 666 и узел со значением 1.", () => {
    const list: ILinkedList = new LinkedList();

    expect(() => list.findNodeByValue(666)).toThrow(
      "LinkedList is Empty, operation `findNodeByValue` is not supported!"
    );

    list.add(155);
    list.add(33);
    list.add(666);

    expect(list.findNodeByValue(666)!.value).toBe(666);
    expect(list.findNodeByValue(1)).toBeNull();
  });

  test("Вызываю метод display у связанного списка.", () => {
    const list: ILinkedList = new LinkedList();

    const displayNodeMock = jest.spyOn(Node.prototype, "displayNode");
    const nextMock = jest.spyOn(IteratorLinkedList.prototype, "next");

    list.add(1);
    list.add(5);
    list.add(12234);
    list.add(999);

    list.display();

    expect(displayNodeMock).toHaveBeenCalledTimes(4);
    expect(nextMock).toHaveBeenCalledTimes(5);
  });
});
