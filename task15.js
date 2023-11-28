// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения

async function asyncFunc() {
    try {
        // ожидание выполнения асинхронной операции 
        const result1 = await asyncOperation1();

        // ожидание выполнения асинхронной операции, используя результат предыдущей операции
        const result2 = await asyncOperation2(result1);

        // возвращаем результат выполнения
        return result2;
    } catch (error) {
        // обработка ошибок, возникших во время выполнения
        console.error('Async function error:', error.message);
        throw error;
    }
}

// асинхронные операции 
function asyncOperation1() {
    return new Promise((resolve) => {
        // имитация асинхронной операции
        setTimeout(() => {
            resolve('Result async operation 1');
        }, 1000); // ожидаем 1 секунду перед разрешением промиса
    });
}

function asyncOperation2(previousResult) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // обработка результата предыдущей операции и создание нового результата
            const result = `${previousResult} - Result async operation 2`;
            resolve(result);
        }, 1000);
    });
}

asyncFunc()
    .then((finalResult) => {
        console.log('Result:', finalResult);
    })
    .catch((error) => {
        console.error('Error in asyncFunc:', error.message);
    });