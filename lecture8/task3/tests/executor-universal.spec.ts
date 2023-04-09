import { Result } from "../../task1/container-result";
import { executorUniversal } from "../executor-universal";

describe("Проверяю функцию executorUniversal:", () => {
	test("Проверяю возвращаемый результат.", () => {
		const promise = executorUniversal(function* main() {
			const result = new Result(() => 10);

			const value = yield result.map((el) => el * 2);

			expect(value).toBe(20);

			const value2 = yield Promise.resolve(10);

			expect(value2).toBe(10);
		});

		expect(promise).toBeInstanceOf(Promise);
	});
});
