/* jshint -W104 */
/* jshint -W119 */
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider
    //помещаем в переменные элементы со страницы
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    //создаем переменные для слайдов
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {//если количество слайдов меньше 10 добавляем спереди 0
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {//иначе оставляем как есть
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = slides.length * 100 + '%';//высчитываем ширину слайдов и добавляем к стилям
    slidesField.style.display = 'flex';//добавляем стиль
    slidesField.style.transition = '0.5s all';//добавляем стиль

    slidesWrapper.style.overflow = 'hidden';//добавляем стиль

    slides.forEach(slide => {//для каждого слайда устанавливаем ширину
        slide.style.width = width;
    });

    slider.style.position = 'relative';//добавляем стиль

    const indicators = document.createElement('ol'),//создаем список точек
          dots = [];

    indicators.classList.add('carousel-indicators');//добавляем класс
    //создаем стили
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);//lj,fdkztv yf cnhfybwe

    function currentValue() {//определяем текущий индекс и помещаем
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function activeDot() {//определяем активную точку(слайд)
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    for (let i = 0; i < slides.length; i++) {//для каждого слайда создаем точку и создаем стили для точек
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {//проверяем равен ли индекс одному и добавляем стиль
            dot.style.opacity = 1;
        }
        indicators.append(dot);//добавляем на страницу
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');//заменяем регуляркой
    }

    next.addEventListener('click', () => {//обработчик события на клик 
        if (offset == deleteNotDigits(width) * (slides.length - 1)){
            offset = 0;//если индекс равен количеству переходим на самый первый
        } else {
            offset += deleteNotDigits(width);//иначе добавляем один
        }

        slidesField.style.transform = `translateX(-${offset}px)`;//перемещаем

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentValue();//вызывем текущее значение

        activeDot();//вызываем активную точку
    });

    prev.addEventListener('click', () => {//обработчик события на клик стрелки назад 
        if (offset == 0){//если равно 0 перемещаем на последний иначе -1
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;//перемещаем

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentValue();//вызывем текущее значение

        activeDot();//вызываем активную точку
    });

    dots.forEach(dot => {//для каждой точки добавляем обработчик события на клик 
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentValue();

            activeDot();
        });
    });
}

export default slider;