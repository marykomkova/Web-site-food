/* jshint -W104 */
/* jshint -W119 */
export function openModal(modalSelector, modalTimerId) {//функция с таймером
    const modal = document.querySelector(modalSelector);//помещаем в переменную элемент со страницы
    modal.classList.add('show');//добавляем 
    modal.classList.remove('hide');//удаляем
    //modal.classList.toggle('show');//можно заменить переключателем
    document.body.style.overflow = 'hidden';//добавляем стиль

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

export function closeModal(modalSelector) {//такая же функция без таймера
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //Modal
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {//для каждого элемента добавляем обработчик события на клик вызываем функцию
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    modal.addEventListener('click', (e) => {//для каждого элемента добавляем обработчик события на клик закрываем модальное окно
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {//для каждого элемента добавляем обработчик события на нажатие клавиши закрываем модальное окно
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {//если долистывваем до конца появляется модальное окно
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);//вызываем
}

export default modal;