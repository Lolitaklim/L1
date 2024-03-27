// получаем элементы
const passwordInput = document.getElementById('password-input');
const passwordRating = document.getElementById('password-rating');
const msg = document.getElementById('improvement-suggestions');

// добавляем обработчик события на ввод пароля
passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {
    // получаем значение пароля
    const password = passwordInput.value;

    // получаем длину пароля
    const length = password.length;

    // проверка наличия строчных, заглавных букв, цифр и спецсимволов
    const hasLowerCase = /[a-zа-я]/.test(password);
    const hasUpperCase = /[A-ZА-Я]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // оценка пароля и рекомендации
    let rating = 0;
    msg.textContent = 'Рекомендации: введите ';

    // если пароль пустой, то сбрасываем оценку и рекомендации
    if (!length) {
      msg.textContent = '';
      passwordRating.textContent = '';
      return;
    }

    // проверка длины
    if (length >= 8) {
      rating += 1;
    } else {
      msg.textContent += 'больше восьми символов; ';
    }
  
    // проверка наличия строчных букв
    if (hasLowerCase) {
      rating += 1;
    } else {
      msg.textContent += 'строчную букву; ';
    }

    // проверка наличия заглавных букв
    if (hasUpperCase) {
        rating += 1;
    } else {
        msg.textContent += 'заглавную букву; ';
    }
  
    // проверка наличия цифр
    if (hasNumbers) {
      rating += 1;
    } else {
      msg.textContent += 'цифру; ';
    }
  
    // проверка наличия спецсимволов
    if (hasSpecialChars) {
      rating += 1;
    } else {
      msg.textContent += 'специальный символ; ';
    }

    // Отображение оценки
    if (rating <= 3) {
      passwordRating.textContent = 'Слабый';
      passwordRating.style.color = 'red';
    } else if (rating <= 4) {
      passwordRating.textContent = 'Средний';
      passwordRating.style.color = 'orange';
    } else {
      passwordRating.textContent = 'Сильный';
      passwordRating.style.color = 'green';
      msg.textContent = '';
    }

}