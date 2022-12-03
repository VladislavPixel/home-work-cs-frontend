import { formatFn, IHashTable } from "../format-fn";

describe("Проверка функции formatFn:", () => {
	test("", () => {
		/* eslint-disable */
		const str: string = "Hello, ${user}! Your age is ${age}.";
		/* eslint-enable */

		const parameters: IHashTable = { user: "Bob", age: 10 };

		expect(formatFn(str, parameters)).toBe("Hello, Bob! Your age is 10.");
	});
});
