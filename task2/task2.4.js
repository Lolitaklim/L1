// Решение 4, кеширование
const cachedSums = {}; // объект для кэширования сумм делителей


function isStrangeNum(num) {
    // Если сумма для числа уже была вычислена, возвращаем её из кэша
    if (cachedSums[num]) {
        return cachedSums[num]; 
    }

    if (num <= 1) return false;
    let sum = 1; 

    for (let i = 2; i <= num / 2; i++) sum += (num % i === 0)* i;

    // если входное число равно сумме всех делителей кроме себя, сохраняем и возвращаем истину
    if(sum === num ) {
        cachedSums[num] = sum;
        return true;
    }

   return false;
}

console.log(isStrangeNum(10), isStrangeNum(28), isStrangeNum(496))