// Решение 4, рекурсивный подход

// определение структуры узла связанного списка
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
  
function jsonToLinkedList(jsonArray) {
    // проверка входных данных
    if (!Array.isArray(jsonArray) || jsonArray.length === 0 || !jsonArray.every(item => typeof item === 'object')) {
        return null;
    }

    // рекурсивно создаем узлы списка
    function buildList(index) {
        // если достигнут конец массива, возвращаем null
        if (index === jsonArray.length) {
            return null;
        }
        
        // создаем новый узел с текущим элементом массива как его значением
        const node = new ListNode(jsonArray[index]);
        // рекурсивно создаем следующий узел
        node.next = buildList(index + 1);
        return node;
    }

    // вызываем функцию buildList, начиная с первого элемента массива 
    return buildList(0);
}
  
const inputJson = [
    {
        "id": 1,
        "name": "John Doe",
        "age": 30,
        "city": "New York"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "age": 25,
        "city": "Los Angeles"
    },
    {
        "id": 3,
        "name": "Bob Johnson",
        "age": 35,
        "city": "Chicago"
    }
];

let linkedList = jsonToLinkedList(inputJson);
console.log(linkedList);
