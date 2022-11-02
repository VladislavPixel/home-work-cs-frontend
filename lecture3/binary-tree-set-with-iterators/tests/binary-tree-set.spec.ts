import type { IBinaryTreeSet, ITraversalIterator } from "../types/interfaces";

import BinaryTreeSet from "../modules/binary-tree-set";
import DepthForwardIterator from "../modules/depth-forward-iterator";
import IteratorToWidth from "../modules/iterator-to-width";
import SymmetricalIterator from "../modules/symmetrical-iterator";
import ReverseIterator from "../modules/reverse-iterator";

describe("Проверяю бинарное дерево: ", () => {
  test("Создаю экземпляр.", () => {
    const binaryTreeSet: IBinaryTreeSet = new BinaryTreeSet([
      -432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98
    ]);

    expect(binaryTreeSet.has).toBeDefined();
    expect(binaryTreeSet.getIteratorForBreadthTraversal).toBeDefined();
    expect(binaryTreeSet.getIteratorForDirectDepthTraversal).toBeDefined();
    expect(binaryTreeSet.getIteratorForSymmetricalTraversal).toBeDefined();
    expect(binaryTreeSet.getIteratorForReverseTraversal).toBeDefined();
  });

  test("Вызываю методы возвращающие итераторы для различных порядков обхода дерева.", () => {
    const binaryTreeSet: IBinaryTreeSet = new BinaryTreeSet([-432]);

    const iterator1: ITraversalIterator = new DepthForwardIterator(
      { value: -432, left: null, right: null },
      1
    );

    const iterator2: ITraversalIterator = new IteratorToWidth(
      { value: -432, left: null, right: null },
      1
    );

    const iterator3: ITraversalIterator = new SymmetricalIterator(
      { value: -432, left: null, right: null },
      1
    );

    const iterator4: ITraversalIterator = new ReverseIterator(
      { value: -432, left: null, right: null },
      1
    );

    expect(binaryTreeSet.getIteratorForBreadthTraversal()).toEqual(iterator2);
    expect(binaryTreeSet.getIteratorForDirectDepthTraversal()).toEqual(
      iterator1
    );
    expect(binaryTreeSet.getIteratorForSymmetricalTraversal()).toEqual(
      iterator3
    );
    expect(binaryTreeSet.getIteratorForReverseTraversal()).toEqual(iterator4);
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
