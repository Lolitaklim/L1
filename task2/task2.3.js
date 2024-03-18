// Решение 2, рекурсия

// i - делитель, с которого мы начинаем проверку (по умолчанию это 2)
// sum - сумма всех делителей числа num (по умолчанию 1)
function isStrangeNum(num, i = 2, sum = 1) {
    if (num <= 1) return false;

    // достигли ли мы половины числа num в качестве делителя
    if (i > num / 2) return sum === num;

    // если i является делителем num, добавляем его к сумме делителей
    if (num % i === 0) sum += i;

    // вызываем рекурсивно функцию isStrangeNum, передавая те же аргументы, но с увеличенным на 1 значением i
    return isStrangeNum(num, i + 1, sum);
}

console.log(isStrangeNum(10), isStrangeNum(28), isStrangeNum(496))