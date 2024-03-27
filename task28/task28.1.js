// Решение 1, с помощью  <template>

// шаблон карточки товара
const template = document.getElementById('product-card-template');

// контейнер для карточек товаров
const container = document.getElementById('product-container');

// создание и добавление карточки товара
function createProductCard(product) {
    // клонируем содержимое шаблона
    const card = template.content.cloneNode(true);
    
    // заполняем данные карточки товара
    card.querySelector('.product-title').textContent = product.title;
    card.querySelector('.product-description').textContent = product.description;
    card.querySelector('.product-price').textContent = `${product.price} руб.`;

    //  добавляем карточку товара в контейнер
    container.appendChild(card);
}

// данные о товарах
const products = [
    {
        title: 'Чипсы',
        description: 'вкусные чипсы из картошки',
        price: 80
    },
    {   
        title: 'Мороженное',
        description: 'вкусное мороженное из молока',
        price: 50
    },
    {   
        title: 'Пепси',
        description: 'вкусный газированный напиток',
        price: 35
    }
];

// создаем карточки товаров
products.forEach(product => {
  createProductCard(product);
});

// 28.1.2 так же можно использовать скрытый элемент <div id="product-card-template" style="display:none;">
// 28.1.3 data-атрибут <div id="product-card-template"" data-template="product-card">
