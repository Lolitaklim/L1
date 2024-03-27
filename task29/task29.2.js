//  Решение 2, слушатель событий на кнопке и использование метода FormData

document.forms[1].addEventListener('submit', function(event) {
    // предотвращаем отправку формы по умолчанию
    event.preventDefault();

    // создаем объект FormData, передавая текущую форму в качестве аргумента
    const formData = new FormData(this);

    // преобразуем данные формы в объект JSON
    const formDataJSON = {};
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    // выводим данные в консоль
    console.log('Данные формы:', formDataJSON);

    // отправляем данные на сервер
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJSON),
    })
    .then(response => response.json())
    .then(data => console.log('Ответ от сервера:', data))
    .catch(error => console.error('Ошибка при отправке данных:', error));
});