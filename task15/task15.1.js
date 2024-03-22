// Решение 1, поочередное выполнение асинхронных операций

// асинхронная функция
async function asyncFunc() {
    // ожидание выполнения других асинхронных операций,
    const result1 = await asyncOperation1();

    const result2 = await asyncOperation2();

    // возвращаем результат выполнения
    return `${result1} и ${result2}`;  
}

// асинхронные операции 
function asyncOperation1() {
    // возвращаем промис
    return new Promise((resolve) => {
        // имитация асинхронной операции
        setTimeout(() => {
            console.log('асинхронная операция 1');
            // разрешаем промис
            resolve('асинхронная операция 1 разрешена');
        }, 1500); 
    });
}

function asyncOperation2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('асинхронная операция 2');
            resolve('асинхронная операция 2 разрешена');
        }, 500);
    });
}

asyncFunc()
    .then((finalResult) => {
        console.log('Результат:', finalResult);
    })