import { enumerate } from "../enumerate";
import { random } from "../../task1/random";
import { take } from "../../task2/take";
import type { TypeForElementsIterable } from "../../types";

describe("Проверяю функцию enumerate:", () => {
	test("Проверяю возвращаемое значение из функции enumerate.", () => {
		const randomIterator: IterableIterator<number> = random(0, 100);

		/* eslint-disable */
		const enumerateIterator: IterableIterator<
			[number, TypeForElementsIterable<typeof randomIterator>]
		> = enumerate(randomIterator);
		/* eslint-enable */

		expect(enumerateIterator.next).toBeDefined();
		expect(enumerateIterator[Symbol.iterator]).toBeDefined();
	});

	test("Наполняю массив значениями вызова enumerate.", () => {
		const randomIterator: IterableIterator<number> = random(0, 100);

		/* eslint-disable */
		const enumerateIterator: IterableIterator<
			[number, TypeForElementsIterable<typeof randomIterator>]
		> = enumerate(randomIterator);
		/* eslint-enable */

		const arrayResult = [...take(enumerateIterator, 3)];

		for (let m = 0; m < arrayResult.length; m++) {
			const target = arrayResult[m];

			if (target !== undefined) {
				expect(target[0]).toBe(m);
				expect(typeof target[1] === "number").toBe(true);
			}
		}
	});
});
