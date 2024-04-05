// Решение 2, точность до 1 мегабайта
localStorage.clear(); 

function numWithZeros(number) {
    // приводим число к строковому типу
    let str = String(number);
    // дополняем нулями спереди до 10 символов
    while (str.length < 10) {
        str = '0' + str;
    }
    return str;
}

const localStorageVolume = function() {

    // размер данных в localStorage
    let dataSize = 0;

    // индекс ключа
    let keyIndex = 0;

    // 1 мегабайт за вычетом 20 байт на ключ
    const value =  'а'.repeat(524278); 


    // заполнение localStorage до максимального лимита
    while (true) {

        // ключ 20 байт
        let key = numWithZeros(keyIndex);

        try {
            // попытка установки элемента в localStorage
            localStorage.setItem(key, value);
        } catch (e) {            
            // достигнут лимит, выходим из цикла
            break;
        }

        // добавляем размер данных в localStorage
        dataSize += 1;

        // увеличиваем индекс ключа
        keyIndex++;
    }

    localStorage.clear();
    return dataSize;
};


// получаем результат
const size = localStorageVolume();

// выводим результат
const maxSize = document.getElementById('maxSize');
maxSize.textContent = `${size} MB`;

