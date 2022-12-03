import Stack from "../module/stack";
import type { IStack } from "../interface/i-stack";

describe("Проверка модуля - Stack:", () => {
	test("Создаю экземпляр стека.", () => {
		const stack: IStack = new Stack();

		expect(stack.head).toBe(null);
		expect(stack.pop).toBeDefined();
		expect(stack.push).toBeDefined();
	});

	test("Меняю значение head через метод push.", () => {
		const stack: IStack = new Stack();

		expect(stack.head).toBe(null);
		stack.push(777);
		expect(stack.head).toBe(777);
		stack.pop();
		expect(stack.head).toBe(null);
	});

	test("Добавляю элементы в стек.", () => {
		const stack: IStack = new Stack();

		expect(stack.push(123)).toBe(true);
		expect(stack.push(555)).toBe(true);
		for (let m = 0; m < 8; m++) stack.push(m ** 3);
		expect(() => stack.push(7777)).toThrow("Stack is Full!!!");
	});

	test("Удаляю элементы из стека.", () => {
		const stack: IStack = new Stack();

		expect(() => stack.pop()).toThrow("Stack is Empty!!!");
		stack.push(25213);
		expect(stack.pop()).toBe(25213);
		expect(stack.head).toBe(null);
		expect(() => stack.pop()).toThrow("Stack is Empty!!!");
	});
});
