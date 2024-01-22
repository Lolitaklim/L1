// Разработайте страницу, отображающую таблицу с данными. 
// Данные необходимо подгружать из этого источника.
// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию 
// и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице) 

// Когда DOM загружен, запускаем функцию fetchData
document.addEventListener('DOMContentLoaded', function () {
  fetchData();
});

// Глобальная переменная для хранения всех загруженных данных
let allData = [];

// Функция для загрузки данных
function fetchData() {
    fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true')
    .then(response => response.json()) // Преобразуем ответ в JSON
    .then(data => {
        // Сохраняем загруженные данные в глобальной переменной
        allData = data;
        // Вызываем функцию отображения данных
        displayData();
    });
}

// Количество элементов на странице и текущая страница
const itemsPerPage = 50;
let currentPage = 1;

// Переменные для сортировки
let sortedColumn = null;
let sortDirection = 1;

// Функция для отображения данных на странице
function displayData() {
    // Получаем и очищаем данные таблицы
    const tableBody = document.getElementById('dataBody');
    tableBody.innerHTML = '';

    // Получаем текущие отображаемые данные из массива всех данных
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = allData.slice(startIndex, endIndex);

    // Проходим по текущим данным и добавляем строки в таблицу
    currentData.forEach(item => {
        // Заполняем ячейки данными из объекта
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.tel}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>${item.state}</td>
            <td>${item.zip}</td>
        `;
        // Добавляем строку в тело таблицы
        tableBody.appendChild(row);
    });
    // Вызываем функцию обновления пагинации
    updatePagination();
}

// Функция для обновления таблицы с номером текущей страницы
function updatePagination() {
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = currentPage;
}

// Функция для перехода на предыдущую страницу
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        // Вызываем функцию отображения данных для новой страницы
        displayData();
    }
}

// Функция для перехода на следующую страницу
function nextPage() {
    const totalPages = Math.ceil(1000 / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayData();
    }
}

// Функция для сортировки данных по выбранному столбцу
function sortColumn(columnIndex) {
    // Проверяем, был ли уже выбран тот же столбец
    if (sortedColumn === columnIndex) {
        // Инвертируем направление сортировки
        sortDirection *= -1;
    } else {
        // Если выбран новый столбец, устанавливаем направление сортировки по возрастанию
        sortDirection = 1;
        sortedColumn = columnIndex;
    }

    // Сортируем все данные по выбранному столбцу
    allData.sort((a, b) => {
        const keyA = a[sortedColumn];
        const keyB = b[sortedColumn];
    
        // Проверяем, являются ли значения строками перед использованием localeCompare
        if (typeof keyA === 'string' && typeof keyB === 'string') {
            return sortDirection * keyA.localeCompare(keyB);
        } else {
            // Если значения не являются строками, используем обычное числовое сравнение
            return sortDirection * (keyA - keyB);
        }
    });

    // После сортировки возвращаемся на первую страницу
    currentPage = 1;
    // Вызываем функцию отображения данных с учетом новой сортировки
    displayData();
}