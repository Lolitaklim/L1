// Вычислить размер коллстэка в основных браузерах: 
// Chrome, Firefox, Opera и Safari (если есть возможность).

document.addEventListener('DOMContentLoaded', function () {
function checkStackDepth(depth) {
    try {
        checkStackDepth(depth + 1);
    } catch (error) {
        document.getElementById('stackSize').textContent = depth;
        console.error("Maximum stack depth reached:", depth);
    }
}

checkStackDepth(1);

});


// у меня вот такие значения получились Chrome 8973, Firefox 23452, Opera 8390 