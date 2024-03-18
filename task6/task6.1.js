// Решение 1, использование метода sort(), localeCompare() и тернарного оператора

function objectsSort(objects){ 
    // сравниваем возраст, если возрасты различны, возвращаем разницу между ними (true меняем местами, false не меняем)
    // иначе возрасты равны, сравниваем имена
    // localeCompare() возвращает число, указывающее как расположена строка относительно указанной 
    // в порядке сортировки: перед, после или они равны.
    objects.sort((a, b) => (a.age !== b.age) ? a.age - b.age : a.name.localeCompare(b.name));

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