import { Result } from "../../task1/container-result";
import { executor } from "../executor";

describe("Проверяю функцию executor:", () => {
	test("Проверяю возвращаемый результат.", () => {
		const promise = executor(function* main() {
			const result = new Result(() => 10);

			const value = yield result.map((el) => el * 2);

			expect(value).toBe(20);
		});

		expect(promise).toBeInstanceOf(Promise);
	});
});
