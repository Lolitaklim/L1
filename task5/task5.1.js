// Решение 1, использование классов js для узла списка, создание первого узла и цикл for

// определение структуры узла связанного списка
class ListNode {
    // конструктор класса создает узел списка
    constructor(value) {
        // значение узла
        this.value = value;
        // указатель на следующий узел
        this.next = null;
    }
}
  
function jsonToLinkedList(jsonArray) {
    // проверка входных данных, массив, не пустой, каждый элемент объект
    // every возвращает true, если для всех элементов массива переданная функция вернет true
    if (!Array.isArray(jsonArray) || jsonArray.length === 0 || !jsonArray.every(item => typeof item === 'object')) {
        return null;
    }

    // создание первого узла списка
    const head = new ListNode(jsonArray[0]);
    // инициализация переменной, указывающей на текущий узел
    let current = head;

    // проход по остальным элементам массива, начиная с 1, так как 0 уже создан
    for (let i = 1; i < jsonArray.length ; i++) {
        // создание нового узла и присвоение его свойству next текущего узла
        current.next = new ListNode(jsonArray[i]);
        // перемещение указателя current на только что созданный узел, делая его текущим
        current = current.next;
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
 
// обход значений в связанном списке
// while (linkedList) {
//     console.log(linkedList.value);
//     linkedList = linkedList.next;
// }

