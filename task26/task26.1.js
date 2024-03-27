// Рекурсивный обход дерева DOM, узлы-элементы

// функция рекурсивного обхода дерева DOM
function recursiveTraversalDOM(node) {
    // выполнить определенное действие для текущего узла
    // elem.nodeType == 1 для узлов-элементов
    if (node.nodeType === 1) {
        console.log('Тег:', node.tagName);
    }

    // рекурсивно обойти дочерние узлы текущего узла
    for (let i = 0; i < node.childNodes.length; i++) {
        recursiveTraversalDOM(node.childNodes[i]);
    }
}

const startElement = document.getElementById('start');

console.log('Рекурсивный обход дерева DOM, узлы-элементы');
// начать рекурсивный обход, начиная с указанного элемента
recursiveTraversalDOM(startElement);