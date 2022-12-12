import { enumerate } from "../enumerate";
import { random } from "../../task1/random";
import type { IIterator } from "../../types";
import { take } from "../../task2/take";

describe("Проверяю функцию enumerate:", () => {
	test("Проверяю возвращаемое значение из функции enumerate.", () => {
		const randomIterator: IIterator = random(0, 100);

		const enumerateIterator: IIterator<[number, number | undefined]> =
			enumerate(randomIterator);

		expect(enumerateIterator.next).toBeDefined();
		expect(enumerateIterator[Symbol.iterator]).toBeDefined();
	});

	test("Наполняю массив значениями вызова enumerate.", () => {
		const randomIterator: IIterator = random(0, 100);

		const enumerateIterator: IIterator<[number, number | undefined]> =
			enumerate(randomIterator);

		const arrayResult = [...take(enumerateIterator, 3)];

		expect(arrayResult[0][0]).toBe(0);
		expect(arrayResult[1][0]).toBe(1);
		expect(arrayResult[2][0]).toBe(2);
		expect(typeof arrayResult[0][1] === "number").toBe(true);
		expect(typeof arrayResult[1][1] === "number").toBe(true);
		expect(typeof arrayResult[2][1] === "number").toBe(true);
	});
});
