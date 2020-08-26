import { getData } from '../services/data-service';
import { headerTemplate } from '../src/header';
import { listTamplate } from '../src/list';
import '../styles/style.css';

const header = headerTemplate(); // инициализируем компоненты
const usersList = listTamplate();
const data = getData(); // получаем данные

let currentPosition = 22; // стартовое кол-во юзеров в списке

document.addEventListener('DOMContentLoaded', () => {
    render(header, usersList); // рендерим DOM

    firstLoad(); // отображаем начальный список

    const listContainer = document.querySelector('.list-wrap__container');
    listContainer.addEventListener('scroll', () => usersLoading(listContainer));
});

function render(...components) {
    components.forEach(comp =>
        document.getElementById('app').insertAdjacentHTML('beforeend', comp)
    );
}

function usersLoading(container) {
    const fullContentHeight = container.scrollHeight;
    const scrollHeight = container.scrollTop + container.clientHeight;

    if (fullContentHeight < scrollHeight + 150) {  // при приближении к концу списка делаем подгрузку данных
        const newItem = data.slice(currentPosition, currentPosition + 1);
        currentPosition++;
        renderUserItem(newItem);
    }
}

function firstLoad() {
    renderUserItem(data.slice(0, currentPosition));
}

function renderUserItem(list) {
    list.forEach(user => {
        const userItem = getUserItemTemplate(user);
        document
            .querySelector('.list-wrap__container')
            .insertAdjacentHTML('beforeend', userItem);
    });
}

function getUserItemTemplate({ index, name, fathername, surname }) {
    return `
        <div class="user-item">
            <span>${index + 1}</span>
            <div>${name}</div>
            <div>${fathername}</div>
            <div>${surname}</div>
        </div>
    `;
}
