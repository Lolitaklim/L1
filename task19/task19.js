// 19 Реализовать виджет, отображающий список постов из любого паблика в VK 
// (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. 
// Виджет должен иметь фиксированные размеры и возможность прокрутки. 
// При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
// Необходимо реализовать возможность кэширования уже загруженных данных: 
// если пользователь закрыл страницу, а потом снова открыл ее, 
// виджет должен отображать все загруженные ранее данные 
// (новые данные должны подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные 
// загруженные первыми.

// 20 Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage 
// для предыдущей задачи. При изменении данных в localStorage в консоль должен выводиться 
// объем занятой памяти / максимальный размер 	хранилища. 


// localStorage.clear();

// максимальный объем хранилища из 19task
const fillLocalStorageToMax = (function() {
    let keyIndex = 0;
    while (true) {
        let key = 'key' + keyIndex;
        let value = 'kZRlFrw7pdVlLCtusyV1XnlMHsypaaQ2QDiiclUljHoqOKzc9yG68Hnb8WTxE3kKr6u3RuGyxfJcQ5zqx4PWj3NRyya43DExFk62kB4PDV8ORe74dAE6u5t1ibVADJD3buhe87Isxm2dvuN8Qt4Ied9PoSOFlRO3zOwsQMNgQlNC6vrOv5KeieC82Wi70yHAXNykDxNmNzDF2rskrWnHVBBOKMAPxUCB4MYzeXlZnnDaI2my9RcPZdduLfZZKSl7XYZmhXEuQJ3q7Bg8Tnv65XDM7o22HMTSI0lS0sncMiW5nq3Fk3bmjBUjWaoKhcMH0DuUeitY4RHM9A1Xk0SHUHtB4sawZZOe4OPrIU3CvYjiAj6Bcbu3QC6BLeQ1ny6xveIN7xdNsfDRa0DhPgcZ6en4HorgsVXZsnynXDTKB0HyFCvbPesllY9GutgVHSBKt59t82TSXZrCQP0hLiQEAdwAXkO5Hn5n9Dt59b82264K9AVlu6uah28UBb5galQtecN0iXSVSrv1AI6feZln0gd710sFxpaFzcE0blnrqyRWY7GTzzWLou2MMmd4TIeWcSj9XitQyGzGDfCJeTowyzgwMiNNioxSN4NdMsq4WlXRvtmXTkH4QApJ5nd6W7XBy63VNljhwZsUg1tHv8HHQBqmxG2Oz5qGVoUOr4KCvjATrzEXqmrsFZj0gh01li0bMUP4rCustFmlaXvyDkzVsPiP7Lx6UAXci7DUzy5QB9dJoJqYEcLZNgwCaE6S5pnUEz7OA0GUkginkxSKQg26cm7j6SrJOA4u5CTlscsPdQQZT66kjs1Qyh0PFBkHoYpj8z4xoLAwfQ8hgy0GZ6Hdp53gGuZZMOmzS5XVZgcvzS6kqGsdi1vP4JIwUGaw4wLSatlwRRls70JpJpX4w3tiAKRzxCkkX6nxQ5L4KSpKkAqICPcy49KxIrdXnl2zHPRZaM2x5XJ1sxF8gNDSWedZ6b1qYKd1ZRuWtPmqWBYpkhaJc2QdUoUCbH41CTpRkbjT';
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            break;
        }
        keyIndex++;
    }
    const size = calculateLocalStorageSize();
   
    const keysToRemove = [];
    for (let key of Object.keys(localStorage)) {
        if (key.startsWith('key')) {
            keysToRemove.push(key);
        }
    }
    for (let key of keysToRemove) {
        localStorage.removeItem(key);
    }

    return size;
})();

// сколько занято в хранилище
function calculateLocalStorageSize() {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const itemSize = (key.length + value.length) * 2;
      totalSize += itemSize;
    }
    return parseInt(totalSize / 1024);
}


const apiUrl = 'https://api.vk.com/method/wall.get?v=5.199';
const ownerId = -92876084; 
const accessToken = 'vk1.a.Tg4HWAUkCj8GyEvQnq_LTKbMMMjp0_Er89he6xMnMrg2xHUsF-xcDXWeaCjkgZHni76kKUBRQZeiOE8hRqWS5PD4AWoOr4hg5PndkTpfiQW6HLkE_ZNM_PZDlDYetHH_BVYodn7WDzd2OWtypoHc_jzOK-TEqvfjuGhMcUxM2Qy78qgVB80E7eWlo-lf9iCW0TmEjisgmOJc56pwHP4hmA';
let count = 10;
let offset = 1;
let callbackCount = 0;
let isFetching = false; 

// получение данных из localStorage
let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];


function fetchPosts() {

    if (isFetching) {
        return;
    }

    isFetching = true; 

    const script = document.createElement('script');
    const currentCallback = `jsonpCallback${callbackCount}`;
    script.src = `${apiUrl}&owner_id=${ownerId}&access_token=${accessToken}&offset=${offset}&count=${count}&v=5.199&callback=${currentCallback}`;
    document.head.appendChild(script);
    callbackCount++;

    window[currentCallback] = function (data) {

        const posts = data.response.items;

          // добавление новых постов в начало массива 
          storedPosts = [...posts, ...storedPosts];
        
        appendPostsToWidget(posts);

        // сохранение данных в localStorage
        localStorage.setItem('posts', JSON.stringify(storedPosts));
        console.log(calculateLocalStorageSize(), fillLocalStorageToMax)

        offset += count;
        delete window[currentCallback]; 
        document.head.removeChild(script);
        isFetching = false; 
    };

    script.onerror = function () {
        console.error('JSONP request failed');
        delete window[currentCallback];
        document.head.removeChild(script);
        isFetching = false; 
    };
}

const postsWidget = document.getElementById('posts-widget');
const postList = document.getElementById('post-list');

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
        
                const lastSize = sizes[sizes.length - 1];
                const image = lastSize.url;
        
                const imgElement = document.createElement('img');
                imgElement.src = image;
                listItem.appendChild(imgElement);
            }
        }
         postList.appendChild(listItem);
     });
    
}

// первоначальная загрузка данных из localStorage при открытии страницы
window.addEventListener('load', function () {
    if (storedPosts.length > 0) {
        appendPostsToWidget(storedPosts);
    }
});


postsWidget.addEventListener('scroll', function () {
    const scrollTop = postsWidget.scrollTop;
    const scrollHeight = postsWidget.scrollHeight;
    const clientHeight = postsWidget.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchPosts();
    }
});

fetchPosts();

