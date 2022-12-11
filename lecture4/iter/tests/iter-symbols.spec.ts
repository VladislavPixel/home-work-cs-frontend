import iter from "../iter-symbols";
import type { IIterator } from "../iter-symbols";

describe("Проверяю функцию iter():", () => {
	test("Вызываю функцию iter.", () => {
		const result = [
			..."🤪lertcvxb👻po🦹m🤾‍♀️👨‍❤️‍💋‍👨👨‍👩‍👧‍👦😀g👪fh🤣fgh😍fgh🤪452👨‍👩‍👧‍👦3👬5😀😍👨‍❤️‍💋‍👨mm💑lvbn👪"
		];

		const arrTest = [
			...iter("🤪lertcvxb👻po🦹m🤾‍♀️👨‍❤️‍💋‍👨👨‍👩‍👧‍👦😀g👪fh🤣fgh😍fgh🤪452👨‍👩‍👧‍👦3👬5😀😍👨‍❤️‍💋‍👨mm💑lvbn👪")
		];

		expect(arrTest.length).toBe(78);
		expect(arrTest.length).toBe(result.length);
		expect(arrTest).toEqual([
			"🤪",
			"l",
			"e",
			"r",
			"t",
			"c",
			"v",
			"x",
			"b",
			"👻",
			"p",
			"o",
			"🦹",
			"m",
			"🤾",
			"‍",
			"♀",
			"️",
			"👨",
			"‍",
			"❤",
			"️",
			"‍",
			"💋",
			"‍",
			"👨",
			"👨",
			"‍",
			"👩",
			"‍",
			"👧",
			"‍",
			"👦",
			"😀",
			"g",
			"👪",
			"f",
			"h",
			"🤣",
			"f",
			"g",
			"h",
			"😍",
			"f",
			"g",
			"h",
			"🤪",
			"4",
			"5",
			"2",
			"👨",
			"‍",
			"👩",
			"‍",
			"👧",
			"‍",
			"👦",
			"3",
			"👬",
			"5",
			"😀",
			"😍",
			"👨",
			"‍",
			"❤",
			"️",
			"‍",
			"💋",
			"‍",
			"👨",
			"m",
			"m",
			"💑",
			"l",
			"v",
			"b",
			"n",
			"👪"
		]);
		expect([...iter("viva🏩🤱🤼👫🤝091")]).toEqual([
			"v",
			"i",
			"v",
			"a",
			"🏩",
			"🤱",
			"🤼",
			"👫",
			"🤝",
			"0",
			"9",
			"1"
		]);
	});

	test("Проверка целостности итератора функции iter.", () => {
		const iterator: IIterator = iter("🎣🎥90vbn🎡");

		expect(iterator.next).toBeDefined();
		expect(iterator[Symbol.iterator]).toBeDefined();
	});

	test("Проверка итератора функции iter.", () => {
		const iterator: IIterator = iter("🎣🎥90vbn🎡");

		expect(iterator.next()).toEqual({ value: "🎣", done: false });
		expect(iterator.next()).toEqual({ value: "🎥", done: false });
		expect(iterator.next()).toEqual({ value: "9", done: false });
		expect(iterator.next()).toEqual({ value: "0", done: false });
		expect(iterator.next()).toEqual({ value: "v", done: false });
		expect(iterator.next()).toEqual({ value: "b", done: false });
		expect(iterator.next()).toEqual({ value: "n", done: false });
		expect(iterator.next()).toEqual({ value: "🎡", done: false });
		expect(iterator.next()).toEqual({ value: undefined, done: true });
	});
});
