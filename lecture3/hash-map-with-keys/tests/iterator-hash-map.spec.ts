import HashMap from "../modules/hash-map";
import IteratorHashMap from "../modules/iterator-hash-map";
import type { IIteratorHashMap, IHashMap } from "../types/interfaces";

describe("Проверяю итератор для HashMap - IteratorHashMap: ", () => {
  test("Создаю экземпляр.", () => {
    const map: IHashMap = new HashMap();

    const iterator: IIteratorHashMap = map[Symbol.iterator]();

    expect(iterator[Symbol.iterator]).toBeDefined();
    expect(iterator.next).toBeDefined();
  });

  test("Вызываю метод [Symbol.iterator].", () => {
    const map: IHashMap = new HashMap();

    const iterator: IIteratorHashMap = map[Symbol.iterator]();

    expect(iterator[Symbol.iterator]()).toEqual(iterator);
  });

  test("Вызываю метод next на пустом HashMap.", () => {
    const map: IHashMap = new HashMap();

    const iterator: IIteratorHashMap = map[Symbol.iterator]();

    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("Вызываю метод next не на пустом HashMap.", () => {
    const map: IHashMap = new HashMap();

    map.set("age", 24);
    map.set(155, 160);

    const iterator: IIteratorHashMap = map[Symbol.iterator]();

    expect(iterator.next()).toEqual({
      value: { value: 160, key: "155" },
      done: false
    });
    expect(iterator.next()).toEqual({
      value: { value: 24, key: "age" },
      done: false
    });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("Итерирую в цикле объект итератора.", () => {
    const nextMock = jest.spyOn(IteratorHashMap.prototype, "next");

    const map: IHashMap = new HashMap();

    map.set("age", 24);
    map.set(155, 160);

    const iterator: IIteratorHashMap = map[Symbol.iterator]();

    for (const nodeInfo of iterator) {
      console.log(nodeInfo);
    }

    expect(nextMock).toHaveBeenCalled();
  });
});
