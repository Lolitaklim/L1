// Решение 2, замыкание внутри самовызывающейся функции

const incrementCounter = (function () {
    // переменная, которую нужно запомнить
    let count = 0;
    
    // возвращаем внутреннюю функция
    return function () {
      // увеличиваем нашу запомненную переменную
      count++;
      console.log(count);
    }
})();
  
incrementCounter(); // 1
incrementCounter(); // 2
  