import { random } from "../random";

describe("Проверяю функцию random:", () => {
	test("Проверяем возвращаемое значение у функции random", () => {
		const randomInt1: IterableIterator<number> = random(0, 100);

		expect(randomInt1.next).toBeDefined();
		expect(randomInt1[Symbol.iterator]).toBeDefined();
	});

	test("Вызываю у возвращаемого значения из функции random метод next().", () => {
		const randomInt1: IterableIterator<number> = random(0, 100);

		const result1 = randomInt1.next();
		const result2 = randomInt1.next();

		expect(result1.done).toBe(false);
		expect(result2.done).toBe(false);
		expect(typeof result1.value === "number").toBe(true);
		expect(typeof result2.value === "number").toBe(true);
	});
});
