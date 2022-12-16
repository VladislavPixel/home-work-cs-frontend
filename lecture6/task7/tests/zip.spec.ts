import { zip } from "../zip";

describe("Проверяю функцию zip:", () => {
	test("Проверяю возвращаемое значение из функции zip.", () => {
		const iteratorZip = zip([1, 2], new Set([3, 4]), "bl", new Set([5, 20]));

		expect(iteratorZip.next).toBeDefined();
		expect(iteratorZip[Symbol.iterator]).toBeDefined();
	});

	test("Вызываю метод next у итератора, возвращаемого из zip.", () => {
		const iteratorZip = zip([1, 2], new Set([3, 4]), "bl", new Set([5, 20]));

		const iteratorZip2 = zip([1], new Set([3, 4]), "bl", new Set([5, 20]));

		const iteratorZip3 = zip([1, 2, 7, 10], new Set([3, 4]), "bl");

		const iteratorZip4 = zip([], new Set([3, 4]));

		expect(iteratorZip.next().value).toEqual([1, 3, "b", 5]);
		expect(iteratorZip.next().value).toEqual([2, 4, "l", 20]);
		expect(iteratorZip.next().value).toBe(undefined);

		expect(iteratorZip2.next().value).toEqual([1, 3, "b", 5]);
		expect(iteratorZip2.next().value).toBe(undefined);

		expect(iteratorZip3.next().value).toEqual([1, 3, "b"]);
		expect(iteratorZip3.next().value).toEqual([2, 4, "l"]);
		expect(iteratorZip3.next().value).toEqual([7, undefined, undefined]);
		expect(iteratorZip3.next().value).toEqual([10, undefined, undefined]);
		expect(iteratorZip3.next().value).toBe(undefined);

		expect(iteratorZip4.next().value).toBe(undefined);
	});
});
