import type { IQueue } from "../types/interfaces";
import Queue from "../module/queue";
import LinkedList from "../module/linked-List";

describe("Проверяю модуль - Queue:", () => {
	test("Создаю экземпляр.", () => {
		const queue: IQueue = new Queue();

		expect(queue.pop).toBeDefined();
		expect(queue.push).toBeDefined();
		expect(queue.head).toBe(null);
	});

	test("Добавляю элемент в конец очереди.", () => {
		const addLastLinkedListMock = jest.spyOn(LinkedList.prototype, "addLast");
		const queue: IQueue = new Queue();

		queue.push(155);
		expect(addLastLinkedListMock).toHaveBeenCalledTimes(1);
		expect(queue.head).toBe(155);
		queue.push(255);
		expect(addLastLinkedListMock).toHaveBeenCalledTimes(2);
	});

	test("Удаляю элемент из очереди (первый элемент очереди уходит).", () => {
		const deleteFirstLinkedListMock = jest.spyOn(LinkedList.prototype, "deleteFirst");

		const queue: IQueue = new Queue();

		expect(() => queue.pop()).toThrow("Operation `pop` is not supported in Empty Queue!");
		expect(deleteFirstLinkedListMock).toHaveBeenCalledTimes(1);
		queue.push(71);
		queue.push(81);
		expect(queue.pop()).toBe(71);
		expect(queue.pop()).toBe(81);
		expect(deleteFirstLinkedListMock).toHaveBeenCalledTimes(3);
		expect(() => queue.pop()).toThrow("Operation `pop` is not supported in Empty Queue!");
	});
});
