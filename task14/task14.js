
function loadImage(url) {
    // возвращаем новый промис, который будет разрешен или отклонен при загрузке изображения
    return new Promise((resolve, reject) => {
        // создаем новый объект изображения
        const image = new Image();

        // устанавливаем обработчики событий для отслеживания загрузки и ошибок
        // обработчик успешной загрузки изображения
        image.onload = function () {
            // когда изображение успешно загружено, разрешаем промис с данными об изображении
            resolve({
                width: image.width,
                height: image.height,
                src: url
            });
        };

        // обработчик ошибки загрузки изображения
        image.onerror = function () {
            // в случае ошибки загрузки изображения, отклоняем промис с соответствующей ошибкой
            reject(new Error(`Failed to load image from ${url}`));
        };

        // устанавливаем URL изображения для начала загрузки
        image.src = url;
    });
}

const imageUrl = 'https://ichef.bbci.co.uk/news/800/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg';

loadImage(imageUrl)
    // обрабатываем успешное разрешение промиса
    .then(imageData => {
        console.log('Image loaded successfully:', imageData);
    })
    // обрабатываем отклонение промиса в случае ошибки загрузки
    .catch(error => {
        console.error('Error loading image:', error.message);
    });
