import { regExpNoDubles } from "../regular-expression-no-dubles";

describe("Регулярное выражение для удаление подстрочных дублей:", () => {
	test("Извлечение из строки дублируемых подстрок.", () => {
		expect("aaaabbbbczzzz".replace(regExpNoDubles, "$1")).toBe("abcz");
		expect("abababbbabcabc".replace(regExpNoDubles, "$1")).toBe("abbabc");
		expect("foofoobabaaaazze".replace(regExpNoDubles, "$1")).toBe("foobaaze");
	});
});
