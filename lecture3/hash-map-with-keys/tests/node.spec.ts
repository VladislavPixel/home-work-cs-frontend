import type { INode } from "../types/interfaces";
import Node from "../modules/node";

describe("Проверка модуля узла - Node: ", () => {
	test("Создаю экземпляр.", () => {
		const node: INode = new Node("name", "Vladislav");

		expect(node.key).toBeDefined();
		expect(node.key).toBe("name");
		expect(node.value).toBeDefined();
		expect(node.value).toBe("Vladislav");
		expect(node.next).toBeDefined();
		expect(node.next).toBeNull();
	});
});
