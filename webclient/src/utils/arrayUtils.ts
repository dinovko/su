import { TreeViewBaseItem } from "@mui/x-tree-view";

export function findParentChain(tree: TreeViewBaseItem[], id: string): TreeViewBaseItem[] | null {
    // Вспомогательная функция для поиска и построения цепочки родителей
    function search(node: TreeViewBaseItem, id: string, path: TreeViewBaseItem[]): TreeViewBaseItem[] | null {
        if (node.id === id) {
            return path.concat(node); // Возвращаем текущий путь, добавив текущий узел
        }
        if (node.children) {
            for (const child of node.children) {
                const result = search(child, id, path.concat(node));
                if (result) {
                    return result;
                }
            }
        }
        return null; // Возвращаем null, если узел не найден
    }
    for (const node of tree) {
        const result = search(node, id, []);
        if (result) {
            return result;
        }
    }

    return null; // Возвращаем null, если узел не найден во всем дереве
}