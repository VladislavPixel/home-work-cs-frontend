import type { ITraversalIterator } from "../types/interfaces";
import DepthForwardIterator from "../modules/depth-forward-iterator";

describe("Проверяю итератор, который реализует прямой обход дерева в глубину.", () => {
  test("Создаю экземпляр.", () => {
    const treeNode = {
      value: 155,
      left: null,
      right: null
    };

    const iterator: ITraversalIterator = new DepthForwardIterator(
      treeNode,
      1
    );

    expect(iterator[Symbol.iterator]).toBeDefined();
    expect(iterator.next).toBeDefined();
  });

  test("Вызываю метод [Symbol.iterator].", () => {
    const treeNode = {
      value: 155,
      left: {
        value: 200,
        left: null,
        right: null
      },
      right: null
    };

    const iterator1: ITraversalIterator = new DepthForwardIterator(
      treeNode,
      2
    );
    const iterator2: ITraversalIterator = new DepthForwardIterator(
      treeNode,
      2
    );

    expect(iterator1[Symbol.iterator]()).toEqual(iterator2);
  });

  test("Вызываю метод next с пустым деревом в итераторе.", () => {
    const iterator: ITraversalIterator = new DepthForwardIterator(null, 0);

    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("Вызываю метод next не с пустым деревом в итераторе.", () => {
    const treeNode = {
      value: 155,
      left: {
        value: 200,
        left: null,
        right: null
      },
      right: null
    };

    const iterator: ITraversalIterator = new DepthForwardIterator(
      treeNode,
      2
    );

    expect(iterator.next()).toEqual({ value: 155, done: false });
    expect(iterator.next()).toEqual({ value: 200, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("Итерирую объект итератора.", () => {
    const nextMock = jest.spyOn(DepthForwardIterator.prototype, "next");

    const treeNode = {
      value: 155,
      left: {
        value: 200,
        left: null,
        right: null
      },
      right: null
    };

    const iterator: ITraversalIterator = new DepthForwardIterator(
      treeNode,
      2
    );

    for (const value of iterator) {
      console.log(value);
    }

    expect(nextMock).toHaveBeenCalledTimes(3);
  });
});
