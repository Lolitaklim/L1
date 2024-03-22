// Решение 3, функция-конструктор и прототипы

// Функция-конструктор для создания объекта книги
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

// Прототипные методы для получения и изменения значений свойств книги
Book.prototype.getTitle = function() {
    return this.title;
}

Book.prototype.getAuthor = function() {
    return this.author;
}

Book.prototype.getYear = function() {
    return this.year;
}

Book.prototype.setTitle = function(newTitle) {
    this.title = newTitle;
}

Book.prototype.setAuthor = function(newAuthor) {
    this.author = newAuthor;
}

Book.prototype.setYear = function(newYear) {
    this.year = newYear;
}


// Создаем объект, представляющий книгу
const book = new Book("Мои любимые юморески", "Ротнов Дмитрий", 2017);

console.log(book.getTitle() + ',',book.getAuthor() + ',',book.getYear());

book.setTitle("Сборник анекдотов");
book.setAuthor("Лолита");
book.setYear(2023);

console.log(book.getTitle() + ',',book.getAuthor() + ',',book.getYear());