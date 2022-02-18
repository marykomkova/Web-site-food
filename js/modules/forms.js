/* jshint -W104 */
/* jshint -W119 */
//импортируем модули
import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector);//помещаем элементы в переменную

    const message = {//создаем возможные сообщения
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {//для каждого элемента вызываем функцию
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {//обработчик события
            e.preventDefault();//если событие не обрабатывается явно, его действие по умолчанию не должно выполняться так, как обычно

            const statusMessage = document.createElement('img');//создаем элемент с картинкой
            statusMessage.src=message.loading; //помещаем картинку загрузки
            //добавляем стили
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto; 
            `;
            form.insertAdjacentElement('afterend', statusMessage);//вставляем значок после сообщения

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));//берем данные из базы данных

            postData('http://localhost:3000/requests', json) //отправляем запрос 
            .then(data => {
                console.log(data);//выводим данные
                showThanksModal(message.success);//показывем сообщение об успешном завершении
                statusMessage.remove();//удаляем статус
            }).catch(() => {
                showThanksModal(message.failure);//если чтото не так показываем сообщение об ошибке
            }).finally(() => {
                form.reset();//в любом случае сбрасываем все
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');//берем элементы со страницы

        prevModalDialog.classList.add('hide');//скрываем окно
        openModal('.modal', modalTimerId);//вызываем функцию с таймероом

        const thanksModal = document.createElement('div');//создаем обертку для верстки
        thanksModal.classList.add('modal__dialog');//добавляем
        //генерируем верстку
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);//добавляем к элементу
        setTimeout(() => {//через заданное время выполняем следующие действия
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
}

export default forms;