//  Решение 1, привязывание функции к событию щелчка кнопки, получение данных через getElement

function submitForm() {
    // получаем данные из формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Заполните все поля');
        return;
    }

    // выводим данные в консоль
    console.log('Имя:', name);
    console.log('Email:', email);

   // отправляем данные на сервер
   fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => console.log('Ответ от сервера:', data))
    .catch(error => console.error('Ошибка при отправке данных:', error));
}