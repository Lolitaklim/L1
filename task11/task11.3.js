// Решение 3, замыкание с объектом

// Создаем функцию, которая возвращает объект с методом incrementCounter
function createClosure() {
    // объект, который хранит переменную
    const data = {
        count: 0
    };
    // возвращаем объект с методом
    return {
        // метод, который увеличивает и выводит переменную
        incrementCounter: function() {
            data.count++;
            console.log(data.count);
        }
    };
}

// создаем новый объект (с замыканием)
const returnedObject = createClosure();

// вызываем метод объекта
returnedObject.incrementCounter(); 
returnedObject.incrementCounter(); 