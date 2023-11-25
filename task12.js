// Задача на работу с объектами: 
// создайте объект, представляющий собой книгу. 
// Объект должен иметь свойства, такие как: название книги, автор и год издания. 
// Напишите методы для получения и изменения значений свойств книги.

// Создаем объект, представляющий книгу
const book = {
    title: "Мои любимые юморески",
    author: "Ротнов Дмитрий",
    year: 2017,

    // методы для получения названия, автора и года издания книги
    getTitle: function() {
        return this.title;
    },

    getAuthor: function() {
        return this.author;
    },

    getYear: function() {
        return this.year;
    },

    // методы для изменения названия, автора и года издания книги
    setTitle: function(newTitle) {
        this.title = newTitle;
    },

    setAuthor: function(newAuthor) {
        this.author = newAuthor;
    },

    setYear: function(newYear) {
        this.year = newYear;
    }
};


console.log(book.getTitle() + ',',book.getAuthor() + ',',book.getYear());

book.setTitle("Сборник анекдотов");
book.setAuthor("Лолита");
book.setYear(2023);

console.log(book.getTitle() + ',',book.getAuthor() + ',',book.getYear());