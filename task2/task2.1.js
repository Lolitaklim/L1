// Решение 1, перебор всех делителей числа и вычисление их суммы

function isStrangeNum(num) {
    // странным числом не может быть 1 или меньше
    if (num <= 1) return false; 

    let sum = 0;
    // проходим по всем числам от 1 до входного
    // если входное число делится без остатка то делитель идет в сумму
    for (let i = 1; i < num; i++) sum += (num % i === 0) * i;
    // возвращаем истину если входное число равно сумме всех делителей кроме себя
    return sum === num;
}

console.log(isStrangeNum(10), isStrangeNum(28), isStrangeNum(496))