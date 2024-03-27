// Решение 2, вручную

// создание и добавление карточки товара
function createProductCard2(product) {

    // создаем новый элемент, который будет содержать карточку товара
    const card = document.createElement('div');
    // добавляем класс
    card.classList.add('product-card');

    // создаем элементы для карточки товара
    const title = document.createElement('h3');
    title.classList.add('product-title');
    title.textContent = product.title;
    card.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('product-description');
    description.textContent = product.description;
    card.appendChild(description);

    const price = document.createElement('span');
    price.classList.add('product-price');
    price.textContent = `${product.price} руб.`;
    card.appendChild(price);

    const button = document.createElement('button');
    button.classList.add('add-to-cart-btn');
    button.textContent = "Купить";
    card.appendChild(button);

    //  добавляем карточку товара в контейнер
    container.appendChild(card);
}

// данные о товарах
const products2 = [
    {
        title: 'Сухарики',
        description: 'вкусные сухарики из пшеницы',
        price: 18
    },
    {   
        title: 'Шоколадка',
        description: 'вкусная шоколадка из какао',
        price: 75
    },
];

// создаем карточки товаров
products2.forEach(product => {
  createProductCard2(product);
});