// Задача: Взаимодействие с формами: 
// Напишите функцию, которая получает данные из формы на веб-странице
// и выполняет определенные действия с этими данными, 
// например, отправляет их на сервер 
// или отображает всплывающее окно с результатами.

function submitForm() {
    // получаем данные из формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // выводим данные в консоль
    console.log('Имя:', name);
    console.log('Email:', email);

   // отправляем данные на сервер
   fetch('https://eo7difimj6z2ziv.m.pipedream.net', {
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