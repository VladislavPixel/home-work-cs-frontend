import { regExp } from "../regular-expression";

describe("Проверяю регулярное выражение:", () => {
	test("Вызываю test у регулярного выражения, с кириллическими символами.", () => {
		expect(regExp.test("привет")).toBe(false);
	});

	test("Вызываю test у регулярного выражения, с кириллическими символами, пробелом и латинскими.", () => {
		expect(regExp.test("привет pixel")).toBe(false);
	});

	test("Вызываю test у регулярного выражения, с латинскими символами, цифрами, подчеркиванием и знаком $.", () => {
		expect(regExp.test("pixel_lol_$123123_213123_$$$$")).toBe(true);
	});

	test("Вызываю test у регулярного выражения, с латинскими/кириллическими символами, цифрами, пробелом, подчеркиванием и знаком $.", () => {
		expect(regExp.test("pixel_lol_$123123_213123_$$$$ привет мир")).toBe(false);
	});
});