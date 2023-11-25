// Разработайте функцию преобразования JSON в связный список.
// На входе функция должна получать JSON, содержащий список объектов,
// на выходе объект, представляющий из себя односвязный список.
  
// определение структуры узла связанного списка
class ListNode {
    constructor(value) {
    //хранение данных
    this.value = value;
    // указатель на следующий узел
    this.next = null;
    }
}
  
function jsonToLinkedList(jsonArray) {
    // проверка наличия входных данных
    if (!jsonArray || jsonArray.length === 0) {
        // если не существует или пуст - null
        return null;
    }

    // cоздание первого узла списка
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
// while (linkedList !== null) {
//     console.log(linkedList.value);
//     linkedList = linkedList.next;
// }

