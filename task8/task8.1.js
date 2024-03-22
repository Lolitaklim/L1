// Решение 1, map

function createClosureFunction(functions) {
    // внутри функции определяем функцию замыкания
    return function (...args) {
        // возвращаем результаты вызова метода map для массива функций
        return functions.map(func => func(...args));
    };
}


const functions = [
    (a, b) => a + b,
    (a, b) => a - b,
    (a, b) => a * b
]

const closureFunction = createClosureFunction(functions);

const result = closureFunction(5, 3);
console.log(result); 

const result2 = closureFunction(3, 4);
console.log(result2); 

// Замыкание (closure) - это функция вместе со всеми переменными, 
// которые были доступны в момент ее создания. 
// Замыкание позволяет функции использовать переменные из внешней области видимости, 
// даже после того, как внешняя функция завершила свое выполнение.