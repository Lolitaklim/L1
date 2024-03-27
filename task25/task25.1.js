function createAddElement() {
    // создаем новый элемент
    const newElement = document.createElement('div');

    // добавляем новый элемент в тело документа
    document.body.appendChild(newElement);

    // устанавливаем стили с помощью CSS
    newElement.style.width = '80px';
    newElement.style.height = '60px';
    newElement.style.backgroundColor = 'lightpink';
    newElement.style.color = 'black';
    newElement.style.fontSize = '20px';
    newElement.style.margin = '20px';
    newElement.style.padding = '10px';
    newElement.style.border = '5px pink solid';
    newElement.style.borderRadius = '15px';
    newElement.style.userSelect = 'none';

    // добавляем обработчики событий для наведения и отведения мыши
    newElement.addEventListener('mouseenter', function() {
        // устанавливаем стили при наведении
        this.style.transform = 'scale(1.1)';
    });

    newElement.addEventListener('mouseleave', function() {
        // устанавливаем стили при отведении
        this.style.transform = 'scale(1)';
    });

    // устанавливаем текст
    newElement.textContent = 'Новый элемент';
}

createAddElement();
