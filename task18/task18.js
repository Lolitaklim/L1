// Подсчитать максимальный объем данных, 
// который можно записать в localStorage вашего браузера.

var fillLocalStorageToMax = function() {
    var keyIndex = 0;
    var dataSize = 0;

    // заполнение localStorage до максимального лимита
    while (true) {
        var key = 'key' + keyIndex;
        // значение 1024 символа
        var value = 'kZRlFrw7pdVlLCtusyV1XnlMHsypaaQ2QDiiclUljHoqOKzc9yG68Hnb8WTxE3kKr6u3RuGyxfJcQ5zqx4PWj3NRyya43DExFk62kB4PDV8ORe74dAE6u5t1ibVADJD3buhe87Isxm2dvuN8Qt4Ied9PoSOFlRO3zOwsQMNgQlNC6vrOv5KeieC82Wi70yHAXNykDxNmNzDF2rskrWnHVBBOKMAPxUCB4MYzeXlZnnDaI2my9RcPZdduLfZZKSl7XYZmhXEuQJ3q7Bg8Tnv65XDM7o22HMTSI0lS0sncMiW5nq3Fk3bmjBUjWaoKhcMH0DuUeitY4RHM9A1Xk0SHUHtB4sawZZOe4OPrIU3CvYjiAj6Bcbu3QC6BLeQ1ny6xveIN7xdNsfDRa0DhPgcZ6en4HorgsVXZsnynXDTKB0HyFCvbPesllY9GutgVHSBKt59t82TSXZrCQP0hLiQEAdwAXkO5Hn5n9Dt59b82264K9AVlu6uah28UBb5galQtecN0iXSVSrv1AI6feZln0gd710sFxpaFzcE0blnrqyRWY7GTzzWLou2MMmd4TIeWcSj9XitQyGzGDfCJeTowyzgwMiNNioxSN4NdMsq4WlXRvtmXTkH4QApJ5nd6W7XBy63VNljhwZsUg1tHv8HHQBqmxG2Oz5qGVoUOr4KCvjATrzEXqmrsFZj0gh01li0bMUP4rCustFmlaXvyDkzVsPiP7Lx6UAXci7DUzy5QB9dJoJqYEcLZNgwCaE6S5pnUEz7OA0GUkginkxSKQg26cm7j6SrJOA4u5CTlscsPdQQZT66kjs1Qyh0PFBkHoYpj8z4xoLAwfQ8hgy0GZ6Hdp53gGuZZMOmzS5XVZgcvzS6kqGsdi1vP4JIwUGaw4wLSatlwRRls70JpJpX4w3tiAKRzxCkkX6nxQ5L4KSpKkAqICPcy49KxIrdXnl2zHPRZaM2x5XJ1sxF8gNDSWedZ6b1qYKd1ZRuWtPmqWBYpkhaJc2QdUoUCbH41CTpRkbjT';

        try {
            // попытка установки элемента в localStorage
            window.localStorage.setItem(key, value);
        } catch (e) {
            // выходим, если достигнут лимит
            break;
        }

        // расчет текущего размера данных в localStorage (на 2, тк utf-16 1 символ 2 б)
        dataSize += (key.length + value.length) * 2;

        keyIndex++;
    }

    localStorage.clear();
    return dataSize;
};


document.addEventListener('DOMContentLoaded', function () {
// получаем результат
var dataSize = fillLocalStorageToMax();

var dataSizeInKB = (dataSize / 1024).toFixed(6);
var dataSizeInMB = (dataSize / (1024 * 1024)).toFixed(6);

var maxSizeSpan = document.getElementById('maxSize');

maxSizeSpan.textContent = dataSize + ' байт, ' + dataSizeInKB + ' KB, ' + dataSizeInMB + ' MB';


});




    


