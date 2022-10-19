import type { IDynamicArray } from "../types/interfaces";
import DynamicArray from "../modules/dynamic-array";

describe("Проверяю модуль динамического массива - DynamicArray: ", () => {
  test("Создаю экземпляр.", () => {
    const arr: IDynamicArray = new DynamicArray(3);

    expect(arr.length).toBe(0);
    expect(arr.add).toBeDefined();
    expect(arr.get).toBeDefined();
  });

  test("Добавляю элемент в динамический массив не с нулевым capacity value.", () => {
    const arr: IDynamicArray = new DynamicArray(3);

    expect(arr.add(777)).toBe(1);
    expect(arr.add(100)).toBe(2);
    expect(arr.add(123)).toBe(3);
    expect(arr.add(1)).toBe(4);
  });

  test("Добавляю элемент в динамический массив с 0 capacity value.", () => {
    const arr: IDynamicArray = new DynamicArray(0);

    expect(() => arr.add(900)).toThrow(
      "method `add` is not supported in DynamicArray with 0 capacity value"
    );
  });

  test("Получаю элементы по индексу.", () => {
    const arr: IDynamicArray = new DynamicArray(3);

    arr.add(500);
    arr.add(600);
    arr.add(1);
    arr.add(7);

    expect(arr.get(-10)).toBe(undefined);
    expect(arr.get(900)).toBe(undefined);
    expect(arr.get(1)).toBe(600);
    expect(arr.get(3)).toBe(7);
  });
});
