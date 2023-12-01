// Анализатор сложности пароля: создайте функцию, 
// которая оценивает сложность введенного пользователем пароля. 
// Необходимо анализировать длину пароля, 
// использование различных символов, 
// наличие чисел и букв в разных регистрах. 
// Выведите пользователю оценку сложности пароля и предложите улучшения, 
// если пароль слишком слабый.

function analyzePassword() {
    const passwordInput = document.getElementById('password-input');
    const passwordRating = document.getElementById('password-rating');
    const msg = document.getElementById('improvement-suggestions');

    const password = passwordInput.value;
    const length = password.length;
    const hasLowerCase = /[a-zа-я]/.test(password);
    const hasUpperCase = /[A-ZА-Я]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let rating = 0;
    msg.textContent = 'Рекомендации: введите ';

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