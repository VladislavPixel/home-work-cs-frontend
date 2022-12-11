import type { ILinkedList } from "../types/interfaces";
import LinkedList from "../module/linked-List";

describe("Проверка модуля - LinkedList:", () => {
	test("Создаю экземпляр.", () => {
		const list: ILinkedList = new LinkedList();

		expect(list.first).toBeNull();
		expect(list.tail).toBeNull();
		expect(list.addLast).toBeDefined();
		expect(list.deleteFirst).toBeDefined();
	});

	test("Добавляю элемент в конец.", () => {
		const list: ILinkedList = new LinkedList();

		expect(list.addLast(155)).toBe(1);
		expect(list.addLast(71)).toBe(2);
		expect(list.first!.value).toBe(155);
		expect(list.tail!.value).toBe(71);
	});

	test("Удаляю первый элемент.", () => {
		const list: ILinkedList = new LinkedList();

		expect(list.deleteFirst()).toBeNull();

		list.addLast(81);
		list.addLast(144);

		expect(list.deleteFirst()!.value).toBe(81);
		expect(list.deleteFirst()!.value).toBe(144);
		expect(list.deleteFirst()).toBe(null);
	});
});
