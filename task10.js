// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

function customParse(jsonString) {
    let index = 0;

    function parseValue() {
        // получаем текущий символ по индексу
        const char = jsonString[index];
        // если { значит это начало объекта
        if (char === '{') return parseObject();
        // если [ - начало массива
        if (char === '[') return parseArray();
        // если " - начало строки
        if (char === '"') return parseString();
        // если цифра, знак минуса или точка, значит, это число
        if (/[0-9-]/.test(char)) {
            return parseNumber();
        } 
        // если текущий символ - 't' и следующие 4 символа - 'true', это логическое значение true
        if (char === 't' && jsonString.slice(index, index + 4) === 'true') {
            // увеличиваем индекс на 4 символа 
            index += 4; 
            return true;
        }
        // аналогично false
        if (char === 'f' && jsonString.slice(index, index + 5) === 'false') {
            index += 5;
            return false;
        } 
        // аналогично null
        if (char === 'n' && jsonString.slice(index, index + 4) === 'null') {
            index += 4; 
            return null;
        } 
        
        // Если текущий символ не соответствует ни одному из вышеуказанных случаев, выбрасываем ошибку
        throw new Error(`Unexpected character: ${char}`);
    }

    function parseObject() {
        // создаем объект для хранения пар ключ-значение
        const obj = {};
        // пропускаем {
        index++; 
        // парсим пары ключ-значение, пока не встретим }
        while (jsonString[index] !== '}') {
            // ожидаем строку в кавычках
            const key = parseString();
            // пропускаем :, разделяющее ключ и значение
            index++;     
            // парсим значение объекта
            const value = parseValue();
            // записываем пару ключ-значение в объект
            obj[key] = value;
            // пропускаем запятую
            if (jsonString[index] === ',') {
                index++; 
            }
        }
        // пропускаем }
        index++; 

        return obj;
    }

    function parseArray() {
        // создаем массив для хранения значений
        const arr = [];
        // пропускаем [
        index++; 
        // парсим значения массива до тех пор, пока не встретим ]
        while (jsonString[index] !== ']') {
            // парсим значение
            const value = parseValue();
            // добавляем значение
            arr.push(value);
            // пропускаем запятую
            if (jsonString[index] === ',') {
                index++; 
            }
        }
        // пропускаем ]
        index++; 

        return arr;
    }

    function parseString() {
        // создаем переменную для хранения строки
        let result = '';
        // пропускаем "
        index++; 
        // проходим по строке до тех пор, пока не встретим "
        while (jsonString[index] !== '"') {
            // добавляем текущий символ к результату
            result += jsonString[index];
            // переходим к следующему символу
            index++;
        }
        // пропускаем "
        index++; 
    
        return result;
    }
    
    function parseNumber() {
        // создаем переменную для хранения числа в виде строки
        let numStr = '';
        // проходим по строке до тех пор, пока текущий символ соответствует шаблону числа
        while (/[0-9.eE+-]/.test(jsonString[index])) {
            // добавляем текущий символ к строке
            numStr += jsonString[index];
            // переходим к следующему символу
            index++;
        }
        // преобразуем строку числа в число с плавающей точкой 
        return parseFloat(numStr);
    }

    return parseValue();
}


const jsonString = '{"name":"John","age":30,"isStudent":null,"hobbies":["reading","coding"]}';

console.log(customParse(jsonString));
console.log(JSON.parse(jsonString));


const jsonString2 = '[50.45,"foo",true,{"key":"value"}]';

console.log(customParse(jsonString2));
console.log(JSON.parse(jsonString2));

