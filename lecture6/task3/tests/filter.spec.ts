import { filter } from "../filter";
import { take } from "../../task2/take";
import { random } from "../../task1/random";

describe("Проверяю функцию filter:", () => {
	test("Проверяю возвращаемое значение из функции filter.", () => {
		const randomIterator: IterableIterator<number> = random(0, 100);

		const fnPredicate = <T>(el: T): boolean => {
			return el < 30;
		};

		const iteratorFilter = take(filter(randomIterator, fnPredicate), 15);

		expect(iteratorFilter.next).toBeDefined();
		expect(iteratorFilter[Symbol.iterator]).toBeDefined();
	});

	test("Наполняю массив при помощи функции filter и проверяю корректность наполнения.", () => {
		const randomIterator: IterableIterator<number> = random(0, 100);

		const fnPredicate = <T>(el: T): boolean => {
			return el < 30;
		};

		const arrayFilter = [...take(filter(randomIterator, fnPredicate), 15)];

		expect(arrayFilter.every(fnPredicate)).toBe(true);
	});

	test("Проверяю как отработает filter с пустым итерируемым объектом.", () => {
		const fnPredicate = <T>(el: T): boolean => {
			return el < 30;
		};

		expect([...filter([], fnPredicate)]).toEqual([]);
	});
});
