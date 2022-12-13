import { mapSeq } from "../map-seq";
import type { IIterable } from "../../types";

describe("Проверяю функцию mapSeq:", () => {
	test("Проверяю возвращаемое значение из функции mapSeq.", () => {
		const iteratorMapSeq = mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1]);

		expect(iteratorMapSeq.next).toBeDefined();
		expect(iteratorMapSeq[Symbol.iterator]).toBeDefined();
	});
});
