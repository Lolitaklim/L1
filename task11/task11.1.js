// Решение 1, возвращаем внутреннюю функцию, которая использует переменную из внешней функции

function createClosure() {
  // переменная, которую нужно запомнить
  let count = 0;
  
  // внутренняя функция
  function counter() {
    // увеличиваем нашу запомненную переменную
    count++;
    console.log(count);
  }

  // возвращаем функцию
  return counter;
}

// создаем новую функцию (с замыканием)
const incrementCounter = createClosure();
incrementCounter(); // 1
incrementCounter(); // 2

const incrementCounter2 = createClosure();
incrementCounter2(); // 1
incrementCounter2(); // 2