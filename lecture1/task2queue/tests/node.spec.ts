import type { INode } from "../types/interfaces";
import Node from "../module/node";

describe("Проверка модуля - Node:", () => {
	test("Создаю экземпляр узла.", () => {
		const data = { name: "Vladislav", age: 24 };

		const node: INode<typeof data> = new Node(data);

		expect(node.next).toBeNull();
		expect(node.value).toEqual(data);
		expect(node.value.name).toBe("Vladislav");
		expect(node.value.age).toBe(24);
	});
});
