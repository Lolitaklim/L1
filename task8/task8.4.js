// Решение 4, рекурсия

function createClosureFunction(functions) {
    // инициализация переменной для отслеживания текущего индекса выполнения функции
    let index = 0;
    // инициализируем массив для хранения результатов
    const results = [];
    // внутри функции определяем функцию замыкания
    function executeFunctions(...args) {
        // если индекс меньше длины массива functions
        if (index < functions.length) {
            // вызов текущей функции из массива
            results.push(functions[index](...args));
            // увеличение индекса
            index++;
            // рекурсивный вызов для выполнения следующей функции
            executeFunctions(...args);
        }
        // возвращаем результаты
        return results;
    }
    // возвращаем функцию, чтобы ее можно было вызывать
    return executeFunctions;
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
