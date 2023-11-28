

const apiUrl = 'https://api.vk.com/method/wall.get?v=5.199';
const ownerId = -92876084; // Ваш идентификатор владельца стены
const accessToken = 'vk1.a.Tg4HWAUkCj8GyEvQnq_LTKbMMMjp0_Er89he6xMnMrg2xHUsF-xcDXWeaCjkgZHni76kKUBRQZeiOE8hRqWS5PD4AWoOr4hg5PndkTpfiQW6HLkE_ZNM_PZDlDYetHH_BVYodn7WDzd2OWtypoHc_jzOK-TEqvfjuGhMcUxM2Qy78qgVB80E7eWlo-lf9iCW0TmEjisgmOJc56pwHP4hmA';
const count = 20;
const offset = 1;

// Генерируем уникальное имя для обратного вызова (callback)
const callbackName = 'jsonpCallback' + Math.round(100000 * Math.random());

// Создаем скрипт для выполнения JSONP-запроса
const script = document.createElement('script');
script.src = `${apiUrl}&owner_id=${ownerId}&access_token=${accessToken}&offset=${offset}&count=${count}&v=5.199&callback=${callbackName}`;
document.head.appendChild(script);

const postsWidget = document.getElementById('posts-widget');
const postList = document.getElementById('post-list');

// Глобальная функция, которая будет вызвана после выполнения запроса
window[callbackName] = function (data) {
 
    // id:471918
    const posts = data.response.items;
    const totalCount = data.response.count;
    // console.log(totalCount)
    console.log(data)

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('post');

        const date = new Date(post.date * 1000); // Умножаем на 1000, так как Date принимает миллисекунды
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const dateItem = document.createElement('span');
        dateItem.classList.add('date');
        listItem.appendChild(dateItem);
        dateItem.textContent = formattedDate;

        const textItem = document.createElement('span');
        textItem.classList.add('text');
        listItem.appendChild(textItem);
        textItem.textContent = post.text;        

        if (post.attachments.length > 0) {
            const sizes = post.attachments[0].photo.sizes;

            // Проверяем, что в массиве sizes есть хотя бы один элемент
            if (sizes.length > 0) {
                // Получаем последний элемент из массива sizes
                const lastSize = sizes[sizes.length - 1];

                // Используем URL последнего элемента
                const image = lastSize.url;

                // Создаем элемент img и добавляем его в список
                const imgElement = document.createElement('img');
                imgElement.src = image;
                listItem.appendChild(imgElement);
            }
        }

        postList.appendChild(listItem);
    });


    delete window[callbackName]; // Удаляем созданную функцию обратного вызова
};

// Отлавливаем ошибки при выполнении запроса
script.onerror = function () {
    console.error('JSONP request failed');
};

// Удаляем скрипт из DOM после выполнения запроса
script.onload = function () {
    document.head.removeChild(script);
};







    // 
    //             const posts = data.items;
    //             const totalCount = data.count;

    //             posts.forEach(post => {
    //                 const listItem = document.createElement('li');
    //                 listItem.classList.add('post');
    //                 listItem.textContent = post.text;
    //                 postList.appendChild(listItem);
    //             });

    //             offset += count;

    //             // Если все посты загружены, отключаем обработчик прокрутки
    //             if (offset >= totalCount) {
    //                 postsWidget.removeEventListener('scroll', handleScroll);
    //             }
    //      

    // function handleScroll() {
    //     if (postsWidget.scrollTop + postsWidget.clientHeight >= postsWidget.scrollHeight) {
    //         
    //     }
    // }

    // // Добавляем обработчик прокрутки
    // postsWidget.addEventListener('scroll', handleScroll);

    // // Начальная загрузка постов
 














