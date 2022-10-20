import HashMap from "../modules/hash-map";
import LinkedList from "../modules/linked-list";
import type { IHashMap } from "../types/interfaces";

describe("Проверяю HashMap: ", () => {
  test("Создаю экземпляр.", () => {
    const map: IHashMap = new HashMap();

    expect(map.get).toBeDefined();
    expect(map.set).toBeDefined();
    expect(map.length).toBeDefined();
    expect(map.length).toBe(0);
  });

  test("Добавляю новые элементы.", () => {
    const addFirstMock = jest.spyOn(LinkedList.prototype, "addFirst");

    const map: IHashMap = new HashMap();

    expect(map.set("name", "Vladislav")).toBe(1);
    expect(map.set(55, 71)).toBe(2);
    expect(map.set({ name: "Max", lastName: "Barov" }, "Max")).toBe(3);
    expect(addFirstMock).toHaveBeenCalledTimes(3);
  });

  test("Получаю значения по ключу.", () => {
    const map: IHashMap = new HashMap();

    map.set("name", "Vladislav");
    map.set(55, 71);
    map.set({ name: "Max", lastName: "Barov" }, "Max");

    expect(map.get("name")).toBe("Vladislav");
    expect(map.get(55)).toBe(71);
    expect(map.get({ name: "Max", lastName: "Barov" })).toBe("Max");
    expect(map.get("car")).toBeUndefined();
  });
});
