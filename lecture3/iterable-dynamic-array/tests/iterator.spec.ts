import Iterator from "../modules/iterator";
import DynamicArray from "../modules/dynamic-array";
import type { IIteratorDynamicArray, IDynamicArray } from "../types/interfaces";

describe("Проверяю модуль итератора: ", () => {
  test("Создаю экземпляр.", () => {
    const arr: IDynamicArray = new DynamicArray(3);

    const iterator: IIteratorDynamicArray = new Iterator(arr);

    expect(iterator.next).toBeDefined();
    expect(iterator[Symbol.iterator]).toBeDefined();
  });

  test("Вызываю метод [Symbol.iterator] для проверки возвращаемого результата.", () => {
    const arr: IDynamicArray = new DynamicArray(3);

    const iterator: IIteratorDynamicArray = new Iterator(arr);

    expect(iterator[Symbol.iterator]()).toEqual(iterator);
  });

  test("Итерирую сам объект итератор.", () => {
    const nextMock = jest.spyOn(Iterator.prototype, "next");

    const arr: IDynamicArray = new DynamicArray(3);

    arr.add(500);
    arr.add(4);
    arr.add(1);
    arr.add(25);

    const iterator: IIteratorDynamicArray = new Iterator(arr);

    for (const value of iterator) {
      console.log(value);
    }

    expect(nextMock).toHaveBeenCalledTimes(5);
  });

  test("Вызываю метод next у пустого итератора.", () => {
    const arr: IDynamicArray = new DynamicArray(3);

    const iterator: IIteratorDynamicArray = new Iterator(arr);

    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("Вызываю метод next не у пустого итератора.", () => {
    const arr: IDynamicArray = new DynamicArray(3);

    arr.add(500);
    arr.add(4);
    arr.add(1);
    arr.add(25);

    const iterator: IIteratorDynamicArray = new Iterator(arr);

    expect(iterator.next()).toEqual({ value: 500, done: false });
    expect(iterator.next()).toEqual({ value: 4, done: false });
    expect(iterator.next()).toEqual({ value: 1, done: false });
    expect(iterator.next()).toEqual({ value: 25, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });
});
