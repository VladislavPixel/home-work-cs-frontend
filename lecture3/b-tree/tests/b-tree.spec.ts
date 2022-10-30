import type { IBTree } from "../types/interfaces";
import BTree from "../modules/b-tree";

describe("Проверяю класс B-Tree: ", () => {
  test("Создаю экземпляр B-дерева.", () => {
    const btree: IBTree = new BTree();

    expect(btree.set).toBeDefined();
    expect(btree.get).toBeDefined();
  });

  test("Проверяю метод set.", () => {
    const btree: IBTree = new BTree();

    expect(btree.set("foo", "bar")).toBe(1);
    expect(btree.set("agent", 7)).toBe(2);
    expect(btree.set("shoko", "blum")).toBe(3);
    expect(btree.set("crocop", 999)).toBe(4);
    expect(btree.set(10, 999)).toBe(5);
    expect(btree.set("ziza", 1000)).toBe(6);
    expect(btree.set("www", "internet")).toBe(7);
    expect(btree.set("xerox", "12435")).toBe(8);
    expect(btree.set(155, "car")).toBe(9);
    expect(btree.set(144, "mom")).toBe(10);
    expect(btree.set(147, 777)).toBe(11);
    expect(btree.set(17, "viova")).toBe(12);
    expect(btree.set(19, "lol")).toBe(13);
    expect(btree.set(13, "пятницуа")).toBe(14);
    expect(btree.set("vlad", "developer")).toBe(15);
    expect(btree.set("bitrix", "computer")).toBe(16);
    expect(btree.set("11", "santa")).toBe(17);
    expect(btree.set(199, "space")).toBe(18);
    expect(btree.set(200, "spaceX")).toBe(19);
    expect(btree.set("gringolds", "viva")).toBe(20);
    expect(btree.set("yyy", "glaz")).toBe(21);
    expect(btree.set("xander", "glaz")).toBe(22);
    expect(btree.set("157", "glaz")).toBe(23);
    expect(btree.set("158", "glaz")).toBe(24);
  });

  test("Проверяю метод get.", () => {
    const btree: IBTree = new BTree();

    btree.set("foo", "vca");
    btree.set(10, { name: "Vlad" });
    btree.set("age", 24);
    btree.set("car", "mazda");
    btree.set("agent", 777);
    btree.set("gun", "gun");

    expect(btree.get("age")).toBe(24);
    expect(btree.get("foo")).toBe("vca");
    expect(btree.get(10)).toEqual({ name: "Vlad" });
    expect(btree.get("car")).toBe("mazda");
    expect(btree.get("agent")).toBe(777);
    expect(btree.get("gun")).toBe("gun");
  });
});
