import HashMap from "../modules/hash-map";
import LinkedList from "../modules/linked-list";
import IteratorHashMap from "../modules/iterator-hash-map";
import type { IHashMap } from "../types/interfaces";

describe("Проверяю HashMap: ", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Создаю экземпляр.", () => {
    const map: IHashMap = new HashMap();

    expect(map.get).toBeDefined();
    expect(map.set).toBeDefined();
    expect(map.length).toBeDefined();
    expect(map.length).toBe(0);
    expect(map[Symbol.iterator]).toBeDefined();
    expect(map.keys).toBeDefined();
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

  test("Итерирую HashMap в цикле.", () => {
    const nextMock = jest.spyOn(IteratorHashMap.prototype, "next");

    const map: IHashMap = new HashMap();

    for (const nodeInfo of map) {
      console.log(nodeInfo);
    }

    expect(nextMock).toBeCalled();
  });

  test("Вызываю метод .keys().", () => {
    const map: IHashMap = new HashMap();

    expect([...map.keys()]).toEqual([]);

    map.set("name", "Vladislav");
    map.set(155, 71);
    map.set("age", 24);
    map.set({ vvv: 145 }, "pixel.");

    expect([...map.keys()]).toEqual(["155", "name", '{"vvv":145}', "age"]);
  });
});
