import { seq } from "../seq";

describe("Проверяю функцию seq:", () => {
	test("Проверяю возвращаемое значение из функции seq.", () => {
		expect(seq([1, 2, 3], "marker", new Set(["name", "vector", 12])).next).toBeDefined();
		expect(seq("marker", [1, 2, 3], new Set(["name", "vector"]))[Symbol.iterator]).toBeDefined();
	});

	test("Наполняю массив элементами, которые возвращает итератор функции seq.", () => {
		expect([...seq("car", [156, 12], [])]).toEqual(["c", "a", "r", 156, 12]);
		expect([...seq([1, 2], new Set([3, 4]), "bla")]).toEqual([1, 2, 3, 4, "b", "l", "a"]);
		expect([...seq([], [], [], [], [])]).toEqual([]);
		expect([...seq([], [], [], new Set([14, 20]), [])]).toEqual([14, 20]);
		expect([...seq([100, 200], [], [], [])]).toEqual([100, 200]);
		expect([...seq([], [], [], ["viva", "const"])]).toEqual(["viva", "const"]);
		expect([...seq([1, 2], [], new Set([7, 44]), [], "mixer", [], "lol", [], new Set([9]))]).toEqual([1, 2, 7, 44, "m", "i", "x", "e", "r", "l", "o", "l", 9]);
	});
});
