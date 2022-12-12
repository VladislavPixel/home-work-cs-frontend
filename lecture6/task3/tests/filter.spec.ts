import { filter } from "../filter";
import { take } from "../../task2/take";
import { random } from "../../task1/random";
import type { IIterator } from "../../types";

describe("Проверяю функцию filter:", () => {
	test("Проверяю возвращаемое значение из функции filter.", () => {
		const randomIterator: IIterator = random(0, 100);

		const fnPredicate = <T>(el: T): boolean => {
			return el < 30;
		};

		const iteratorFilter = take(filter(randomIterator, fnPredicate), 15);

		expect(iteratorFilter.next).toBeDefined();
		expect(iteratorFilter[Symbol.iterator]).toBeDefined();
	});

	test("Наполняю массив при помощи функции filter и проверяю корректность наполнения.", () => {
		const randomIterator: IIterator = random(0, 100);

		const fnPredicate = <T>(el: T): boolean => {
			return el < 30;
		};

		const arrayFilter = [...take(filter(randomIterator, fnPredicate), 15)];

		expect(arrayFilter.every(fnPredicate)).toBe(true);
	});
});
