/* jshint -W104 */
/* jshint -W119 */
import {getResourse} from '../services/services';

function cards() {
    //Классы для карточек меню
    class MenuCard {//создаем класс карточка
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {//конструктор с параметрами
            //помещаем переданные значения в поля класса
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
        }
    
        render() {//помещаем на страницу верстку
            const element = document.createElement('div');//создаем div чтобы поместить туда верстку (оборачиваем)

            if (this.classes.length === 0) {//если не переданы классы добавляем
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));//иначе добавляем каждый
            }
            
            //помещаем верстку со значениями
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/шт</div>
                </div>
            `;
            this.parent.append(element);//добавляем на страницу
        }
    }

    getResourse('http://localhost:3000/menu')//берем данные с 'базы данных'
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
}

export default cards;