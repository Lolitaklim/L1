// Подсчитать максимальный объем данных, 
// который можно записать в localStorage вашего браузера.
const fillLocalStorageToMax = function() {
    let keyIndex = 0;
    let dataSize = 0;

    // заполнение localStorage до максимального лимита
    while (true) {
        let key = `key${keyIndex}`;
        // значение 1024 символа
        const value = generateRandomString(1024);

        try {
            // попытка установки элемента в localStorage
            localStorage.setItem(key, value);
        } catch (e) {
            // выходим, если достигнут лимит
            break;
        }

        // расчет текущего размера данных в localStorage (на 2, тк utf-16 1 символ 2 б)
        dataSize += (key.length + value.length) * 2;

        keyIndex++;
    }

    localStorage.clear();
    return dataSize;
};

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// получаем результат
const dataSize = fillLocalStorageToMax();

// выводим результат
const maxSizeSpan = document.getElementById('maxSize');
maxSizeSpan.textContent = `${dataSize} байт, ${(dataSize / 1024).toFixed(6)} KB, ${(dataSize / (1024 * 1024)).toFixed(6)} MB`;





    


