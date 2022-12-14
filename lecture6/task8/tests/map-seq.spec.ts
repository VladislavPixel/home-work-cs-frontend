import { mapSeq } from "../map-seq";

describe("Проверяю функцию mapSeq:", () => {
	test("Проверяю возвращаемое значение из функции mapSeq.", () => {
		const iteratorMapSeq = mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1]);

		expect(iteratorMapSeq.next).toBeDefined();
		expect(iteratorMapSeq[Symbol.iterator]).toBeDefined();
	});

	test("Наполняю массив результатами вызова mapSeq.", () => {
		const iteratorMapSeq = mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1]);

		expect([...iteratorMapSeq]).toEqual([1, 3, 5]);
	});
});
