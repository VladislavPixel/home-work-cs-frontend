import { regExpForSplit } from "../regulat-expression-for-split";

describe("Проверка метода split с регулярным выражением:", () => {
	test("Вызываю метод split, применяя к нему регулярное выражение.", () => {
		expect("foo    bla.bar,gd;4".split(regExpForSplit)).toEqual([
			"foo",
			"bla",
			"bar",
			"gd",
			"4"
		]);
	});

	test("Вызываю метод split, применяя к нему регулярное выражение.", () => {
		expect("..ап....foo    bla.bar,gd;4;;;;;;;;;".split(regExpForSplit)).toEqual([
			"",
			"",
			"ап",
			"",
			"",
			"",
			"foo",
			"bla",
			"bar",
			"gd",
			"4",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			""
		]);
	});
});
