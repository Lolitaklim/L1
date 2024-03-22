// Импортируем библиотеку Moment.js
import moment from 'moment';

// экспортируем функцию для работы с датами
export function getCurrentDateFormatted(format) {
    return moment().format(format);
}

// console.log(getCurrentDateFormatted('DD.MM.YYYY HH:mm:ss'));