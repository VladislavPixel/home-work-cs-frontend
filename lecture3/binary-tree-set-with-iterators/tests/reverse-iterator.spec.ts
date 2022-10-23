import type { ITraversalIterator } from "../types/interfaces";
import ReverseIterator from "../modules/reverse-iterator";

describe("Проверяю итератор, который реализует обратный обход дерева в глубину.", () => {
  test("Создаю экземпляр.", () => {
    const treeNode = {
      value: 155,
      left: null,
      right: null
    };

    const iterator: ITraversalIterator = new ReverseIterator(
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

    const iterator1: ITraversalIterator = new ReverseIterator(
      treeNode,
      2
    );
    const iterator2: ITraversalIterator = new ReverseIterator(
      treeNode,
      2
    );

    expect(iterator1[Symbol.iterator]()).toEqual(iterator2);
  });

  test("Вызываю метод next с пустым деревом в итераторе.", () => {
    const iterator: ITraversalIterator = new ReverseIterator(null, 0);

    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("Вызываю метод next не с пустым деревом в итераторе.", () => {
    const treeNode = {
      value: -432,
      left: {
        value: 0,
				left: {
					value: 2,
					left: null,
					right: null
				},
				right: {
					value: 3,
					left: null,
					right: null
				}
      },
			right: {
				value: 1,
				left: null,
				right: null
			}
    };

    const iterator: ITraversalIterator = new ReverseIterator(
      treeNode,
      5
    );

    expect(iterator.next()).toEqual({ value: 2, done: false });
		expect(iterator.next()).toEqual({ value: 3, done: false });
		expect(iterator.next()).toEqual({ value: 0, done: false });
		expect(iterator.next()).toEqual({ value: 1, done: false });
		expect(iterator.next()).toEqual({ value: -432, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("Итерирую объект итератора.", () => {
    const nextMock = jest.spyOn(ReverseIterator.prototype, "next");

    const treeNode = {
      value: 155,
      left: {
        value: 200,
        left: null,
        right: null
      },
      right: null
    };

    const iterator: ITraversalIterator = new ReverseIterator(
      treeNode,
      2
    );

    for (const value of iterator) {
      console.log(value);
    }

    expect(nextMock).toHaveBeenCalledTimes(3);
  });
});
