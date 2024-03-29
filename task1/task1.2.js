// Решение 2, используем цикл

function isPalindrome(str) {
    // убираем все кроме букв и цифр и приводим к нижнему регистру
    str = str.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');

    // сравнивает символы с обоих концов строки
    // пока i меньше половины длины строки
    for(let i = 0; i < str.length / 2; i++) {
        // сравниваем символ в текущей позиции i с символом в позиции str.length - 1 - i
        if(str[i] !== str[str.length - 1 - i]) return false;
    }
    return true;
}

let str = 'Аргентина манит негра!';
let str2 = 'не Палиндром';
let str3 = '123211';

console.log(isPalindrome(str), isPalindrome(str2), isPalindrome(str3));
