// Задача: Создать и добавить стиль для элемента: 
// Напишите функцию, которая создает новый элемент, 
// добавляет его в DOM и устанавливает для него стиль с помощью CSS.

function createAddElement() {
    // создаем новый элемент
    var newElement = document.createElement('div');

    // устанавливаем класс
    newElement.className = 'custom-element';

    // устанавливаем стили
    newElement.style.backgroundColor = 'pink';
    newElement.style.color = 'gray';

    // устанавливаем текст
    newElement.textContent = 'Новый элемент';

    // добавляем новый элемент в тело документа
    document.body.appendChild(newElement);
}

// вызываем функцию при загрузке страницы
window.onload = function () {
    createAddElement();
};