// Решение 1, используем методы массива

function isPalindrome(str) {
    // убираем все кроме букв и цифр и приводим к нижнему регистру
    str = str.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');

    // возвращаем сравнение: полученная строка и строка которую 
    // разбираем на массив, переворачиваем, собираем в строку
    return str === str.split('').reverse().join('');
}

let str = 'Аргентина манит негра!';
let str2 = 'не Палиндром';
let str3 = '12321';

console.log(isPalindrome(str), isPalindrome(str2), isPalindrome(str3));
