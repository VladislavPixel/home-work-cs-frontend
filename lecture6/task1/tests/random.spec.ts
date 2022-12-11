import type { IIteratorForRandomFn } from "../random";
import { random } from "../random";

describe("Проверяю функцию random:", () => {
	test("Заполняю числами массив при помощи функции random, которая возвращает итератор.", () => {
		const randomInt1: IIteratorForRandomFn = random(0, 100);
		const randomInt2: IIteratorForRandomFn = random(0, 50);

		const arrValues1 = [...randomInt1];
		const arrValues2 = [...randomInt2];

		const firstElement1 = arrValues1[0];
		const firstElement2 = arrValues2[0];

		const lastElement1 = arrValues1[arrValues1.length - 1];
		const lastElement2 = arrValues2[arrValues2.length - 1];

		const checkTypeFirstElements =
			typeof firstElement1 === "number" && typeof firstElement2 === "number";

		const checkTypeLastElements =
			typeof lastElement1 === "number" && typeof lastElement2 === "number";

		expect(arrValues1.length).toBe(100);
		expect(arrValues2.length).toBe(50);
		expect(checkTypeFirstElements).toBe(true);
		expect(checkTypeLastElements).toBeTruthy();
	});

	test("Проверяем возвращаемое значение у функции random", () => {
		const randomInt1: IIteratorForRandomFn = random(0, 100);

		expect(randomInt1.next).toBeDefined();
		expect(randomInt1[Symbol.iterator]).toBeDefined();
	});

	test("Вызываю у возвращаемого значения из функции random метод next().", () => {
		const randomInt1: IIteratorForRandomFn = random(0, 100);

		const result1 = randomInt1.next();
		const result2 = randomInt1.next();

		expect(result1.done).toBe(false);
		expect(result2.done).toBe(false);
		expect(typeof result1.value === "number").toBe(true);
		expect(typeof result2.value === "number").toBe(true);
	});
});
