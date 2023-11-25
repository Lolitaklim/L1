// Задача о замыканиях: напишите функцию, 
// которая будет принимать массив функций и возвращать новую функцию,
// которая вызывает каждую функцию в этом массиве и возвращает массив результатов, 
// полученных после вызова каждой функции.

function createClosureFunction(functions) {
    // внутри функции определяем функцию замыкания
    return function (...args) {
        // возвращаем результат вызова метода map для массива функций
        return functions.map(func => func(...args));
    };
}


const addition = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

const closureFunction = createClosureFunction([addition, subtract, multiply]);
const closureFunction2 = createClosureFunction([addition, subtract, multiply]);

const result = closureFunction(5, 3);
console.log(result); 

const result2 = closureFunction2(3, 4);
console.log(result2); 

