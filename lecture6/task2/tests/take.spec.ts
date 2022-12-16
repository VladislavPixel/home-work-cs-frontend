import { random } from "../../task1/random";
import { take } from "../take";

describe("Проверяю функцию take:", () => {
	test("Наполняю массив числами, используя функцию take.", () => {
		const iteratorForRandom1: IterableIterator<number> = random(0, 100);
		const iteratorForRandom2: IterableIterator<number> = random(0, 100);

		const resultArray1 = [...take(iteratorForRandom1, 15)];
		const resultArray2 = [...take(iteratorForRandom2, 1000)];

		expect(resultArray1.length).toBe(15);
		expect(resultArray2.length).toBe(1000);
	});
});
