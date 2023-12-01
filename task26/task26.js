// Задача: Рекурсивный обход дерева DOM:: 
// Напишите функцию, которая рекурсивно обходит дерево DOM, 
// начиная с указанного элемента, 
// и выполняет определенное действие с каждым узлом 
// (например, выводить информацию о теге в консоль).

function traverseDOM(startElement) {
    // функция, которая выполняет определенное действие для каждого узла
    function action(node) {
        // проверка, что узел является элементом
        if (node.nodeType === 1) {
        console.log('Тег:', node.tagName);
        }
    }

    // функция рекурсивного обхода дерева DOM
    function recursiveTraversal(node) {
        // выполнить определенное действие для текущего узла
        action(node);

        // рекурсивно обойти дочерние узлы текущего узла
        for (let i = 0; i < node.childNodes.length; i++) {
        recursiveTraversal(node.childNodes[i]);
        }
    }

    // начать рекурсивный обход, начиная с указанного элемента
    recursiveTraversal(startElement);
}

const startElement = document.getElementById('start');
traverseDOM(startElement);