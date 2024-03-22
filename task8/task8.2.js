// Решение 2, цикл

function createClosureFunction(functions) {
    // внутри функции определяем функцию замыкания
    return function(...args) {
        // инициализируем массив для хранения результатов
        const results = [];
        // проходим по всем функциям в массиве
        for (let i = 0; i < functions.length; i++) {
            // выполняет вызов функции и добавляет результат этого вызова в массив results
            results.push(functions[i](...args));
        }
        // возвращаем результаты
        return results;
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

