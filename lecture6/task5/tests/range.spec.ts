import { MyRange } from "../range";

describe("Проверяю класс Range:", () => {
	test("Проверяю экземпляр класса MyRange на наличие всех методов.", () => {
		const rangeSymbol = new MyRange("a", "f");

		expect(rangeSymbol.getConfigSameTypes).toBeDefined();
		expect(rangeSymbol.isValidData).toBeDefined();
		expect(rangeSymbol.reverse).toBeDefined();
		expect(rangeSymbol[Symbol.iterator]).toBeDefined();
	});

	test("Создаю массив из границ символов.", () => {
		const rangeSymbol = new MyRange("a", "f");

		const arraySymbols = Array.from(rangeSymbol);

		expect(arraySymbols.length).toBe(6);
		expect(arraySymbols[0]).toBe("a");
		expect(arraySymbols[1]).toBe("b");
		expect(arraySymbols[2]).toBe("c");
		expect(arraySymbols[3]).toBe("d");
		expect(arraySymbols[4]).toBe("e");
		expect(arraySymbols[5]).toBe("f");
	});

	test("Создаю массив из границ чисел.", () => {
		const rangeNumber = new MyRange(-5, 1);

		const arrayNumbers = Array.from(rangeNumber);

		expect(arrayNumbers.length).toBe(7);
		expect(arrayNumbers[0]).toBe(-5);
		expect(arrayNumbers[1]).toBe(-4);
		expect(arrayNumbers[2]).toBe(-3);
		expect(arrayNumbers[3]).toBe(-2);
		expect(arrayNumbers[4]).toBe(-1);
		expect(arrayNumbers[5]).toBe(0);
		expect(arrayNumbers[6]).toBe(1);
	});

	test("Проверяю метод reverse.", () => {
		const rangeNumber = new MyRange(-5, 1);

		const arrayNumbers = Array.from(rangeNumber.reverse());

		expect(arrayNumbers.length).toBe(7);
		expect(arrayNumbers[0]).toBe(1);
		expect(arrayNumbers[1]).toBe(0);
		expect(arrayNumbers[2]).toBe(-1);
		expect(arrayNumbers[3]).toBe(-2);
		expect(arrayNumbers[4]).toBe(-3);
		expect(arrayNumbers[5]).toBe(-4);
		expect(arrayNumbers[6]).toBe(-5);
	});

	test("Передаю в конструктор ошибочные данные и регистрирую ошибки при итерации итератора.", () => {
		const rangeNumber1 = new MyRange(200, 1);

		const range2 = new MyRange<any>(200, "c");

		const range3 = new MyRange<any>({}, []);

		expect(() => Array.from(rangeNumber1)).toThrow("BorderLeft > BorderRight.");
		expect(() => Array.from(range2)).toThrow("The type of borderLeft and borderRight are not the same.");
		expect(() => Array.from(range3)).toThrow("Argument types are not numbers or strings.");
	});
});
