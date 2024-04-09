// Решение 1, запросы на другие сайты, протокол JSONP, использование тега script

// данные для получения постов из группы ВК
const apiUrl = 'https://api.vk.com/method/wall.get?v=5.199';
const ownerId = -92876084; 
const accessToken = 'vk1.a.Tg4HWAUkCj8GyEvQnq_LTKbMMMjp0_Er89he6xMnMrg2xHUsF-xcDXWeaCjkgZHni76kKUBRQZeiOE8hRqWS5PD4AWoOr4hg5PndkTpfiQW6HLkE_ZNM_PZDlDYetHH_BVYodn7WDzd2OWtypoHc_jzOK-TEqvfjuGhMcUxM2Qy78qgVB80E7eWlo-lf9iCW0TmEjisgmOJc56pwHP4hmA';

// количество постов
let count = 10;

// смещение
let offset = 1;

// счетчик колбэков
let callbackCount = 0;

// получение данных из localStorage
let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

// получаем посты
async function fetchPosts() {
    try {
        // создаем скрипт для получения данных (протокол JSONP)
        // удалённый сервер должен в ответ сгенерировать скрипт, который вызывает currentCallback() с данными, которые хочет передать.
        const script = document.createElement('script');
        // имя нашей функции – в URL-параметре callback
        const currentCallback = `jsonpCallback${callbackCount}`;
        // добавляем скрипт в head
        script.src = `${apiUrl}&owner_id=${ownerId}&access_token=${accessToken}&offset=${offset}&count=${count}&v=5.199&callback=${currentCallback}`;

        // увеличение смещения
        offset += count;

        // Создаем Promise, который будет разрешен при успешной загрузке данных
        const dataPromise = new Promise((resolve, reject) => {
            // функция, которая вызывается при получении данных
            window[currentCallback] = function (data) {
                resolve(data);
                delete window[currentCallback];
            };
            // обработка ошибки
            script.onerror = function () {
                reject(new Error('JSONP request failed'));
                delete window[currentCallback];
            };
        });

        // добавляем скрипт в head
        document.head.appendChild(script);
        callbackCount++;

        // ожидаем разрешения Promise
        const data = await dataPromise;

        const posts = data.response.items;

        // добавление новых постов в конец массива 
        storedPosts = [...storedPosts, ...posts];

        // добавление постов в виджет
        appendPostsToWidget(posts);
        savePostsToLocalStorage(storedPosts);


        // task20  вывод объем занятой памяти / максимальный размер хранилища в мб
        console.log(`${(calculateLocalStorageSize() / (1024 * 1024)).toFixed(6)} MB / ${fillLocalStorageToMax} MB`)
       

        // удаление скрипта
        document.head.removeChild(script);
    } catch (error) {
        console.error(error);
    }
}

// функция для сохранения постов в localStorage
function savePostsToLocalStorage(storedPosts) {    
    try {
        localStorage.setItem('posts', JSON.stringify(storedPosts));
    } catch (e) {
        // если произошла ошибка, удаляем первые 10 постов
        storedPosts.splice(0, 10);
        savePostsToLocalStorage(storedPosts);
    }
}

const postsWidget = document.getElementById('posts-widget');
const postList = document.getElementById('post-list');

// добавление постов в виджет
function appendPostsToWidget(posts) {

    // проходимся по каждому посту
    posts.forEach(post => {

        // создаем элемент списка
        const listItem = document.createElement('li');
        listItem.classList.add('post');

        // создаем элементы для отображения даты
        const date = new Date(post.date * 1000); 
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const dateItem = document.createElement('span');
        dateItem.classList.add('date');
        listItem.appendChild(dateItem);
        dateItem.textContent = formattedDate;

        // создаем элемент для отображения текста поста
        const textItem = document.createElement('span');
        textItem.classList.add('text');
        listItem.appendChild(textItem);
        textItem.textContent = post.text;        
 
        // если есть вложения и длина вложений больше 0
        if (post.attachments && post.attachments.length > 0) {

            // получаем фото
            const photoAttachment = post.attachments[0].photo;
            
            // если есть фото и размеры фото
            if (photoAttachment && photoAttachment.sizes && photoAttachment.sizes.length > 0) {
                // получаем размеры фото
                const sizes = photoAttachment.sizes;
                // получаем последний размер фото
                const lastSize = sizes[sizes.length - 1];
                // получаем url фото
                const image = lastSize.url;
                // создаем элемент img
                const imgElement = document.createElement('img');
                imgElement.src = image;
                listItem.appendChild(imgElement);
            }
        }

        // добавляем элемент в список
        postList.appendChild(listItem);
    });
}

// первоначальная загрузка данных из localStorage при открытии страницы
addEventListener('load', function () {
    if (storedPosts.length > 0) {
        appendPostsToWidget(storedPosts);
        offset += storedPosts.length;
    } else {
        fetchPosts();
    }
});

// обработка скролла
postsWidget.addEventListener('scroll', function () {
    const scrollTop = postsWidget.scrollTop;
    const scrollHeight = postsWidget.scrollHeight;
    const clientHeight = postsWidget.clientHeight;

    // если скролл внизу страницы (осталось 10 пикселей) - загружаем новые посты
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchPosts();
    }
});

