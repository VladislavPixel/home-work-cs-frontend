import iter from "../iter-symbols";

describe("Проверяю функцию iter():", () => {
	test("Вызываю функцию iter.", () => {
		let result = [..."🤪lertcvxb👻po🦹m🤾‍♀️👨‍❤️‍💋‍👨👨‍👩‍👧‍👦😀g👪fh🤣fgh😍fgh🤪452👨‍👩‍👧‍👦3👬5😀😍👨‍❤️‍💋‍👨mm💑lvbn👪"];

		let arrTest = [...iter("🤪lertcvxb👻po🦹m🤾‍♀️👨‍❤️‍💋‍👨👨‍👩‍👧‍👦😀g👪fh🤣fgh😍fgh🤪452👨‍👩‍👧‍👦3👬5😀😍👨‍❤️‍💋‍👨mm💑lvbn👪")];

		expect(arrTest.length).toBe(78);
		expect(arrTest.length).toBe(result.length);
		expect(arrTest).toEqual(["🤪", "l", "e", "r", "t", "c", "v", "x", "b", "👻", "p", "o", "🦹", "m", "🤾", "‍", "♀", "️", "👨", "‍", "❤", "️", "‍", "💋", "‍", "👨", "👨", "‍", "👩", "‍", "👧", "‍", "👦", "😀", "g", "👪", "f", "h", "🤣", "f", "g", "h", "😍", "f", "g", "h", "🤪", "4", "5", "2", "👨", "‍", "👩", "‍", "👧", "‍", "👦", "3", "👬", "5", "😀", "😍", "👨", "‍", "❤", "️", "‍", "💋", "‍", "👨", "m", "m", "💑", "l", "v", "b", "n", "👪"]);
		expect([...iter("viva🏩🤱🤼👫🤝091")]).toEqual(["v", "i", "v", "a", "🏩", "🤱", "🤼", "👫", "🤝", "0", "9", "1"]);
	});
});
