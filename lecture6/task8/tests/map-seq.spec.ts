import { mapSeq } from "../map-seq";

describe("Проверяю функцию mapSeq:", () => {
	test("Проверяю возвращаемое значение из функции mapSeq.", () => {
		const iteratorMapSeq = mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1]);

		expect(iteratorMapSeq.next).toBeDefined();
		expect(iteratorMapSeq[Symbol.iterator]).toBeDefined();
	});

	test("Наполняю массив результатами вызова mapSeq. Первый аргумент несет в себе однородные элементы.", () => {
		const iteratorMapSeq = mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1]);

		expect([...iteratorMapSeq]).toEqual([1, 3, 5]);
	});

	test("Наполняю массив результатами вызова mapSeq. Первый аргумент несет в себе неоднородные элементы.", () => {
		const iteratorMapSeq = mapSeq([1, "l", 2, "v", 3], [(el) => Number(el)]);

		expect([...iteratorMapSeq]).toEqual([1, NaN, 2, NaN, 3]);
	});
});
