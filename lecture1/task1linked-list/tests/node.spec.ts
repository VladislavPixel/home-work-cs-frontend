import type { INode } from "../types/interfaces";
import Node from "../modules/node";

describe("Проверка модуля - Node:", () => {
	test("Создаю экземпляр.", () => {
		const node: INode = new Node(71);

		expect(node.value).toBe(71);
		expect(node.next).toBeNull();
		expect(node.prev).toBeNull();
		expect(node.displayNode).toBeDefined();
	});

	test("Вызываю метод displayNode.", () => {
		const node: INode = new Node(155);

		expect(node.displayNode()).toBe(`element value: 155;`);
	});
});
