// Решение 1, запросы на другие сайты, протокол JSONP, использование тега script

// данные для получения постов из группы ВК
const apiUrl = 'https://api.vk.com/method/wall.get?v=5.199';
const ownerId = -92876084; 
const accessToken = 'vk1.a.Tg4HWAUkCj8GyEvQnq_LTKbMMMjp0_Er89he6xMnMrg2xHUsF-xcDXWeaCjkgZHni76kKUBRQZeiOE8hRqWS5PD4AWoOr4hg5PndkTpfiQW6HLkE_ZNM_PZDlDYetHH_BVYodn7WDzd2OWtypoHc_jzOK-TEqvfjuGhMcUxM2Qy78qgVB80E7eWlo-lf9iCW0TmEjisgmOJc56pwHP4hmA';

// количество постов
let count = 10;

// смещение (не берем первй пост закрепленный)
let offset = 1;

// счетчик колбэков
let callbackCount = 0;

// получение данных из localStorage
let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

let downloadStorage = false;

// получаем посты
async function fetchPosts() {
    
    // создаем скрипт для получения данных (протокол JSONP)
    // удалённый сервер должен в ответ сгенерировать скрипт, который вызывает currentCallback() с данными, которые хочет передать.
    const script = document.createElement('script');
    // имя нашей функции – в URL-параметре callback
    const currentCallback = `jsonpCallback${callbackCount}`;
    // добавляем скрипт в head
    script.src = `${apiUrl}&owner_id=${ownerId}&access_token=${accessToken}&offset=${offset}&count=${count}&v=5.199&callback=${currentCallback}`;

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

    // удаление скрипта
    document.head.removeChild(script);

    return data.response.items;
}

async function downloadPosts() {

    const posts = await fetchPosts(); 

    // увеличение смещения
    offset += count;

    // сортировка по дате по возрастанию
    // const posts = postsNoSort.slice().sort((a, b) => a.date - b.date);
    posts.sort((a, b) => a.date - b.date);

    // добавление новых постов в конец массива 
    storedPosts = [...storedPosts, ...posts];

    // добавление постов в виджет
    appendPostsToWidget(posts);
    savePostsToLocalStorage(storedPosts);

    // task20  вывод объем занятой памяти / максимальный размер хранилища в мб
    console.log(`${(calculateLocalStorageSize() / (1024 * 1024)).toFixed(6)} MB / ${fillLocalStorageToMax} MB`);

    
}

// первоначальная загрузка постов из учета localStorage
async function initialDownload(storedPosts) {

    const posts = await fetchPosts();

    for(let i = 0; i < posts.length; i++) {
        console.log(posts[i].id, storedPosts[0].id);
        if (posts[i].id === storedPosts[0].id) {
            posts.splice(0, i);
            // storedPosts = [...posts, ...storedPosts];
            storedPosts.splice(offset, 0, ...posts);

            appendPostsToWidget(storedPosts);// доб v nachalo!
            savePostsToLocalStorage(storedPosts);
            console.log(`${(calculateLocalStorageSize() / (1024 * 1024)).toFixed(6)} MB / ${fillLocalStorageToMax} MB`)

            offset = storedPosts.length + 1;
            downloadStorage = false;
            return;
        }
    }

    // storedPosts = [...posts, ...storedPosts]; // posle offsetnstored posts stored
    storedPosts.splice(offset, 0, ...posts);
   
    appendPostsToWidget(storedPosts);// доб v nachalo!

    savePostsToLocalStorage(storedPosts);
    console.log(`${(calculateLocalStorageSize() / (1024 * 1024)).toFixed(6)} MB / ${fillLocalStorageToMax} MB`)

    offset += count;
    // appendPostsToWidget(storedPosts);
    // offset += storedPosts.length;
    // initialDownload(storedPosts);
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
                // получаем последний размер фото, url фото
                const image = sizes[sizes.length - 1].url;
                // создаем элемент img
                const imgElement = document.createElement('img');
                imgElement.src = image;
                listItem.appendChild(imgElement);
            }
        }

        // добавляем элемент в список
        // добавляем элемент в список на определенную позицию (offset)
        postList.insertBefore(listItem, postList.children[offset - count - 1]);
        // postList.appendChild(listItem);
    });
}

// первоначальная загрузка данных из localStorage при открытии страницы
addEventListener('load', function () {
    if (storedPosts.length > 0) {
        initialDownload(storedPosts);
    } else {
        downloadPosts();
    }
});

// обработка скролла
postsWidget.addEventListener('scroll', function () {
    const scrollTop = postsWidget.scrollTop;
    const scrollHeight = postsWidget.scrollHeight;
    const clientHeight = postsWidget.clientHeight;

    // если скролл внизу страницы (осталось 10 пикселей) - загружаем новые посты
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        downloadPosts();
    }
});
