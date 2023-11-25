// Задача о сортировке объектов: 
// у вас есть массив объектов вида { name: 'John', age: 25 }. 
// Напишите код, который сортирует этот массив по возрастанию возраста, 
// а при равных возрастах сортирует по алфавиту по полю name.

function objectsSort(objects){ 
    objects.sort((a, b) => {
        // сравниваем возраст, если возрасты различны, возвращаем разницу между ними (true меняем местами, false не меняем)
        if (a.age !== b.age) return a.age - b.age; 
        // если возрасты равны, сравниваем имена, если a.name > b.name, true, иначе false
        return a.name > b.name ? 1 : -1
    });
    return objects;
}

const objects = [
    { name: 'Bob', age: 26 },
    { name: 'Eva', age: 28 },
    { name: 'David', age: 27 },
    { name: 'Emma', age: 27 },
    { name: 'Hank', age: 33 },
    { name: 'Grace', age: 33 },
];

console.log(objectsSort(objects))