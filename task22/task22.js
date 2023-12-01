// Посчитайте сколько раз можно вызвать функцию document.write() 
// внутри document.write().
// Объясните результат.

let count = 0;
// каждый вызов функции добавляет новый скрипт
function recursiveDocumentWrite() {
  try {
    document.write(`Вызов номер: ${++count}<br> <script>recursiveDocumentWrite();<\/script>`);
  } catch (error) {
    console.error("Произошла ошибка после " + count + " вызовов");
  }
}

recursiveDocumentWrite();

// ошибка просходит после 21 вызова

// существует ограничение на количество скриптов, 
// которые могут быть вставлены с использованием document.write(), 
// когда эти ограничения достигаются,
// браузер начинает игнорировать дополнительные вызовы.