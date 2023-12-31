// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов
// (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. 
// Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

document.addEventListener('DOMContentLoaded', function () {
    // api ключ
    const apiKey = '05bc5aab-25f4-43fe-b939-d1425c76c54f';

    // функция для отправки запроса на Яндекс карты
    function geocode(address, callback) {
        // URL для запроса
        const apiUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(address)}&format=json`;

        // отправка запроса
        fetch(apiUrl)
            .then(response => {
                // проверка успешности ответа
                if (!response.ok) {
                    throw new Error(`Failed address: ${address}`);
                }
                // преобразование ответа в JSON
                return response.json();
            })
            .then(data => {
                // извлечение информации из JSON-ответа
                const results = data.response.GeoObjectCollection.featureMember.map(item => item.GeoObject.name);
                // вызов колбэка с результатами
                callback(results);
            })
            .catch(error => {
                // обработка ошибок
                console.error(error);
            });
    }

    // функция для создания замыкания с дебаунсингом и троттлингом
    function debounce(fn, delay) {
        // идентификатор таймера
        let timeoutId;

        return function (...args) {
            // если таймер уже установлен, сбрасываем его
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // устанавливаем новый таймер для вызова функции с задержкой
            timeoutId = setTimeout(() => {
                // вызов оригинальной функции с переданными аргументами
                fn(...args);
                // сброс идентификатора таймера
                timeoutId = null;
            }, delay);
        };
    }

    // получение элементов 
    const addressInput = document.getElementById('addressInput');
    const resultsList = document.getElementById('resultsList');

    // функция для обработки ввода пользователя
    function handleInput() {
        // получение значения из поля ввода и удаление лишних пробелов
        const inputValue = addressInput.value.trim();

        // выполнение геокодирования с защитой от троттлинга
        geocodeDebounced(inputValue, displayResults);
    }

    // функция для отображения результатов
    function displayResults(results) {
        // очистка списка результатов перед отображением новых
        resultsList.innerHTML = '';
        // отображение списка результатов
        resultsList.style.display = 'block';

        // добавление результатов в список
        results.forEach(result => {
            // создание элемента списка
            const listItem = document.createElement('li');
            // текстовое содержимое элемента списка
            listItem.textContent = result;

            // выбор результата
            listItem.addEventListener('click', () => {
                // при выборе адреса устанавливаем его в поле поиска и скрываем список результатов
                addressInput.value = result;
                resultsList.style.display = 'none';
            });

            // добавление элемента списка в родительский элемент
            resultsList.appendChild(listItem);
        });
    }

    // создание функции с дебаунсингом и троттлингом для обработки ввода пользователя
    const geocodeDebounced = debounce(geocode, 300);

    // добавление слушателя события ввода для поля поиска
    addressInput.addEventListener('input', handleInput);

});
