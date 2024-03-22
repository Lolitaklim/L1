// Решение 2, с помощью классов

// Создаем класс, представляющий книгу
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    // методы для получения названия, автора и года издания книги
    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getYear() {
        return this.year;
    }

    // методы для изменения названия, автора и года издания книги
    setTitle(newTitle) {
        this.title = newTitle;
    }

    setAuthor(newAuthor) {
        this.author = newAuthor;
    }

    setYear(newYear) {
        this.year = newYear;
    }
};

// Создаем объект, представляющий книгу
const book = new Book("Мои любимые юморески", "Ротнов Дмитрий", 2017);

console.log(book.getTitle() + ',',book.getAuthor() + ',',book.getYear());

book.setTitle("Сборник анекдотов");
book.setAuthor("Лолита");
book.setYear(2023);

console.log(book.getTitle() + ',',book.getAuthor() + ',',book.getYear());