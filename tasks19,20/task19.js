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
let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

let isFetching = false;

let isInitial = false;

function jsonpRequest (currentCallback, script) {
    return new Promise((resolve, reject) => {
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

    const script = document.createElement('script');
    const currentCallback = `jsonpCallback${callbackCount}`;
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

async function downloadPosts() {
    const posts = await fetchPosts(); 

    // // увеличение смещения
    // offset += count;


    // добавление новых постов в конец массива 
    storedPosts = [...storedPosts, ...posts];
    

    appendPostsToWidget(posts);
    savePostsToLocalStorage(storedPosts);
    // увеличение смещения
    offset += count;

    isFetching = false;
}

function formatDateFromMs(ms) {
    let date = new Date(ms * 1000)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-\
${date.getDate().toString().padStart(2, '0')} \
${date.getHours().toString().padStart(2, '0')}:\
${date.getMinutes().toString().padStart(2, '0')}:\
${date.getSeconds().toString().padStart(2, '0')}`
}

// первоначальная загрузка постов из учета localStorage
async function initialDownload() {

    const posts = await fetchPosts();

    // storedPosts.sort((a, b) => a.date - b.date);

    // storedPosts.forEach((post, index) => {
    //     console.log(formatDateFromMs(post.date), index);

    // })

    console.log(posts);

    for (let i = posts.length - 1; i > 0; i--) {
        
    
    // posts.forEach((post, index) => { 

        console.log("Downloaded:",posts[i].id, formatDateFromMs(posts[i].date), "Local:", storedPosts[storedPosts.length - 1].id, formatDateFromMs(storedPosts[storedPosts.length - 1].date));

       
        if (posts[i].id === storedPosts[storedPosts.length - 1].id) {
            console.log('нашлось сравнение');

            if(!posts) {
                appendPostsToWidget(storedPosts);
                offset = storedPosts.lenght + 1;

                isInitial = false;

                return;
            } 
            // удаляем все оставшееся вкл индекс
            posts.splice(i);
            // isInitial = false;
            console.log(posts);

            if(!posts) return;
            appendPostsToWidget(posts);
            offset += posts.lenght;
            appendPostsToWidget(storedPosts);

            storedPosts = [...posts, ...storedPosts];

            offset = storedPosts.lenght + 1;
        //     storedPosts.splice(offset, 0, ...posts);

        //     appendPostsToWidget(storedPosts);// доб v nachalo!
            savePostsToLocalStorage(storedPosts);
            isInitial = false;
            isFetching = false;
        //     offset = storedPosts.length + 1;
        //     isInitial = false;
            return;
        }
    
    // })

    }

    storedPosts = [...posts, ...storedPosts]; // posle offsetnstored posts stored
   
   
    appendPostsToWidget(posts);// доб v nachalo!
    console.log('нашлось');

    // savePostsToLocalStorage(storedPosts);
   
    offset += count;

    
    isFetching = false;
}

// функция для сохранения постов в localStorage
function savePostsToLocalStorage(storedPosts) {    
    try {
        storedPosts.sort((a, b) => a.date - b.date);
        localStorage.setItem('posts', JSON.stringify(storedPosts));
        console.log(`${(calculateLocalStorageSize() / (1024 * 1024)).toFixed(6)} MB / ${fillLocalStorageToMax} MB`);
    } catch (e) {
        // если произошла ошибка, удаляем первые count постов
        storedPosts.splice(0, count);
        savePostsToLocalStorage(storedPosts);
    }
}

const postsWidget = document.getElementById('posts-widget');
const postList = document.getElementById('post-list');

// добавление постов в виджет
function appendPostsToWidget(posts) {

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('post');

        const date = new Date(post.date * 1000); 
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const dateItem = document.createElement('span');
        dateItem.classList.add('date');
        listItem.appendChild(dateItem);
        dateItem.textContent = formattedDate;

        const textItem = document.createElement('span');
        textItem.classList.add('text');
        listItem.appendChild(textItem);
        textItem.textContent = post.text;        
        if (post.attachments && post.attachments.length > 0) {
            const photoAttachment = post.attachments[0].photo;
            if (photoAttachment && photoAttachment.sizes && photoAttachment.sizes.length > 0) {
                const sizes = photoAttachment.sizes;
                const image = sizes[sizes.length - 1].url;
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
addEventListener('load', function () {
    if (storedPosts.length > 0) {
        isFetching = true;
        isInitial = true;
        initialDownload();
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
    if (scrollTop + clientHeight >= scrollHeight - 10 && isFetching === false) {
        isInitial ?  initialDownload() : downloadPosts();
        isFetching = true;
    }
});
