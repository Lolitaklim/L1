// Решение 1, точность до 2 байт

localStorage.clear();

const localStorageVolume = function() {

    // размер данных в localStorage (начинаем c 10, тк 10 байт занимает ключ 'bytes')
    let dataSize = 10;

    // индекс ключа килобайт
    let keyIndexKb = 0;
    // значение в килобайтах (1 килобайт = 1024 байта, 1 байт = 2 символа utf-16, 1 символ 2 байта)
    const valueKb =  'а'.repeat(1024); // 2 килобайта

    // ключ для байт
    const keyB = 'bytes';
    // значение байт
    let valueB = '';

    // заполнение localStorage до максимального лимита
    while (true) {

        // ключ для килобайт
        let keyKb = `kilobytes${keyIndexKb}`;

        try {
            // попытка установки элемента в localStorage (ключ и значение)
            localStorage.setItem(keyKb, valueKb);
        } catch (e) {            
            // достигнут лимит, теперь пытаемся записать по байтам
            while (true) {

                try {
                    // увеличиваем значение на один символ
                    valueB += 'a';
                    // попытка установки элемента в localStorage
                    localStorage.setItem(keyB, valueB);                    
                } catch (error) {
                    
                    // добавляем размер данных в localStorage (на 2, тк utf-16 1 символ 2 б, уменьшаем на 2, тк последний символ не добавился)
                    dataSize += (valueB.length) * 2 - 2;
                    // выходим из цикла
                    break;
                }
            }

            // выходим из цикла
            break;
        }

        // добавляем размер данных в localStorage (на 2, тк utf-16 1 символ 2 б)
        dataSize += (keyKb.length + valueKb.length) * 2;
        // увеличиваем индекс ключа килобайт
        keyIndexKb++;
    }

    localStorage.clear();
    return dataSize;
};


// получаем результат
const sizeBytes = localStorageVolume();

// выводим результат
const maxSize = document.getElementById('maxSize');
maxSize.textContent = `${sizeBytes} байт, ${(sizeBytes / 1024).toFixed(6)} KB, ${(sizeBytes / (1024 * 1024)).toFixed(6)} MB`;





    


