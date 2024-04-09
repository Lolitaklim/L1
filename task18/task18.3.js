// Решение 3, не теряя уже записанные данные

// сколько занято в хранилище
function calculateLocalStorageSize() {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const itemSize = (key.length + value.length) * 2;
      totalSize += itemSize;
    }
    return totalSize; // в байтах
}

// максимальный объем хранилища
const sizeBytes = (function() {

    const initialSize = calculateLocalStorageSize();
    let dataSize = 10 + initialSize;

    let keyIndexKb = 0;
    const valueKb =  'а'.repeat(1024); // 2 килобайта

    const keyB = 'bytes';
    let valueB = '';

    while (true) {
        let keyKb = `kilobytes${keyIndexKb}`;
        try {
            localStorage.setItem(keyKb, valueKb);
        } catch (e) {            
            while (true) {
                try {
                    valueB += 'a';
                    localStorage.setItem(keyB, valueB);                    
                } catch (error) {
                    dataSize += (valueB.length) * 2 - 2;
                    break;
                }
            }
            break;
        }
        dataSize += (keyKb.length + valueKb.length) * 2;
        keyIndexKb++;
    }
    
    // удаление добавленных элементов из localStorage
    for (let i = 0; i < keyIndexKb; i++) {
        let keyKb = `kilobytes${i}`;
        localStorage.removeItem(keyKb);
    }
    localStorage.removeItem('bytes');

    return dataSize;
})();

// выводим результат
const maxSize = document.getElementById('maxSize');
maxSize.textContent = `${sizeBytes} байт, ${(sizeBytes / 1024).toFixed(6)} KB, ${(sizeBytes / (1024 * 1024)).toFixed(6)} MB`;

