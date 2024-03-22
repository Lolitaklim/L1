// базовый класс Shape (фигура)
// определяет общий интерфейс для всех фигур, позволяя определить методы, 
// которые должны быть реализованы во всех подклассах
class Shape {
    // конструктор класса
    constructor() {
        // проверка на попытку создания экземпляра абстрактного класса
        if (this.constructor === Shape) {
            throw new Error("Невозможно создать экземпляр абстрактного класса");
        }
    }
    // метод расчета площади (абстрактный метод) заглушка
    calculateArea() {
        throw new Error('Метод не реализован');
    }
    // метод расчета периметра заглушка
    calculatePerimeter() {
        throw new Error('Метод не реализован');
    }
}

// класс прямоугольника, наследуется от базового класса Shape
class Rectangle extends Shape {
    // конструктор принимает длину и ширину прямоугольника
    constructor(length, width) {
        // вызов конструктора базового класса
        super();
        // инициализация свойств длины и ширины
        this.length = length;
        this.width = width;
    }
    // переопределение метода расчета площади для прямоугольника
    calculateArea() {
        return this.length * this.width;
    }
    // переопределение метода расчета периметра для прямоугольника
    calculatePerimeter() {
        return 2 * (this.length + this.width);
    }
}

// класс круга, наследуется от базового класса Shape
class Circle extends Shape {
    // конструктор принимает радиус круга
    constructor(radius) {
        super();
        this.radius = radius;
    }
    // переопределение метода расчета площади для круга
    calculateArea() {
        const area = Math.PI * this.radius * this.radius;
        return this.roundResult(area);
    }
    // переопределение метода расчета периметра для круга
    calculatePerimeter() {
        const perimeter = 2 * Math.PI * this.radius;
        return this.roundResult(perimeter);
    }

    // функция для округления результата до двух знаков после запятой
    roundResult(value) {
        return Math.round(value * 100) / 100; 
    }
}

// класс треугольника, наследуется от базового класса Shape
class Triangle extends Shape {
    // конструктор принимает длины сторон треугольника
    constructor(side1, side2, side3) {
        super();
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    // переопределение метода расчета площади для треугольника
    calculateArea() {
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }
    // переопределение метода расчета периметра для треугольника
    calculatePerimeter() {
        return this.side1 + this.side2 + this.side3;
    }
}

// создание экземпляров классов
const rectangle = new Rectangle(5, 10);
console.log('Площадь прямоугольника:', rectangle.calculateArea());
console.log('Периметр прямоугольника:', rectangle.calculatePerimeter());

const circle = new Circle(7);
console.log('Площадь круга:', circle.calculateArea());
console.log('Периметр круга:', circle.calculatePerimeter());

const triangle = new Triangle(3, 4, 5);
console.log('Площадь треугольника:', triangle.calculateArea());
console.log('Периметр треугольника:', triangle.calculatePerimeter());