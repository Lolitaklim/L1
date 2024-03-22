//  Решение 1, вызов функций в цикле с использованием колбэков

const functionsArray = [
    () => {
        setTimeout(() => {
            // вывод порядкового номера
            console.log('1');
            // переход к следующей функции в массиве
            callNextFunction(1);
        }, 1500);
    },
    () => {
        setTimeout(() => {
            console.log('2');
            callNextFunction(2);
        }, 2500);
    },
    () => {
        setTimeout(() => {
            console.log('3');
            callNextFunction(3);
        }, 1000);
    },
    () => {
        setTimeout(() => {
            console.log('4');
        }, 500);
    }    
];

// функция, которая вызывает следующую функцию в массиве
function callNextFunction(index) {
    // если currentIndex меньше длины массива
    if (currentIndex < functionsArray.length) {
        // вызывает следующую функцию
        functionsArray[currentIndex]();
    }
    // итерация индекса
    currentIndex++;
}

// переменная, которая отслеживает текущий индекс функции
let currentIndex = 0;

// вызывает первую функцию из массива
callNextFunction(0);



