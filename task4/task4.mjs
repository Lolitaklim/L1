// принимаем число и слово в и.п. ед.ч., р.п. ед.ч. и р.п. мн.ч.
export const changingWordEndings = (num, [nominativeSing,genitiveSing,genitivePlur]) => {
    // последняя цифра числа
    const lastDigit = num % 10;
    // две последние цифры числа
    const lastTwoDigit = num % 100;

    // если число оканчивается на 1, но не на 11
    if(lastDigit === 1 && lastTwoDigit !== 11) {
        // и.п. ед.ч.
        return nominativeSing;
    }
    // если число заканчивается на 2, 3, или 4, но не на 12,13,14
    if( [2,3,4].includes(lastDigit) && ![12,13,14].includes(lastTwoDigit)) {
        // р.п. ед.ч
        return genitiveSing;
    }
    // во всех остальных случаях р.п. мн.ч
    return genitivePlur;
}

// console.log(changingWordEndings(21, ['сообщение','сообщения','сообщений']));




