// Рекурсивный обход дерева DOM, узлы-элементы и другие типы узлов

// функция рекурсивного обхода дерева DOM
function recursiveTraversalDOM(node) {
    
    // любой тип узла
    if (node.nodeType) {
        console.log('Тег:', node.nodeName);
    }

    for (let i = 0; i < node.childNodes.length; i++) {
        recursiveTraversalDOM(node.childNodes[i]);
    }
}

console.log('Рекурсивный обход дерева DOM, узлы-элементы и другие типы узлов');

recursiveTraversalDOM(startElement);