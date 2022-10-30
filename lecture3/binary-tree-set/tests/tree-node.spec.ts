import type { ITreeNode } from "../types/interfaces";
import TreeNode from "../modules/tree-node";

describe("Проверяю узел дерева: ", () => {
  test("Создаю экземпляр.", () => {
    const treeNode: ITreeNode = new TreeNode(155);

    expect(treeNode.value).toBe(155);
    expect(treeNode.left).toBeNull();
    expect(treeNode.right).toBeNull();
  });
});
