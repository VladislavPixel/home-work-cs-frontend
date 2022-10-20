import Vector from "../modules/vector";
import type { IVector } from "../types/interfaces";

describe("Проверяю модуль Vector: ", () => {
  test("Создаю экземпляр динамически расширяемого массива (вектор).", () => {
    const arr: IVector = new Vector(2);

    expect(arr.add).toBeDefined();
    expect(arr.get).toBeDefined();
    expect(arr.length).toBe(0);
  });

  test("Добавляю элементы.", () => {
    const arr: IVector = new Vector(2);

    expect(arr.add(5)).toBe(1);
    expect(arr.add(10)).toBe(2);
    expect(arr.add(100)).toBe(3);
    expect(arr.add(90)).toBe(4);
    expect(arr.add(2000)).toBe(5);
  });

  test("Добавляю элементы в массив с 0 capacity value.", () => {
    const arr: IVector = new Vector(0);

    expect(() => arr.add(900)).toThrow(
      "Operation `add` is not supported in Vector with capacity value 0."
    );
  });

  test("Получаю элемент по индексу.", () => {
    const arr: IVector = new Vector(2);

    expect(arr.get(0)).toBe(undefined);
    expect(arr.get(-10)).toBe(undefined);
    expect(arr.get(10)).toBe(undefined);

    arr.add(900);
    arr.add(5);
    arr.add(78);
    arr.add(156);
    arr.add(33);
    arr.add(88);
    arr.add(11111);

    expect(arr.get(4)).toBe(33);
    expect(arr.get(6)).toBe(11111);
    expect(arr.get(7)).toBe(undefined);
    expect(arr.get(0)).toBe(900);
  });
});
