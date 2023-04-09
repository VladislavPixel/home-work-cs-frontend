import { Result } from "../container-result";

describe("Проверяю класс Result:", () => {
	test("Проверяю создаваемый экземпляр Result с корректным стором, когда контейнер содержит данные.", () => {
		const result = new Result(() => 10);

		expect(result.catch).toBeDefined();
		expect(result.flatMap).toBeDefined();
		expect(result.map).toBeDefined();
		expect(result.then).toBeDefined();
		expect(result.unwrap).toBeTruthy();
		expect(result.ok).toBeDefined();
		expect(result.ok).toBe(10);
		expect(result.error).toBeFalsy();
		expect(result.error).toBeUndefined();
	});

	test("Проверяю создаваемый экземпляр Result c некорректным стором, когда контейнер не содержит данные.", () => {
		const result = new Result(() => {
			throw new Error("Ошибка: контейнер Result с ошибкой.");
		});

		expect(result.catch).toBeDefined();
		expect(result.flatMap).toBeDefined();
		expect(result.map).toBeDefined();
		expect(result.then).toBeDefined();
		expect(result.unwrap).toBeTruthy();
		expect(result.ok).toBeUndefined();
		expect(result.ok).toBeFalsy();
		expect(result.error).toBeDefined();
	});

	test("Проверяю метод unwrap() у контейнера Result.", () => {
		const result1 = new Result(() => 100);

		const result2 = new Result(() => {
			const err = new Error("Ошибка: контейнер Result с ошибкой.");

			throw err;
		});

		expect(result1.unwrap()).toBe(100);
		expect(result2.unwrap).toThrow();
	});

	test("Проверяю метод map() у контейнера Result.", () => {
		const result1 = new Result(() => 100);

		const resultMap1 = result1.map((el) => el * 2);

		const result2 = new Result(() => {
			const err = new Error("Ошибка: контейнер Result с ошибкой.");

			throw err;
		});

		const resultMap2 = result2.map((el) => el * 2);

		expect(resultMap1.ok).toBe(200);
		expect(resultMap1).toBeInstanceOf(Result);

		expect(resultMap2).toBeInstanceOf(Result);
		expect(resultMap2.ok).toBeFalsy();
		expect(resultMap2.error).toBeDefined();
	});

	test("Проверяю метод flatMap() у контейнера Result.", () => {
		const result1 = new Result(() => 100);

		const result2 = new Result(() => {
			const err = new Error("Ошибка: контейнер Result с ошибкой.");

			throw err;
		});

		const result1FlatMap = result1.flatMap((el) => new Result(() => el * 5));

		const result1FlatMap1 = result1.flatMap((el) => el + el);

		const result2FlatMap = result2.flatMap((el) => el + el + el);

		const result1FlatMap2 = result1.flatMap((el) => {
			throw new Error("el");
		});

		expect(result1FlatMap.ok).toBe(500);
		expect(result1FlatMap1.ok).toBe(200);
		expect(result2FlatMap.error).toBeDefined();
		expect(result2FlatMap.ok).toBeFalsy();
		expect(result1FlatMap2.ok).toBeFalsy();
		expect(result1FlatMap2.error).toBeDefined();
	});

	test("Проверяем метод catch() у контейнера Result.", () => {
		const result1 = new Result(() => 100);

		const result2 = new Result(() => {
			const err = new Error("Ошибка: контейнер Result с ошибкой.");

			throw err;
		});

		const cb = jest.fn((err: any): void => console.log(err));

		const cb2 = jest.fn((err: any): void => console.log(err));

		const result1Catch = result1.catch(cb);

		const result2Catch = result2.catch(cb2);

		expect(result1Catch.ok).toBe(100);
		expect(cb.mock.calls).toHaveLength(0);

		expect(result2Catch.catch).toBeDefined();
		expect(cb2.mock.calls).toHaveLength(1);
	});

	test("Проверяем метод then() у контейнера Result.", () => {
		const result1 = new Result(() => 100);

		const result2 = new Result(() => {
			const err = new Error("Ошибка: контейнер Result с ошибкой.");

			throw err;
		});

		const result1Then = result1.then((el) => el);

		const cb = jest.fn((el: any): any => el);

		const cb2 = jest.fn((el: any): any => el);

		const result1Then2 = result1.then(cb);

		const result2Then = result2.then(cb2);

		const result3 = new Result(() => 777);

		const result3Then = result3.then((data) => new Result(() => data));

		expect(result1Then.ok).toBe(100);
		expect(result1Then2.ok).toBe(100);
		expect(cb.mock.calls).toHaveLength(1);

		expect(result2Then.error).toBeDefined();
		expect(cb2.mock.calls).toHaveLength(0);

		expect(result3Then.ok).toBe(777);
	});

	test("Проверяю статический метод error() у класса Result.", () => {
		const result1 = Result.error(555);

		expect(result1.error).toBeDefined();
		expect(result1).toBeInstanceOf(Result);
		expect(result1.ok).toBeFalsy();
	});
});
