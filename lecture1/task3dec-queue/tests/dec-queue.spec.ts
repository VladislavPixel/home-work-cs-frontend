import type { IDecQueue } from "../interface/i-dec-queue";
import DecQueue from "../module/dec-queue";

describe("Проверка модуля - DecQueue:", () => {
	test("Создаю экземпляр.", () => {
		const decQueue: IDecQueue = new DecQueue();

		expect(decQueue.pop).toBeDefined();
		expect(decQueue.push).toBeDefined();
		expect(decQueue.shift).toBeDefined();
		expect(decQueue.unshift).toBeDefined();
	});

	test("Добавляю элементы в конец очереди.", () => {
		const decqueue: IDecQueue = new DecQueue();

		expect(decqueue.push(200)).toBe(1);
		for (let m = 0; m < 4; m++) decqueue.push(m ** 3);
		expect(() => decqueue.push(200)).toThrow("DecQueue is Full!");
	});

	test("Добавляю элементы в начало.", () => {
		const decqueue: IDecQueue = new DecQueue();

		expect(decqueue.unshift(500)).toBe(1);
		for (let x = 0; x < 4; x++) decqueue.unshift(x ** 4);
		expect(() => decqueue.unshift(90000)).toThrow("DecQueue is Full!");
	});

	test("Удаляю элемент с конца в пустой очереди.", () => {
		const decqueue: IDecQueue = new DecQueue();

		expect(() => decqueue.pop()).toThrow("DecQueue isEmpty!");
	});

	test("Удаляю элементы с конца из очереди, которая содержит элементы.", () => {
		const decqueue: IDecQueue = new DecQueue();

		decqueue.push(700);
		decqueue.push(1000);

		expect(decqueue.pop()).toBe(1000);
		expect(decqueue.pop()).toBe(700);
		expect(() => decqueue.pop()).toThrow("DecQueue isEmpty!");
	});

	test("Удаляю первый элемент из пустой очереди.", () => {
		const decqueue: IDecQueue = new DecQueue();

		expect(() => decqueue.pop()).toThrow("DecQueue isEmpty!");
	});

	test("Удаляю элементы из начала очереди, которая не является пустой.", () => {
		const decqueue: IDecQueue = new DecQueue();

		decqueue.push(200);
		decqueue.push({ value: 155 });

		expect(decqueue.shift()).toBe(200);
		expect(decqueue.shift()).toEqual({ value: 155 });
		expect(() => decqueue.pop()).toThrow("DecQueue isEmpty!");
	});

	test("Делаю все возможные операции над двустронней очередью несколько раз.", () => {
		const decqueue: IDecQueue = new DecQueue();

		expect(decqueue.push(77)).toBe(1);
		expect(decqueue.unshift(155)).toBe(2);
		expect(decqueue.pop()).toBe(77);
		expect(decqueue.shift()).toBe(155);
		expect(decqueue.push(90)).toBe(1);
		expect(decqueue.push(123)).toBe(2);
		expect(decqueue.unshift(200)).toBe(3);
		expect(decqueue.pop()).toBe(123);
		expect(decqueue.shift()).toBe(200);
		expect(decqueue.shift()).toBe(90);
		expect(decqueue.push(188)).toBe(1);
	});
});
