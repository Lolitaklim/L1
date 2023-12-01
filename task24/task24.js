// Разработайте страницу, отображающую таблицу с данными. 
// Данные необходимо подгружать из этого источника.
// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию 
// и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

document.addEventListener('DOMContentLoaded', function () {
  fetchData();
});

function fetchData() {
  fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true')
      .then(response => response.json())
      .then(data => displayData(data));
}

const itemsPerPage = 50;
let currentPage = 1;

function displayData(data) {
    const tableBody = document.getElementById('dataBody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    currentData.forEach(item => {
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
        tableBody.appendChild(row);
    });

    updatePagination();
}

function updatePagination() {
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = currentPage;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchData();
    }
}

function nextPage() {
    const totalPages = Math.ceil(1000 / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        fetchData();
    }
}


