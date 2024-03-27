function addAnimationToElement(element) {
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

const element = document.getElementById('element');

addAnimationToElement(element);
  