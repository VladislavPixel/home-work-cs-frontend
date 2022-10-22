import type { IBinaryTreeSet } from "../types/interfaces";
import BinaryTreeSet from "../modules/binary-tree-set";

describe("Проверяю бинарное дерево: ", () => {
  test("Создаю экземпляр.", () => {
    const binaryTreeSet: IBinaryTreeSet = new BinaryTreeSet([
      -432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98
    ]);

    expect(binaryTreeSet.has).toBeDefined();
  });

  test("Вызываю метод has, проверяя присутсвтие или отсутствие значения в дереве.", () => {
    const binaryTreeSet: IBinaryTreeSet = new BinaryTreeSet([
      -432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98
    ]);

    expect(binaryTreeSet.has(-1)).toBe(false);
    expect(binaryTreeSet.has(-500)).toBe(false);
    expect(binaryTreeSet.has(100)).toBe(false);
    expect(binaryTreeSet.has(-5)).toBe(false);
    expect(binaryTreeSet.has(432)).toBe(false);
    expect(binaryTreeSet.has(-432)).toBe(true);
    expect(binaryTreeSet.has(0)).toBe(true);
    expect(binaryTreeSet.has(1)).toBe(true);
    expect(binaryTreeSet.has(2)).toBe(true);
    expect(binaryTreeSet.has(3)).toBe(true);
    expect(binaryTreeSet.has(4)).toBe(true);
    expect(binaryTreeSet.has(5)).toBe(true);
    expect(binaryTreeSet.has(6)).toBe(true);
    expect(binaryTreeSet.has(98)).toBe(true);
  });
});
