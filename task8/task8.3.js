// Решение 3, reduce

function createClosureFunction(functions) {
    // внутри функции определяем функцию замыкания
    return function(...args) {
        // метод reduce для итерации по массиву функций и собирания результатов
        return functions.reduce((acc, func) => {
            // результат вызова добавляется в аккумуляторный массив acc
            acc.push(func(...args));
            return acc;
        }, []); // инициализация аккумуляторного массива пустым массивом
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
