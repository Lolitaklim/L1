// Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом. Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).

let str = 'Аргентина манит негра!';
let str2 = 'Улыбок тебе, дед Mакар'

function isPalindrom(str) {
    // получаем строку
    // убираем все кроме букв
    // разбиваем на массив букв
    // переворачиваем
    // объединяем в строку
    // переводим все в нижний регистр
    // сравниваем с полученной строкой у которой убрали все кроме букв и перевели в нижний регистр
    return str.replace(/[^a-zA-Zа-яА-Я]/g, '').split('').reverse().join('').toLowerCase()===str.replace(/[^a-zA-Zа-яА-Я]/g, '').toLowerCase();
}

console.log(isPalindrom(str), isPalindrom(str2));
