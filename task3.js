// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания

const MathX = (function() {
    // приватные функции

    // вычисление N-го числа в ряду Фибоначчи 
    function nthFibonacci (n) {
        // инициализация первых двух значений ряда
        let [a, b] = [0, 1];
        // пока порядок числа меньше заданного 
        for(let i = 2; i < n; i++) {
            // обновляем числа перемещая их в последовательности
            [a, b] = [b, a + b];
        }
        return b;
    };

    // вычисление всех чисел в ряду Фибоначчи до числа N
    function seriesFibonacci (n) {
        let [a, b] = [0, 1];
        // массив для хранения ряда чисел
        let series = [];
        // пока значение числа а в ряду меньше заданного значения
        for (let i = 2; a < n; i++) {
            // добавляем текущее число в массив
            series.push(a);
            [a, b] = [b, a + b];
        }
        return series;
    };

    // является ли число простым
    function isPrime (n) {
        // проходим по всем числам меньших корня заданного
        for(let i = 2; i * i <= n; i++) {
            // если нет остатка от деления число не простое
            if (n % i === 0) return false;
        }
        // число простое, если > 1
        return n > 1;        
    }

    // вычисление N-го просто числа
    function nthPrime (n) {
        // начало с первого простого числа
        let number = 2;
        // индекс текущего простого числа
        let index = 0;
        // пока не достигнут нужный индекс
        while(index < n) {
            // увеличиваем индекс, если текущее число простое
            if(isPrime(number)) index++;
            // увеличиваем число, если еще не достигнут нужный индекс
            if(index < n) number++;
        }
        return number;
    }

    // вычисление всех простых чисел до числа N
    function seriesPrime (n) {
        let series = [];
         // проверяем каждое число до n на простоту
        for (let i = 2; i < n; i++) {
            // добавляем простое число в массив
            if (isPrime(i)) series.push(i);
        }
        return series;
    }

    // Публичные методы
    return {
        nthFibonacci:nthFibonacci,
        seriesFibonacci:seriesFibonacci,
        nthPrime:nthPrime,
        seriesPrime:seriesPrime
    }
})();

console.log(MathX.nthFibonacci(17)); 
console.log(MathX.seriesFibonacci(988)); 
console.log(MathX.nthPrime(4)); 
console.log(MathX.seriesPrime(17)); 


