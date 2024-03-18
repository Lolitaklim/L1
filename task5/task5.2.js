// Решение 2, использование классов js для узла списка, цикл for of

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

    // инициализация первого узла списка и переменной, указывающей на текущий узел
    let head = null;
    let current = null;

    // проходим по каждому объекту в массиве
    for(obj of jsonArray) {
        // создание нового узла
        const newNode = new ListNode(obj);
        // если головной узел списка не был инициализирован, новый узел становится head и current
        if (!head) {
            head = newNode;
            current = head;
        } else {
            // присвоение свойству нового узла next текущего узла
            current.next = newNode;
            // перемещение указателя current на только что созданный узел, делая его текущим
            current = current.next;
        }
    }

    // возвращаем голову связанного списка
    return head;
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
