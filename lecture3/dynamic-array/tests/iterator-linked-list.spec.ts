import type { ILinkedList, IIteratorLinkedList, INode } from "../types/interfaces";
import IteratorLinkedList from "../modules/iterator-linked-list";
import LinkedList from "../modules/linked-list";
import Node from "../modules/node";

describe("Проверка модуля - IteratorLinkedList:", () => {
	test("Создаю экземпляр на пустом LinkedList.", () => {
		const iterator: IIteratorLinkedList = new IteratorLinkedList(new LinkedList());

		expect(iterator.store).toBeNull();
		expect(iterator.next).toBeDefined();
		expect(iterator[Symbol.iterator]).toBeDefined();
	});

	test("Создаю экземпляр не на пустом LinkedList.", () => {
		const list: ILinkedList = new LinkedList();
		list.add(71);

		const iterator: IIteratorLinkedList = new IteratorLinkedList(list);

		expect(iterator.store).toEqual(new Node(71));
	});

	test("Вызываю метод next у итератора, проверяю возвращаемое значение.", () => {
		const list: ILinkedList = new LinkedList();
		list.addFirst(71);
		list.addFirst(155);

		const node1: INode = new Node(155);
		const node2: INode = new Node(71);
		node1.next = node2;
		node2.prev = node1;

		const iterator: IIteratorLinkedList = new IteratorLinkedList(list);

		expect(iterator.store!.value).toBe(155);

		expect(iterator.next()).toEqual({ value: node1, done: false });
		expect(iterator.next()).toEqual({ value: node2, done: false });
		expect(iterator.next()).toEqual({ value: undefined, done: true });
	});

	test("Вызываю метод [Symbol.iterator], проверяю возвращаемое значение.", () => {
		const list: ILinkedList = new LinkedList();
		const iterator: IIteratorLinkedList = new IteratorLinkedList(list);

		expect(iterator[Symbol.iterator]()).toEqual(iterator);
	});
});
