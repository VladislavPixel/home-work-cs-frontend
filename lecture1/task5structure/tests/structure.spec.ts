import Structure from "../module/structure";
import type { IStructure } from "../interface/i-structure";

describe("Проверяю модуль - Structure:", () => {
  test("Создаю экземпляр структуры.", () => {
    const structure: IStructure = new Structure(["name", "lastName", "age"]);

    expect(structure.get).toBeDefined();
    expect(structure.set).not.toBe(undefined);
  });

  test("Устанавливаю значение для символического ключа.", () => {
    const structure: IStructure = new Structure(["name", "lastName", "age"]);

    expect(structure.set("name", "Vlad").get("name")).toBe("Vlad");
    expect(structure.set("age", 24).get("age")).toBe(24);
    expect(() => structure.set("car", "ford")).toThrow("key is not found");
  });

  test("Получаю значение по символическому ключу.", () => {
    const structure: IStructure = new Structure(["name", "lastName", "age"]);

    expect(structure.set("name", "Mark").get("name")).toBe("Mark");
    expect(() => structure.get("vvv")).toThrow("key is not found");
  });
});
