// Решение 1, запросы на другие сайты, протокол JSONP, использование тега script

// данные для получения постов из группы ВК
const apiUrl = 'https://api.vk.com/method/wall.get?v=5.199';
const ownerId = -92876084; 
const accessToken = 'vk1.a.Tg4HWAUkCj8GyEvQnq_LTKbMMMjp0_Er89he6xMnMrg2xHUsF-xcDXWeaCjkgZHni76kKUBRQZeiOE8hRqWS5PD4AWoOr4hg5PndkTpfiQW6HLkE_ZNM_PZDlDYetHH_BVYodn7WDzd2OWtypoHc_jzOK-TEqvfjuGhMcUxM2Qy78qgVB80E7eWlo-lf9iCW0TmEjisgmOJc56pwHP4hmA';

// количество постов
let count = 10;

// смещение (не берем первй пост закрепленный)
let offset = 1;

let callbackCount = 0;

// данные из хранилища
let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

// идет загрузка постов
let isFetching = false;

// идет первоначальная загрузка
let isInitial = false;

function jsonpRequest (currentCallback, script) {
    // возвращаем Promise, который будет разрешен при успешной загрузке данных
    return new Promise((resolve, reject) => {
        // функция, которая вызывается при получении данных
        window[currentCallback] = function (data) {
            resolve(data);
            delete window[currentCallback];
        };
        script.onerror = function () {
            reject(new Error('JSONP request failed'));
            delete window[currentCallback];
        };
    });
}

// получаем посты
async function fetchPosts() {
    // создаем скрипт для получения данных (протокол JSONP)
    // удалённый сервер должен в ответ сгенерировать скрипт, который вызывает currentCallback() с данными, которые хочет передать.
    const script = document.createElement('script');
    // имя нашей функции – в URL-параметре callback
    const currentCallback = `jsonpCallback${callbackCount}`;
    // добавляем скрипт в head
    script.src = `${apiUrl}&owner_id=${ownerId}&access_token=${accessToken}&offset=${offset}&count=${count}&v=5.199&callback=${currentCallback}`;

    // добавляем скрипт в head
    document.head.appendChild(script);
    callbackCount++;

    // ожидаем разрешения Promise
    const data = await jsonpRequest (currentCallback, script);

    // удаление скрипта
    document.head.removeChild(script);

    // сортировка по дате по возрастанию, в начале старые посты потом новые
    return data.response.items.sort((a, b) => a.date - b.date);
}

// обычная загрузка постов
async function downloadPosts() {
    const posts = await fetchPosts(); 

    // помещаем в массив постов 
    storedPosts = [...storedPosts, ...posts];
    // добавляем в виджет
    appendPostsToWidget(posts);
    // сохраняем
    savePostsToLocalStorage(storedPosts);
    // увеличиваем смещение
    offset += count; 
    isFetching = false;
}

function formatDateFromMs(ms) {
    const date = new Date(ms * 1000)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-\
${date.getDate().toString().padStart(2, '0')} \
${date.getHours().toString().padStart(2, '0')}:\
${date.getMinutes().toString().padStart(2, '0')}:\
${date.getSeconds().toString().padStart(2, '0')}`
}

// первоначальная загрузка постов из учета localStorage
async function initialDownload() {
    const posts = await fetchPosts();

    // идем по подгруженным постам с конца, там посты новее
    for (let i = posts.length - 1; i > 0; i--) {
        // если нашелся пост который равен последнему(новейшему) из хранилища
        if (posts[i].id === storedPosts[storedPosts.length - 1].id) {
            // обрезаем массив по найденный пост, не включая его
            posts.splice(0, i + 1);

            // если массив получился пустой добавляем посты в виджет, смещение - длина массива с постами + закрепленный
            if(posts.length === 0) {
                appendPostsToWidget(storedPosts);
                offset = storedPosts.length + 1;
                isInitial = false;
                isFetching = false;
                return;
            } 

            // добавляем подгруженные посты в виджет, увеличиваем смещение, добавляем остальные посты
            appendPostsToWidget(posts);
            offset += posts.length;
            appendPostsToWidget(storedPosts);

            // сохраняем посты, смещение - длина массива с постами + закрепленный
            storedPosts = [...posts, ...storedPosts];
            offset = storedPosts.length + 1;
            savePostsToLocalStorage(storedPosts);
            isInitial = false;
            isFetching = false;
            return;
        }
    }

    // если не нашелся пост который равен последнему(новейшему) из хранилища, сохраняем, добавляем смещение
    storedPosts = [...posts, ...storedPosts];
    appendPostsToWidget(posts);
    savePostsToLocalStorage(storedPosts);
    offset += count;    
    isFetching = false;
}

// функция для сохранения постов в localStorage
function savePostsToLocalStorage(storedPosts) {    
    try {
        // сортируем от старых к новым
        storedPosts.sort((a, b) => a.date - b.date);
        localStorage.setItem('posts', JSON.stringify(storedPosts));
        console.log(`${(calculateLocalStorageSize() / (1024 * 1024)).toFixed(6)} MB / ${fillLocalStorageToMax} MB`);
    } catch (e) {
        // при ошибке обрезаем массив постов, 
        // если обычная загрузка, удаляем посты загруженные первыми
        // если первоначальная загрузка, удаляем самые старые посты
        if(!isInitial) {
            storedPosts.splice(0, count + 1);
        } else {
            storedPosts.splice(-count);
        }
        // повторяем
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
        const formattedDate = formatDateFromMs(post.date);
        const dateItem = document.createElement('span');
        dateItem.classList.add('date');
        listItem.appendChild(dateItem);
        dateItem.textContent = formattedDate;

        // создаем элемент для отображения текста поста
        const textItem = document.createElement('span');
        textItem.classList.add('text');
        listItem.appendChild(textItem);
        textItem.textContent = post.text;
        
        // если есть вложения и длина вложений больше 0 получаем фото
        if (post.attachments && post.attachments.length > 0) {
            const photoAttachment = post.attachments[0].photo;
            // если есть фото и размеры фото
            if (photoAttachment && photoAttachment.sizes && photoAttachment.sizes.length > 0) {
                // получаем размеры фото, последний размер фото, url фото
                const sizes = photoAttachment.sizes;
                const image = sizes[sizes.length - 1].url;
                // создаем элемент img
                const imgElement = document.createElement('img');
                imgElement.src = image;
                listItem.appendChild(imgElement);
            }
        }

        // добавляем элемент в список на определенную позицию (offset)
        postList.insertBefore(listItem, postList.children[offset - 1]);
    });
}

// первоначальная загрузка данных из localStorage при открытии страницы
addEventListener('load', () => {
    isFetching = true;
    // если массив из хранилища не пустой запускаем первоначальную загрузку
    if (storedPosts.length > 0) {
        isInitial = true;
        initialDownload();
    } else {
        downloadPosts();
    }
});

// обработка скролла
postsWidget.addEventListener('scroll', () => {
    const scrollTop = postsWidget.scrollTop;
    const scrollHeight = postsWidget.scrollHeight;
    const clientHeight = postsWidget.clientHeight;

    // если скролл внизу страницы (осталось 10 пикселей) - загружаем новые посты
    if (scrollTop + clientHeight >= scrollHeight - 10 && isFetching === false) {
        isFetching = true;
        isInitial ?  initialDownload() : downloadPosts();
        
    }
});