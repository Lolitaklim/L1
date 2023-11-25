// Реализовать функцию конвертации JSON в строку

function customStringify(data) {

    // eсли входные данные массив
    if (Array.isArray(data)) {
        // преобразуем каждый элемент массива и объединяем их с запятыми
        const arrayStr = data.map(item => customStringify(item)).join(',');
        // Заключаем результат в квадратные скобки и возвращаем
        return `[${arrayStr}]`;
    }

    // если входные данные не объект или null
    if (typeof data !== 'object' || data === null) { 
        // если данные строка, заключаем её в двойные кавычки и возвращаем
        if (typeof data === 'string') {
            return `"${data}"`;
        } else {
            // иначе возвращаем строковое представление
            return String(data); 
        }
    }
  
    // в остальном, данные - объект, записываем массив из пар ключ-значение 
    const objectStr = Object.entries(data)
    // преобразуем каждую пару в строку
    .map(([key, value]) => `"${key}":${customStringify(value)}`)
    // объединяем их с запятыми
    .join(',');
    // Заключаем результат в фигурные скобки и возвращаем
    return `{${objectStr}}`;
  }
  

const data = {
    name: "John",
    age: 30,
    city: "New York",
    isStudent: false,
    hobbies: ["reading", "coding"]
};

const jsonStringdata = customStringify(data);
console.log(jsonStringdata);

const jsonStringdata2 = JSON.stringify(data);
console.log(jsonStringdata2);

const array = [1, 'foo', { key: 'value' }];

const jsonStringArr = customStringify(array);
console.log(jsonStringArr);

const jsonStringArr2 = JSON.stringify(array);
console.log(jsonStringArr2);