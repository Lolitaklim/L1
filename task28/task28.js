// Задача: Создать и добавить элемент с использованием шаблонов: 
// Напишите функцию, которая создает новый элемент 
// с использованием шаблонов (например, с помощью тега <template>) 
// и добавляет его в DOM.

function addElement() {
    // получаем шаблон 
    const template = document.getElementById('template');

    // клонируем содержимое шаблона
    const clone = document.importNode(template.content, true);

    // добавляем в DOM
    document.body.appendChild(clone);
}

document.addEventListener('DOMContentLoaded', function() {
    addElement();
    addElement();
});