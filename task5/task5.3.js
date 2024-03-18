// Решение 3, использование объектов js 

function jsonToLinkedList(jsonArray) {
    // проверка входных данных
    if (!Array.isArray(jsonArray) || jsonArray.length === 0 || !jsonArray.every(item => typeof item === 'object')) {
        return null;
    }

    let head = null;
    let current = null;

    for(obj of jsonArray) {
        // создаем новый узел, представленный объектом, с двумя свойствами: 
        // value, содержащим значение объекта JSON,
        // next, указывающим на следующий узел в связанном списке (начально null)
        const newNode = {value: obj, next: null };
        if (!head) {
            head = newNode;
            current = head;
        } else {
            current.next = newNode;
            current = current.next;
        }
    }

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
