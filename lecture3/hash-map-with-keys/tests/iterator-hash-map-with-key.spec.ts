import HashMap from "../modules/hash-map";
import IteratorHashMapWithKey from "../modules/iterator-hash-map-with-key";
import type { IIteratorHashMapWithKey, IHashMap } from "../types/interfaces";

describe("Проверяю итератор ключей для HashMap - IteratorHashMapWithKey: ", () => {
	test("Создаю экземпляр.", () => {
		const map: IHashMap = new HashMap();

		const iterator: IIteratorHashMapWithKey = map.keys();

		expect(iterator[Symbol.iterator]).toBeDefined();
		expect(iterator.next).toBeDefined();
	});

	test("Вызываю метод [Symbol.iterator].", () => {
		const map: IHashMap = new HashMap();

		const iterator: IIteratorHashMapWithKey = map.keys();

		expect(iterator[Symbol.iterator]()).toEqual(iterator);
	});

	test("Вызываю метод next на пустом HashMap.", () => {
		const map: IHashMap = new HashMap();

		const iterator: IIteratorHashMapWithKey = map.keys();

		expect(iterator.next()).toEqual({ value: undefined, done: true });
	});

	test("Вызываю метод next не на пустом HashMap.", () => {
		const map: IHashMap = new HashMap();

		map.set("age", 24);
		map.set(155, 160);

		const iterator: IIteratorHashMapWithKey = map.keys();

		expect(iterator.next()).toEqual({
			value: "155",
			done: false
		});
		expect(iterator.next()).toEqual({
			value: "age",
			done: false
		});
		expect(iterator.next()).toEqual({ value: undefined, done: true });
	});

	test("Итерирую в цикле объект итератора.", () => {
		const nextMock = jest.spyOn(IteratorHashMapWithKey.prototype, "next");

		const map: IHashMap = new HashMap();

		map.set("age", 24);
		map.set(155, 160);

		const iterator: IIteratorHashMapWithKey = map.keys();

		for (const nodeInfo of iterator) {
			console.log(nodeInfo);
		}

		expect(nextMock).toHaveBeenCalled();
	});
});
