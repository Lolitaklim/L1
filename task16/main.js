// Импортируем модуль с функциями для работы с датами
const dateUtils = require('./task16.js');

// Используем функции модуля
const formattedDate = dateUtils.getCurrentDateFormatted('YYYY-MM-DD HH:mm:ss');
console.log('Current date formatted:', formattedDate);