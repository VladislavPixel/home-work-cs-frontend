import Iterator from "../modules/iterator";
import LinkedList from "../modules/linked-list";
import type { IIterator, ILinkedList } from "../types/interfaces";

describe("Проверяю класс итератора: ", () => {
  test("Создаю экземпляр.", () => {
    const list: ILinkedList = new LinkedList();

    const iterator: IIterator = new Iterator(list);

    expect(iterator[Symbol.iterator]).toBeDefined();
    expect(iterator.next).toBeDefined();
  });

  test("Вызываю метод [Symbol.iterator] для проверки возвращаемого значения.", () => {
    const list: ILinkedList = new LinkedList();

    const iterator: IIterator = new Iterator(list);

    expect(iterator[Symbol.iterator]()).toEqual(iterator);
  });

  test("Вызываю метод next для проверки возвращаемого значения на основе пустого связанного списка.", () => {
    const list: ILinkedList = new LinkedList();

    const iterator: IIterator = new Iterator(list);

    expect(iterator.next()).toEqual({
      value: { value: undefined, key: undefined },
      done: true
    });
  });

  test("Вызываю метод next для проверки возвращаемого значения не на пустом LinkedList.", () => {
    const list: ILinkedList = new LinkedList();

    list.addFirst("11", 155);
    list.addFirst("999", 66);

    const iterator: IIterator = new Iterator(list);

    expect(iterator.next()).toEqual({
      value: { value: 66, key: "999" },
      done: false
    });
    expect(iterator.next()).toEqual({
      value: { value: 155, key: "11" },
      done: false
    });
    expect(iterator.next()).toEqual({
      value: { value: undefined, key: undefined },
      done: true
    });
  });

  test("Итерирую итератор в цикле.", () => {
    const nextMock = jest.spyOn(Iterator.prototype, "next");

    const list: ILinkedList = new LinkedList();

    list.addFirst("11", 155);
    list.addFirst("999", 66);

    const iterator: IIterator = new Iterator(list);

    for (const nodeInfo of iterator) {
      console.log(nodeInfo);
    }

    expect(nextMock).toHaveBeenCalledTimes(3);
  });
});
