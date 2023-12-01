// Задача: Добавить анимацию для элемента: 
// Напишите функцию, которая добавляет анимацию для элемента на веб-странице, 
// например, плавное изменение его положения или размера.

function addAnimationToElement(elementId) {
    const element = document.getElementById(elementId);

    // вращение и увеличение размера при наведении мыши
    element.addEventListener('mouseover', function() {
        element.style.transform = 'rotate(360deg) scale(1.5)';
    });

    // возврат к изначальным значениям при уходе мыши
    element.addEventListener('mouseout', function() {
        // изначальные значения
        element.style.transform = 'rotate(0deg) scale(1)';
    });
}

addAnimationToElement('element');
  