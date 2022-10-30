import type { ILinkedList, IIterator } from "../types/interfaces";
import LinkedList from "../modules/linked-list";
import Iterator from "../modules/iterator";

describe("Проверяю модуль связанного списка - LinkedList: ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Создаю экземпляр.", () => {
    const list: ILinkedList = new LinkedList();

    expect(list.first).toBeDefined();
    expect(list.first).toBeNull();
    expect(list[Symbol.iterator]).toBeDefined();
    expect(list.addFirst).toBeDefined();
  });

  test("Вызываю метод [Symbol.iterator].", () => {
    const list: ILinkedList = new LinkedList();

    const iterator: IIterator = new Iterator(list);

    expect(list[Symbol.iterator]()).toEqual(iterator);
  });

  test("Добавляю элемент в начало.", () => {
    const list: ILinkedList = new LinkedList();

    const testResult = {
      key: "name",
      value: "Max",
      next: {
        key: "age",
        value: 42,
        next: null
      }
    };

    expect(list.first).toBe(null);
    expect(list.addFirst("age", 42)).toBe(1);
    expect(list.addFirst("name", "Max")).toBe(2);
    expect(list.first).toEqual(testResult);
  });

  test("Итерирую LinkedList.", () => {
    const nextMock = jest.spyOn(Iterator.prototype, "next");

    const list: ILinkedList = new LinkedList();

    list.addFirst("age", 55);
    list.addFirst("name", "Max");
    list.addFirst("car", "honda");
    list.addFirst("11", 155);
    list.addFirst("999", 66);

    for (const nodeInfo of list) {
      console.log(nodeInfo);
    }

    expect(nextMock).toHaveBeenCalledTimes(6);
  });

  test("Итерирую итератор, возвращаемый из [Symbol.iterator] у связанного списка.", () => {
    const nextMock = jest.spyOn(Iterator.prototype, "next");

    const list: ILinkedList = new LinkedList();

    list.addFirst("age", 55);
    list.addFirst("name", "Max");
    list.addFirst("car", "honda");
    list.addFirst("11", 155);
    list.addFirst("999", 66);

    const iterator: IIterator = list[Symbol.iterator]();

    for (const nodeInfo of iterator) {
      console.log(nodeInfo);
    }

    expect(nextMock).toHaveBeenCalledTimes(6);
  });
});
