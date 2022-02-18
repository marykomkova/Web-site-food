/* jshint -W104 */
/* jshint -W119 */
function calc() {
    //Calc
    const result = document.querySelector('.calculating__result span');//помещаем в переменную элемент с результатом со страницы
    let type, number, weight, addWeight;//создаем переменные для хранения значений

    if (localStorage.getItem('type')) {//проверяем есть ли значение в локальном хранилище
        type = localStorage.getItem('type');//если есть помещяем их в переменную
    } else {
        type = 'children';//если нет ничего, назначаем по умолчанию
        localStorage.setItem('type', 'children');//помещаем в локальное хранилище
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);//помещаем в переменную элесенты по введенному селектору

        elements.forEach(elem => {
            elem.classList.remove(activeClass);//удаляем класс активности
            if (elem.getAttribute('id') === localStorage.getItem('type')) {//сравниваем со значением в хранилище
                elem.classList.add(activeClass);//добавляем класс активности
            }
        });
    }

    initLocalSettings('#type div', 'calculating__choose-item_active');//вызываем функцию и передаем параметры
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');//вызываем функцию и передаем параметры

    function calcTotal() {
        if (!type || !number || !weight || !addWeight) {
            result.textContent = '____';//если нет какого-то значения, помещаем туда подчеркивания
            return;
        }

        let r = number * weight + addWeight;//выссчитываем результат
        if (type === 'children') {//если выбраны дети высчитываем по данной формуле
            result.textContent = Math.round(r + r*5/100);
        } else {//иначе высчитываем по данной формуле
            result.textContent = Math.round(r + r*10/100);
        }
    }

    calcTotal();//вызываем функцию

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);//помещаем  в переменную элементы со страницы

        elements.forEach(elem => {//для каждого элемента выполняем следующие действия
            elem.addEventListener('click', (e) => {//обработчик события(клик)
                type = e.target.getAttribute('id');//берем id элемента, на который кликнули
                localStorage.setItem('type', e.target.getAttribute('id'));//помещаем значение в локальное хранилище
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);//удаляем класс активности со всех элементов
                });
    
                e.target.classList.add(activeClass);//добавляем класс активности на выбранный элемент
    
                calcTotal();//вызываем калькулятор
            });
        });
    }

    getStaticInformation('#type div', 'calculating__choose-item_active');//вызываем функцию с параметрами
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');//вызываем функцию с параметрами

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);//помещаем  в переменную элемент со страницы

        input.addEventListener('input', () => {//обработчик события на ввод

            if (input.value.match(/\D/g)) {//регулярка для проверки некорректности ввода
                input.style.border = '1px solid red';//красный ободок для поля
            } else {//
                input.style.border = 'none';//убираем стиль с ободка
            }

            switch(input.getAttribute('id')) {//берем id поля в которое вводим
                case 'number'://если вводим значение в number прибавляем это значение к переменной
                    number = +input.value;
                    break;
                case 'weight'://если вводим значение в weight прибавляем это значение к переменной
                    weight = +input.value;
                    break;
                case 'addWeight'://если вводим значение в addWeight прибавляем это значение к переменной
                    addWeight = +input.value;
                    break;
            }

            calcTotal();//вызываем функцию
        });
    }

    //вызываем
    getDynamicInformation('#number');
    getDynamicInformation('#weight');
    getDynamicInformation('#addWeight');
}

export default calc;