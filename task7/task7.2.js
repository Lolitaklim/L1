// Решение 2, вызов функций в цикле с использованием использованием async/await

const functionsArray = [
    // возвращает промис, который будет выполнено через определенный интервал времени
    () => new Promise(resolve => {
        setTimeout(() => {
            console.log('1');
            // вызываем функцию resolve, завершая промис успешно
            resolve();
        }, 1500);
    }),
    () => new Promise(resolve => {
        setTimeout(() => {
            console.log('2');
            resolve();
        }, 2500);
    }),
    () => new Promise(resolve => {
        setTimeout(() => {
            console.log('3');
            resolve();
        }, 1000);
    }),
    () => new Promise(resolve => {
        setTimeout(() => {
            console.log('4');
            resolve();
        }, 500);
    })    
];

async function executeFunctions() {
    // перебор функций из массива
    for (const func of functionsArray) {
        // приостанавливает выполнение до тех пор, пока текущая функция не завершится
        await func();
    }
}

executeFunctions(); 