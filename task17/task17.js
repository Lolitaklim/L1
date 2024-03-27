// api ключ
const apiKey = '05bc5aab-25f4-43fe-b939-d1425c76c54f';

// функция для отправки запроса на Яндекс карты
function geocode(inputValue, displayResults) {
    // URL для запроса
    const apiUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(inputValue)}&format=json`;

    // отправка запроса
    fetch(apiUrl)
        .then(response => {
            // проверка успешности ответа
            if (!response.ok) {
                throw new Error(`Failed address: ${inputValue}`);
            }
            // преобразование ответа в JSON
            return response.json();
        })
        .then(data => {
            // извлечение информации из JSON-ответа
            const results = data.response.GeoObjectCollection.featureMember.map(item => item.GeoObject.name);
            // вызов колбэка с результатами
            displayResults(results);
        })
        .catch(error => {
            // обработка ошибок
            console.error(error);
        });
}

// функция для создания замыкания с дебаунсингом и троттлингом
function debounce(geocode, delay) {
    // идентификатор таймера
    let timeoutId;

    return function (inputValue, displayResults) {
        // если таймер уже установлен, сбрасываем его
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // устанавливаем новый таймер для вызова функции с задержкой
        timeoutId = setTimeout(() => {
            // вызов оригинальной функции с переданными аргументами
            geocode(inputValue, displayResults);
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

    // проверка на пустую строку
    if (inputValue !== '') {
        // выполнение геокодирования с защитой от троттлинга
        geocodeDebounced(inputValue, displayResults);
    } else {
        // Если строка пустая, очищаем список результатов и скрываем его
        resultsList.innerHTML = '';
        resultsList.style.display = 'none';
    }
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


